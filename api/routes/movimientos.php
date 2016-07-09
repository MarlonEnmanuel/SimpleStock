<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/movimientos', function(){

	require_once __DIR__.'/../models/ListModels.php';

	require_once __DIR__.'/../models/Movimiento.php';
	require_once __DIR__.'/../access/Movimiento.php';

	require_once __DIR__.'/../models/Inventario.php';
	require_once __DIR__.'/../access/Inventario.php';

	require_once __DIR__.'/../models/Periodo.php';
	require_once __DIR__.'/../access/Periodo.php';


	/**
	* Crear nuevo movimiento
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$MAD = new Access\Movimiento($mysqli, $logger);
		$IAD = new Access\Inventario($mysqli, $logger);
		$PAD = new Access\Periodo($mysqli, $logger);


		$Inv = new Models\Inventario((int) $inputs['idinventario']);
		$IAD->read($Inv);

		$Per = new Models\Periodo($Inv->idperiodo);
		$PAD->read($Per);

		if($Per->actual==false)
			throw new Exception("El periodo elegido no está en transcurso", 400);

		
		$Mov = new Models\Movimiento();
		$Mov->fechreg 	= new DateTime();
		$Mov->tipo 		= $inputs['tipo'];
		$Mov->cantidad	= $inputs['cantidad'];
		$Mov->lote		= $inputs['lote'];
		$Mov->guia 		= $inputs['guia'];
		$Mov->apunte 	= $inputs['apunte'];
		$Mov->idusuario = $login['id'];
		$Mov->idinventario = $inputs['idinventario'];

		$Mov->validate();

		$Mov->saldoini = $Inv->saldo;
		if($Mov->tipo == 'entrada'){
			$Mov->saldofin = $Mov->saldoini + $Mov->cantidad;
		}else{
			$Mov->saldofin = $Mov->saldoini - $Mov->cantidad;
		}
		$Inv->saldo = $Mov->saldofin;


		$mysqli->autocommit(false);
		try{
			$MAD->create($Mov);
			$IAD->update($Inv);
			$mysqli->commmit();
		}catch(\Exception $e){
			$mysqli->rollback();
			throw $e;
		}finally{
			$mysqli->autocommit(true);
		}

		return $response->withJson($Mov->toArray(), 201);
	});


	/**
	* Obtener todos los movimientos
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$MAD = new Access\Movimiento($mysqli, $logger);
		$lista = $MAD->search();
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener todos los movimientos por inventario
	*/
	$this->get('/inventario/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$MAD = new Access\Movimiento($mysqli, $logger);
		$lista = $MAD->search()->searchBy('idinventario', $args['id']);
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener movimiento por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Mov = new Models\Movimiento((int) $args['id']);
		$MAD = new Access\Movimiento($mysqli, $logger);

		$MAD->read($Mov);

		return $response->withJson($Mov->toArray());
	});


	/**
	* Actualizar usuario por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Mov = new Models\Movimiento((int) $args['id']);
		$MAD = new Access\Movimiento($mysqli, $logger);

		$MAD->read($Mov);

		$Mov->lote		= $inputs['lote'];
		$Mov->guia 		= $inputs['guia'];
		$Mov->apunte 	= $inputs['apunte'];

		$Mov->validate();

		$MAD->update($Mov);

		return $response->withJson($Mov->toArray(), 202);
	});


});