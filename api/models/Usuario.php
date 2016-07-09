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
				'required' => false
			),
		'estado' => array(
				'sqltype' => 'i',
				'phptype' => 'boolean',
				'isinput' => true,
				'required' => true
			),
		'user' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => true,
				'min' => 5
			),
		'pass' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => true,
				'min' => 5
			),
		'nombres' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false
			),
		'apellidos' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false
			),
		'puesto' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false
			),
	);

}