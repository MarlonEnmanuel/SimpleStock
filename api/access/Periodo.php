<?php 

namespace SimpleStock\Access;

require_once __DIR__.'/abstractAccess.php';
require_once __DIR__.'/../models/Periodo.php';

class Periodo extends abstractAccess{

	public function getModel(){
		return new \SimpleStock\Models\Periodo();
	}

}