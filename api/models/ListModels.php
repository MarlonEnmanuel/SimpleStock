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

	public function size(){
		return count($this->list);
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

	public function getBy($field, $value){
		foreach ($this->list as $key => $model) {
			if($model->$field == $value){
				return $model;
			}
		}
		return null;
	}

	public function searchBy($field, $value){
		$sublist = new ListModels($this->model);
		foreach ($this->list as $key => $model) {
			if($model->$field == $value){
				$sublist->add($model);
			}
		}
		return $sublist;
	}

	public function filterFech($field, $from, $to){
		$sublist = new ListModels($this->model);
		foreach ($this->list as $key => $model) {
			$fm = $model->$field->format('U');
			$ff = $from->format('U');
			$ft = $to->format('U');

			if($ff<=$fm && $fm<=$ft){
				$sublist->add($model);
			}
		}
		return $sublist;
	}

}