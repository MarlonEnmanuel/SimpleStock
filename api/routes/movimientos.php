<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/movimientos', function(){

	require_once __DIR__.'/../models/ListModels.php';
	require_once __DIR__.'/../models/Movimiento.php';
	require_once __DIR__.'/../access/Movimiento.php';


	/**
	* Crear nueva Movimiento
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Mov = new Models\Movimiento();
		$MAD = new Access\Movimiento($mysqli, $logger);

		$Mov->fechreg 	= new DateTime();
		$Mov->tipo 		= $inputs['tipo'];
		$Mov->cantidad	= $inputs['cantidad'];
		$Mov->lote		= $inputs['lote'];
		$Mov->guia 		= $inputs['guia'];
		$Mov->apunte 	= $inputs['apunte'];
		$Mov->saldoini	= $inputs[''];
		$Mov->saldofin 	= $inputs[''];
		$Mov->idusuario = $inputs[''];
		$Mov->idinventario = $inputs[''];

		$Mov->validate();

		$MAD->create($Mov);

		return $response->withJson($Mov->toArray(), 201);
	});


	/**
	* Obtener todos los usuarios
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
	* Obtener usuario por id
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

		$Mov->tipo 	= $inputs['tipo'];
		$Mov->cantidad	= $inputs['cantidad'];
		$Mov->lote	= $inputs['lote'];
		$Mov->guia 		= $inputs['guia'];
		$Mov->apunte 	= $inputs['apunte'];
		$Mov->saldoini	= $inputs[''];
		$Mov->saldofin 	= $inputs[''];
		$Mov->idusuario = $inputs[''];
		$Mov->idinventario = $inputs[''];

		$Mov->validate();

		$MAD->update($Mov);

		return $response->withJson($Mov->toArray(), 202);
	});


	/**
	* Eliminar usuario por id
	*/
	$this->delete('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$Mov = new Models\Movimiento((int) $args['id']);
		$MAD = new Access\Movimiento($mysqli, $logger);

		$MAD->read($Mov);

		$MAD->delete($Mov);

		return $response->withStatus(204);
	});

});