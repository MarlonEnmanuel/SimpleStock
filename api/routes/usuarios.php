<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/usuarios', function(){

	require_once __DIR__.'/../models/ListModels.php';
	require_once __DIR__.'/../models/Usuario.php';
	require_once __DIR__.'/../access/Usuario.php';


	/**
	* Crear nuevo usuario
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Usu = new Models\Usuario();
		$UAD = new Access\Usuario($mysqli, $logger);

		$Usu->fechreg 	= new DateTime();
		$Usu->estado 	= $inputs['estado'];
		$Usu->user 		= $inputs['user'];
		$Usu->pass 		= $inputs['pass'];
		$Usu->nombres	= $inputs['nombres'];
		$Usu->apellidos = $inputs['apellidos'];
		$Usu->puesto	= $inputs['puesto'];

		$Usu->validate();

		$UAD->create($Usu);

		return $response->withJson($Usu->toArray(['pass'], true), 201);
	});


	/**
	* Obtener todos los usuarios
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$UAD = new Access\Usuario($mysqli, $logger);
		$lista = $UAD->search();
		
		return $response->withJson($lista->toArray(['pass'], true));
	});


	/**
	* Obtener usuario por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$Usu = new Models\Usuario((int) $args['id']);
		$UAD = new Access\Usuario($mysqli, $logger);

		$UAD->read($Usu);

		return $response->withJson($Usu->toArray(['pass'], true));
	});


	/**
	* Actualizar usuario por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Usu = new Models\Usuario((int) $args['id']);
		$UAD = new Access\Usuario($mysqli, $logger);

		$UAD->read($Usu);

		$Usu->estado 	= $inputs['estado'];
		$Usu->user 		= $inputs['user'];
		$Usu->pass 		= $inputs['pass'];
		$Usu->nombres	= $inputs['nombres'];
		$Usu->apellidos = $inputs['apellidos'];
		$Usu->puesto	= $inputs['puesto'];

		$Usu->validate();

		$UAD->update($Usu);

		return $response->withJson($Usu->toArray(['pass'], true), 202);
	});


	/**
	* Eliminar usuario por id
	*/
	$this->delete('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$Usu = new Models\Usuario((int) $args['id']);
		$UAD = new Access\Usuario($mysqli, $logger);

		$UAD->read($Usu);

		$UAD->delete($Usu);

		return $response->withStatus(204);
	});

});