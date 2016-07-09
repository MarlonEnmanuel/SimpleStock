<?php

namespace SimpleStock\Models;

require_once __DIR__.'/abstractModel.php';

class Inventario extends abstractModel{

	public $inicial;
	public $saldo;
	public $idperiodo;
	public $idproducto;

	public $table = 'inventario';
	
	public $types = array(
		'inicial' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => true,
				'required' => true,
				'min' => 0
			),
		'saldo' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => false,
				'required' => false,
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