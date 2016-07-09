<?php 

namespace SimpleStock\Access;

require_once __DIR__.'/abstractAccess.php';
require_once __DIR__.'/../models/Categoria.php';

class Categoria extends abstractAccess{

	public function getModel(){
		return new \SimpleStock\Models\Categoria();
	}

}