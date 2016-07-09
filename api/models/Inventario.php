<?php

namespace SimpleStock\Models;

require_once __DIR__.'/abstractModel.php';

class Inventario extends abstractModel{

	public $saldo;
	public $idperiodo;
	public $idproducto;

	public $table = 'inventario';
	
	public $types = array(
		'saldo' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => true,
				'required' => true,
				'min' => 0
			),
		'idperiodo' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => true,
				'required' => true,
				'min' => 1
			),
		'idproducto' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => true,
				'required' => true,
				'min' => 1
			),
	);

}