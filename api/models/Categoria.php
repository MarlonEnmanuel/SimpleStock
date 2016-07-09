<?php

namespace SimpleStock\Models;

require_once __DIR__.'/abstractModel.php';

class Categoria extends abstractModel{

	public $codigo;
	public $nombre;
	public $descrip;
	public $idusuario;

	public $table = 'categoria';
	
	public $types = array(
		'codigo' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => true,
				'min' => 2
			),
		'nombre' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => true,
				'min' => 5
			),
		'descrip' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false
			),
		'idusuario' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => false,
				'required' => false,
				'min' => 1
			),
	);

}