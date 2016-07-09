<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/login', function(){

	require_once __DIR__.'/../models/ListModels.php';
	require_once __DIR__.'/../models/Usuario.php';
	require_once __DIR__.'/../access/Usuario.php';


	/**
	* logear usuario
	*/
	$this->map(['POST','PUT'] ,'/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$UAD = new Access\Usuario($mysqli, $logger);

		$ip_pass = $inputs['pass'];

		$list = $UAD->search();

		$user = $list->getBy('user', $inputs['user']);

		if(!isset($list)) 
			throw new \Exception('Usuario no registrado', 404);

		if($user->pass != $inputs['pass']) 
			throw new \Exception('Contraseña incorrecta', 401);

		if($user->estado == false)
			throw new \Exception('Usuario inactivo', 401);

		$_SESSION['login'] = $user->toArray(['pass'], true);

		return $response->withJson($_SESSION['login'], 202);
	});


	/**
	* Obtener datos del usuario actual
	*/
	$this->get('/', function ($request, $response, $args) {

		$login = &$this->login;
		return $response->withJson($user, 200);
	});


	/**
	* Eliminar sesion
	*/
	$this->delete('/', function ($request, $response, $args) {

		unset($_SESSION['login']);
		return $response->withStatus(204);
	});

});