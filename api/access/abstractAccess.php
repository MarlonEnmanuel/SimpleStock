<?php

namespace SimpleStock\Access;

use \SimpleStock\Models as Models;

require_once __DIR__.'/../models/abstractModel.php';
require_once __DIR__.'/../models/ListModels.php';

abstract class abstractAccess {

	protected $mysqli;	//mysqli conección con la base de datos
    protected $logger;
    protected $model;

	/**
    * Constructor del Acceso
    *
    * Se debe indicar la concción a la BD
    *
    * @param &$mysqli Conección pasado por referencia
    */
	public function __construct(\mysqli &$mysqli, \Monolog\Logger &$logger){
        $this->mysqli = &$mysqli;
        $this->logger = &$logger;
        $this->model  = &$this->getModel();
        if(!$this->model instanceof Models\abstractModel){
            throw new \Exception('El objeto retornado por getModel() no es abstractModel', 500);
        }
    }

    abstract public function getModel();


    public function create(&$model){
    	$model->toSqlFormat();

    	$tablename = $model->table;
    	$sqlfields = $model->getSqlFields();
    	$sqlvars   = $model->getSqlVars();
    	$sqltypes  = $model->getSqlTypes();

    	$args = [$sqltypes];
    	foreach ($model->types as $prop => $meta) {
    		array_push($args, $model->$prop);
    	}

    	$sql = 'INSERT INTO '.$tablename.' ('.$sqlfields.') VALUES ('.$sqlvars.')';

    	$stmt = $this->mysqli->stmt_init();
    	$stmt->prepare($sql);
    	$stmt->bind_param(...$args);

    	if($stmt->execute()){
    		$model->id = $stmt->insert_id;
            $model->fromSqlFormat();
            $stmt->close();
    	}else{
            $this->logger->info('Error al crear '.$tablename.': '.$stmt->error);
            $stmt->close();
            throw new \Exception('Error al crear '.$tablename, 500);
    	}
    }


    public function read(&$model){
    	$tablename = $model->table;
        $sqlfields = $model->getSqlFields();

        $results = array($model->id);
        foreach ($model->types as $prop => $meta) {
            array_push($results, $model->$prop);
        }

        $sql = 'SELECT id'.$tablename.','.$sqlfields.' FROM '.$tablename.' WHERE id'.$tablename.'=?';

        $stmt=$this->mysqli->stmt_init();
        $stmt->prepare($sql);
        $stmt->bind_param('i', $model->id);
        $stmt->execute();
        $stmt->bind_result(...$results);
        if($stmt->fetch()){
            $model->id = $results[0];
            $i = 0;
            foreach ($model->types as $prop => $meta) {
                $i++;
                $model->$prop = $results[$i];
            }
            $model->fromSqlFormat();
            $stmt->close();
        }else{
            if($stmt->error){
                $stmt->close();
                $this->logger->info('Error al obtener '.$tablename.': '.$stmt->error);
                throw new \Exception('Error al obtener '.$tablename, 500);
            }else{
                $stmt->close();
                throw new \Exception($tablename.' no encontrado', 404);
            }
        }
    }


    public function update(&$model){
        $model->toSqlFormat();

        $tablename = $model->table;
    	$fields = $model->getSqlFieldsVars();
        $sqltypes  = $model->getSqlTypes();

        $args = array($sqltypes.'i');
        foreach ($model->types as $prop => $meta) {
            array_push($args, $model->$prop);
        }
        array_push($args, $model->id);

        $sql = 'UPDATE '.$tablename.' SET '.$fields.' WHERE id'.$tablename.'=?';

        $stmt = $this->mysqli->stmt_init();
        $stmt->prepare($sql);
        $stmt->bind_param(...$args);

        if($stmt->execute()){
            $model->fromSqlFormat();
            $stmt->close();
        }else{
            $this->logger->info('Error al actualizar '.$tablename.': '.$stmt->error);
            $stmt->close();
            throw new \Exception('Error al actualizar '.$tablename, 500);
        }
    }


    public function delete(&$model){
        $tablename = $model->table;
    	$sql = "DELETE FROM ".$tablename." WHERE id".$tablename."=?";

        $stmt=$this->mysqli->stmt_init();
        $stmt->prepare($sql);
        $stmt->bind_param('i', $model->id);

        if($stmt->execute()){
            if($stmt->affected_rows>0){
                $stmt->close();
                $model = null;
            }else{
                $stmt->close();
                throw new \Exception($tablename.' no encontrado', 404);
            }
        }else{
            $stmt->close();
            $this->logger->info('Error al eliminar '.$tablename.': '.$stmt->error);
            throw new \Exception('Error al eliminar '.$tablename, 500);
        }
    }


    public function search(){
    	$tablename = $this->model->table;
        $sqlfields = $this->model->getSqlFields();

        $results = array($this->model->id);
        foreach ($this->model->types as $prop => $meta) {
            array_push($results, $this->model->$prop);
        }

        $sql = 'SELECT id'.$tablename.','.$sqlfields.' FROM '.$tablename;

        $stmt=$this->mysqli->stmt_init();
        $stmt->prepare($sql);
        $stmt->execute();
        $stmt->bind_result(...$results);

        $lista = new Models\ListModels($this->model);
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