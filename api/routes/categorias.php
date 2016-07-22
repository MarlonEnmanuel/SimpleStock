<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/categorias', function(){

	require_once __DIR__.'/../models/ListModels.php';
	require_once __DIR__.'/../models/Categoria.php';
	require_once __DIR__.'/../access/Categoria.php';


	/**
	* Crear nueva categoria
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Cat = new Models\Categoria();
		$CAD = new Access\Categoria($mysqli, $logger);

		$Cat->codigo 	= $inputs['codigo'];
		$Cat->nombre	= $inputs['nombre'];
		$Cat->descrip	= $inputs['descrip'];
		$Cat->idusuario	= $login['id'];

		$Cat->validate();

		try{
			$CAD->create($Cat);
		}catch(\Exception $e){
			throw new Exception("El código o el nombre ya existe", 500);
		}

		return $response->withJson($Cat->toArray(), 201);
	});


	/**
	* Obtener todos las categorias
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$CAD = new Access\Categoria($mysqli, $logger);
		$lista = $CAD->search();
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener categoria por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Cat = new Models\Categoria((int) $args['id']);
		$CAD = new Access\Categoria($mysqli, $logger);

		$CAD->read($Cat);

		return $response->withJson($Cat->toArray());
	});


	/**
	* Actualizar categoria por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Cat = new Models\Categoria((int) $args['id']);
		$CAD = new Access\Categoria($mysqli, $logger);

		$CAD->read($Cat);

		$Cat->codigo 	= $inputs['codigo'];
		$Cat->nombre	= $inputs['nombre'];
		$Cat->descrip	= $inputs['descrip'];

		$Cat->validate();

		try{
			$CAD->update($Cat);
		}catch(\Exception $e){
			throw new Exception("El código o el nombre está en uso", 500);
		}

		return $response->withJson($Cat->toArray(), 202);
	});


	/**
	* Eliminar categoria por id
	*/
	$this->delete('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Cat = new Models\Categoria((int) $args['id']);
		$CAD = new Access\Categoria($mysqli, $logger);

		$CAD->read($Cat);

		try{
			$CAD->delete($Cat);
		}catch(\Exception $e){
			throw new Exception("No se puede eliminar porque esta categoría tiene productos", 500);
		}

		return $response->withStatus(204);
	});

});