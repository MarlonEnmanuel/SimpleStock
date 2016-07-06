<?php

namespace SimpleStock\Models;

class ListModels {

	public $modelname;
	public $models = array();

	public function __construct($modelname){
		$this->modelname = $modelname;
	}

	public function add(&$model){
		array_push($this->models, $model);
	}

	public function toJSON ($fields){
		$array = array();
		foreach ($this->models as $key => $val) {
			array_push($array, $val->toArray($fields));
		}
		return json_encode($array);
	}

}