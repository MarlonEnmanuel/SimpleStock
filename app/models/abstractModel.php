<?php

namespace SimpleStock\Models;

abstract class abstractModel {

	public $id;			//identificador del modelo

    public function __construct($id=null){
        $this->id = $id;
        if(!is_array($this->types))
            throw new Exception('Tipos no definidos');
        if(!is_string($this->table)){
            throw new Exception('Tabla no especificada');
        }
    }

    /**
    * Convierte un modelo en una cadena con formato json
    *
    * Convierte el modelo a formato json, todos los caracteres deben tener 
    * cotejamiento UTF-8 de los contrario la función fallará y devolverá false
    *
    * @param $fields Un array indicando los campos que se desean combertir, si se pasa null o un array vació se combierten todos los campos
    * @return String Una cadena en formato json
    */
    public final function toJSON($fields=null){
        return json_encode($this->toArray($fields));
    }
    

    /**
    * Convierte un modelo en un array asociativo
    *
    * @param $fields Un array indicando los campos que se desean combertir, si se pasa null o un array vació se combierten todos los campos
    * @return Array el array asociativo
    */
    public final function toArray($fields=null){
        $filtrar = isset($fields) && count($fields)>0;
        $array = array('id'=>$this->id);
        foreach ($this->types as $prop => $meta) {
            if($filtrar){
                if(in_array($prop, $fields))
                    $array[$prop] = $this->$prop;
            }else{
                $array[$prop] = $this->$prop;
            }
        }
        return $array;
    }


    public final function getSqlFields(){
        $fields = array_keys($this->types);
        return implode(',', $fields);
    }

    public final function getSqlTypes(){
        $sqltypes = '';
        foreach ($this->types as $prop => $meta) {
            $sqltypes.= $meta['sqltype'];
        }
        return $sqltypes;
    }

    public final function getSqlVars(){
        $sqlvars = '?';
        for ($i=0; $i < count($this->types)-1; $i++) { 
            $sqlvars .= ',?';
        }
        return $sqlvars;
    }
    

    public final function toSqlFormat(){
    	foreach ($this->types as $prop => $meta) {
    		switch($meta['phptype']){
    			case 'datetime' : $this->$prop = $this->$prop->format('Y-m-d H:i:s'); break;
    			case 'boolean'  : $this->$prop = ($this->$prop) ? 1 : 0; break;
    		}
    	}
    }

    public final function fromSqlFormat(){
    	foreach ($this->types as $prop => $meta) {
    		switch($meta['phptype']){
    			case 'integer'  : $this->$prop = intval($this->$prop);
    			case 'datetime' : $this->$prop = \DateTime::createFromFormat('Y-m-d H:i:s', $this->$prop); break;
    			case 'boolean'  : $this->$prop = ($this->$prop == '1'); break;
    		}
    	}
    }

    public final function validateData(){
        foreach ($this->types as $prop => $meta) {
            switch($meta['phptype']){
                case 'integer'  : $this->$prop = intval($this->$prop);
                case 'datetime' : $this->$prop = \DateTime::createFromFormat('Y-m-d H:i:s', $this->$prop); break;
                case 'boolean'  : $this->$prop = ($this->$prop == '1'); break;
            }
        }
    }

}