<?php

namespace SimpleStock\Models;

require_once __DIR__.'/abstractModel.php';

class Periodo extends abstractModel{

	public $nombre;
	public $descrip;
	public $actual;
	public $fechini;
	public $fechfin;
	public $idusuario;

	public $table = 'periodo';

	public $types = array(
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
		'actual' => array(
				'sqltype' => 'i',
				'phptype' => 'boolean',
				'isinput' => false,
				'required' => false,
			),
		'fechini' => array(
				'sqltype' => 's',
				'phptype' => 'datetime',
				'isinput' => false,
				'required' => false,
			),
		'fechfin' => array(
				'sqltype' => 's',
				'phptype' => 'datetime',
				'isinput' => false,
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