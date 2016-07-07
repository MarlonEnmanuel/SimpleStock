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

    public final function validate(){
        $errors = array();
        foreach ($this->types as $prop => $meta) {
            if($meta['isInput']!=true) continue;
            switch($meta['phptype']){
                case 'string' : 
                    $this->$prop = filter_var($this->$prop, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_NO_ENCODE_QUOTES);
                    break;
                case 'boolean' :
                    $this->$prop = strtolower(strval($this->$prop));
                    if($this->$prop=='true' || $this->$prop=='1' || $this->$prop=='on'){
                        $this->$prop = true;
                    }else{
                        if($this->$prop=='false' || $this->$prop=='0' || $this->$prop=='off'){
                            $this->$prop = false;
                        }else{
                            array_push($errors, 'dato '.$prop.' no válido');
                        }
                    }
                    break;
                case 'integer' : 
                    if(is_numeric($this->$prop)){
                        $this->$prop = intval($this->$prop);
                    }else{
                        array_push($errors, 'dato '.$prop.' no válido');
                    }
                    break;
            }
        }
        if(count($errors)>0){
            throw new Exception(implode('<br>', $errors), 400);
        }
        return true;
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
    public final function toJSON($fields=null, $isExclude=false){
        return json_encode($this->toArray($fields, $isExclude));
    }
    

    /**
    * Convierte un modelo en un array asociativo
    *
    * @param $fields Un array indicando los campos que se desean combertir, si se pasa null o un array vació se combierten todos los campos
    * @return Array el array asociativo
    */
    public final function toArray($fields=null, $isExclude=false){
        $filtrar = isset($fields) && count($fields)>0;
        $excluir = $isExclude;

        $array = array('id'=>$this->id);
        foreach ($this->types as $prop => $meta) {
            $val = $this->$prop;
            //combertir fecha de php a segundos totales
            if($meta['phptype']=='datetime'){
                $val = $val->format('U');
            }

            if($filtrar){
                if($excluir){
                    if(!in_array($prop, $fields)){
                        $array[$prop] = $val;
                    }
                }else{
                    if(in_array($prop, $fields)){
                        $array[$prop] = $val;
                    }
                }
            }else{
                $array[$prop] = $val;
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

}