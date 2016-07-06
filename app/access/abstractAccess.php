<?php

namespace SimpleStock\Access;

abstract class abstractAccess {

	public $status;		//estado de acceso
	public $message;	//mensaje
	public $detail;		//detalle

	protected $mysqli;	//mysqli conección con la base de datos

	/**
    * Constructor del Acceso
    *
    * Se debe indicar la concción a la BD
    *
    * @param &$mysqli Conección pasado por referencia
    */
	public function __construct(&$mysqli){
        $this->mysqli = &$mysqli;
    }

    public function create($model){
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

    	$stmt=$this->mysqli->stmt_init();
    	$stmt->prepare($sql);
    	$stmt->bind_param(...$args);

    	if($stmt->execute()){
    		$model->id = $stmt->insert_id;
    		$this->status = true;
            $model->fromSqlFormat();
    	}else{
    		$this->status = true;
    		$this->message ="Error al insertar agenda";
    		$this->detail = $stmt->error;
    	}
    	$stmt->close();

    	return $this->status;
    }

    public function read(){
    	throw new Exception('Función no soportada');
    }
    public function update(){
    	throw new Exception('Función no soportada');
    }
    public function delete(){
    	throw new Exception('Función no soportada');
    }
    public function search(){
    	throw new Exception('Función no soportada');
    }

}