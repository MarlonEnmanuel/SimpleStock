<?php

namespace SimpleStock\Models;

require_once __DIR__.'/abstractModel.php';

class Movimiento extends abstractModel{

	public $fechreg;
	public $tipo;
	public $cantidad;
	public $lote;
	public $guia;
	public $apunte;
	public $saldoini;
	public $saldofin;
	public $idusuario;
	public $idinventario;

	public $table = 'movimiento';
	
	public $types = array(
		'fechreg' => array(
				'sqltype' => 's',
				'phptype' => 'datetime',
				'isinput' => false,
				'required' => false
			),
		'tipo' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => true,
				'options' => ['entrada','salida']
			),
		'cantidad' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => true,
				'required' => true,
				'min' => 1
			),
		'lote' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false,
			),
		'guia' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false,
			),
		'apunte' => array(
				'sqltype' => 's',
				'phptype' => 'string',
				'isinput' => true,
				'required' => false,
			),
		'saldoini' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => false,
				'required' => false
			),
		'saldofin' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
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
		'idinventario' => array(
				'sqltype' => 'i',
				'phptype' => 'integer',
				'isinput' => true,
				'required' => true,
				'min' => 1
			),
	);

}