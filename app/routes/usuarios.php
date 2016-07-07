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

		$inputs = $request->getParsedBody();

		$Usu = new Models\Usuario();
		$Uad = new Access\Usuario($mysqli, $logger);

		$Usu->fechreg 	= new DateTime();
		$Usu->estado 	= $inputs['estado'];
		$Usu->user 		= $inputs['user'];
		$Usu->pass 		= $inputs['pass'];
		$Usu->nombres	= $inputs['nombres'];
		$Usu->apellidos = $inputs['apellidos'];
		$Usu->puesto	= $inputs['puesto'];

		$Usu->validate();

		$Uad->create($Usu);

		return $response->withJson($Usu->toArray(['pass'], true), 201);
	});


	/**
	* Obtener todos los usuarios
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;

		$Uad = new Access\Usuario($mysqli, $logger);
		$lista = $Uad->search();
		
		return $response->withJson($lista->toArray(['pass'], true));
	});


	/**
	* Obtener usuario por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;

		$Usu = new Models\Usuario((int) $args['id']);
		$Uad = new Access\Usuario($mysqli, $logger);

		$Uad->read($Usu);

		return $response->withJson($Usu->toArray(['pass'], true));
	});



});