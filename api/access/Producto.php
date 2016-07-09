<?php 

namespace SimpleStock\Access;

require_once __DIR__.'/abstractAccess.php';
require_once __DIR__.'/../models/Producto.php';

class Producto extends abstractAccess{

	public function getModel(){
		return new \SimpleStock\Models\Producto();
	}

}