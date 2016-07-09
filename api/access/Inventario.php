<?php 

namespace SimpleStock\Access;

require_once __DIR__.'/abstractAccess.php';
require_once __DIR__.'/../models/Inventario.php';

class Inventario extends abstractAccess{

	public function getModel(){
		return new \SimpleStock\Models\Inventario();
	}

}