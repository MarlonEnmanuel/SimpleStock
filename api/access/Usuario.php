<?php 

namespace SimpleStock\Access;

require_once __DIR__.'/abstractAccess.php';
require_once __DIR__.'/../models/Usuario.php';

class Usuario extends abstractAccess{

	public function getModel(){
		return new \SimpleStock\Models\Usuario();
	}

}