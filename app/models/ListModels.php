<?php

namespace SimpleStock\Models;

class ListModels {

	public $model;
	public $list = array();

	public function __construct(abstractModel $model){
		$this->model = $model;
	}

	public function add(&$model){
		array_push($this->list, $model);
	}

	public function toJSON($fields=null, $isExclude=false){
		return json_encode($this->toArray($fields, $isExclude));
	}

	public function toArray ($fields=null, $isExclude=false){
		$array = array();
		foreach ($this->list as $key => $val) {
			array_push($array, $val->toArray($fields, $isExclude));
		}
		return $array;
	}

}