<?php

namespace SimpleStock\Models;

require_once __DIR__.'/abstractModel.php';

class Usuario extends abstractModel{

	public $fechreg;
	public $estado;
	public $user;
	public $pass;
	public $nombres;
	public $apellidos;
	public $puesto;

	public $table = 'usuario';
	public $types = array(
		'fechreg' => array(
				'sqltype' => 's',
				'phptype' => 'datetime',
				'isinput' => false,
			),
		'estado' => array(
				'sqltype' => 'i',
				'phptype' => 'boolean',
				'isinput' => 'true',
			),
		'user' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => 'true',
			),
		'pass' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => 'true',
			),
		'nombres' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => 'true',
			),
		'apellidos' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => 'true',
			),
		'puesto' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => 'true',
			),
	);

}