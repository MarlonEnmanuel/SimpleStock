<?php 

namespace SimpleStock\Access;

require_once __DIR__.'/abstractAccess.php';
require_once __DIR__.'/../models/Movimiento.php';
require_once __DIR__.'/../models/ListModels.php';

class Movimiento extends abstractAccess{

	public function getModel(){
		return new \SimpleStock\Models\Movimiento();
	}

	public function searchByInventario($idinventario, $desde=null, $hasta=null){
		$tablename = $this->model->table;
        $sqlfields = $this->model->getSqlFields();

        $results = array($this->model->id);
        foreach ($this->model->types as $prop => $meta) {
            array_push($results, $this->model->$prop);
        }

        $sql = 'SELECT id'.$tablename.','.$sqlfields.' FROM '.$tablename;
        $sql.= ' WHERE idinventario=? ';
        $sql.= isset($desde) ? " AND fechreg>='".$desde->format("Y-m-d H:i:s")."' " : "";
        $sql.= isset($hasta) ? " AND fechreg<='".$hasta->format("Y-m-d H:i:s")."' " : "";
        $sql.= ' ORDER BY fechreg ASC';

        $stmt=$this->mysqli->stmt_init();
        $stmt->prepare($sql);
        $stmt->bind_param('i', $idinventario);
        $stmt->execute();
        $stmt->bind_result(...$results);

        $lista = new \SimpleStock\Models\ListModels($this->model);
        while($stmt->fetch()){
            $model = clone $this->model;
            $model->id = $results[0];
            $i = 0;
            foreach ($model->types as $prop => $meta) {
                $i++;
                $model->$prop = $results[$i];
            }
            $model->fromSqlFormat();
            $lista->add($model);
        }

        if($stmt->error){
            $stmt->close();
            $this->logger->info('Error al listar '.$tablename.': '.$stmt->error);
            throw new \Exception('Error al listar '.$tablename, 500);
        }

        $stmt->close();
        return $lista;
	}

}