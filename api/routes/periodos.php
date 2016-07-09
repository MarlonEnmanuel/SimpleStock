<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/periodos', function(){

	require_once __DIR__.'/../models/ListModels.php';
	require_once __DIR__.'/../models/Periodo.php';
	require_once __DIR__.'/../access/Periodo.php';


	/**
	* Crear nuevo periodo
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Per = new Models\Periodo();
		$PAD = new Access\Periodo($mysqli, $logger);

		$actual = $PAD->search()->getBy('actual', true);

		if(isset($actual))
			throw new \Exception('Aun existe un periodo en transcurso');

		$Per->nombre	= $inputs['nombre'];
		$Per->descrip	= $inputs['descrip'];
		$Per->actual 	= true;
		$Per->fechini	= new \DateTime();
		$Per->fechfin	= null;
		$Per->idusuario	= $login['id'];

		$Per->validate();

		$PAD->create($Per);

		return $response->withJson($Per->toArray(), 201);
	});


	/**
	* Obtener todos los periodos
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$PAD = new Access\Periodo($mysqli, $logger);
		$lista = $PAD->search();
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener periodo por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Per = new Models\Periodo((int) $args['id']);
		$PAD = new Access\Periodo($mysqli, $logger);

		$PAD->read($Per);

		return $response->withJson($Per->toArray());
	});


	/**
	* Obtener periodo actual
	*/
	$this->get('/actual/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$PAD = new Access\Periodo($mysqli, $logger);

		$lista = $PAD->search();

		$actual = $PAD->search()->getBy('actual', true);

		if(!isset($actual))
			throw new \Exception('Ningún periodo está en transcurso', 404);

		return $response->withJson($actual->toArray());
	});


	/**
	* Actualizar periodo por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Per = new Models\Periodo((int) $args['id']);
		$PAD = new Access\Periodo($mysqli, $logger);

		$PAD->read($Per);

		$Per->nombre	= $inputs['nombre'];
		$Per->descrip	= $inputs['descrip'];

		$Per->validate();

		$PAD->update($Per);

		return $response->withJson($Per->toArray(), 202);
	});


	/**
	* finalizar periodo
	*/
	$this->put('/actual/cerrar/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$PAD = new Access\Periodo($mysqli, $logger);

		$lista = $PAD->search();

		$actual = $PAD->search()->getBy('actual', true);

		if(!isset($actual))
			throw new \Exception('Ningún periodo está en transcurso', 404);

		$actual->actual	 = false;
		$actual->fechfin = new \DateTime();

		$PAD->update($actual);

		return $response->withJson($actual->toArray(), 202);
	});


});