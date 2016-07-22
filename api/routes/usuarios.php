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

		$isAdmin = ($login['user']=='administrador' && $login['id']==1);

		if(!$isAdmin) 
			throw new Exception("No está autorizado", 403);

		$inputs = $request->getParsedBody();

		$Usu = new Models\Usuario();
		$UAD = new Access\Usuario($mysqli, $logger);

		$Usu->fechreg 	= new DateTime();
		$Usu->estado 	= true;
		$Usu->user 		= $inputs['user'];
		$Usu->pass 		= '123456';
		$Usu->nombres	= $inputs['nombres'];
		$Usu->apellidos = $inputs['apellidos'];
		$Usu->puesto	= $inputs['puesto'];

		$Usu->validate();

		try{
			$UAD->create($Usu);
		}catch(\Exception $e){
			throw new Exception("El nombre de usuario ya existe", 500);
		}

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

		$isAdmin = ($login['user']=='administrador' && $login['id']==1);
		$isme = $login['id'] == $args['id'];

		if($isAdmin) {

			if(!$isme){
				$Usu->user 		= $inputs['user'];
			}
			
			$Usu->nombres	= $inputs['nombres'];
			$Usu->apellidos = $inputs['apellidos'];
			$Usu->puesto	= $inputs['puesto'];
		}else{

			if($isme){
				$Usu->nombres	= $inputs['nombres'];
				$Usu->apellidos = $inputs['apellidos'];
			}else{
				throw new Exception("No está autorizado", 403);
			}
		}

		$Usu->validate();

		try{
			$UAD->update($Usu);
		}catch(\Exception $e){
			throw new Exception("El nombre de usuario está en uso", 500);
		}

		if($login['id']==$Usu->id){
			$_SESSION['login'] = $Usu->toArray(['pass'], true);
		}

		return $response->withJson($Usu->toArray(['pass'], true), 202);
	});

	/**
	* Cambiar Contraseña
	*/
	$this->put('/{id}/nuevopass', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Usu = new Models\Usuario((int) $args['id']);
		$UAD = new Access\Usuario($mysqli, $logger);

		$UAD->read($Usu);

		$isme = $login['id'] == $args['id'];

		if(!$isme) 
			throw new Exception("No está autorizado", 403);

		if($Usu->pass!=$inputs['passold'])
			throw new Exception("Contraseña actual incorrecta", 403);

		if($inputs['newpass1']!=$inputs['newpass2']){
			throw new Exception("Las contraseñas no coinciden", 500);
		}
		
		$Usu->pass = $inputs['newpass1'];

		$Usu->validate();

		$UAD->update($Usu);

		return $response->withJson($Usu->toArray(['pass'], true), 202);
	});


	/**
	* Cambiar estado de usuario
	*/
	$this->put('/{id}/cambiarEstado', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Usu = new Models\Usuario((int) $args['id']);
		$UAD = new Access\Usuario($mysqli, $logger);

		$UAD->read($Usu);

		$isAdmin = ($login['user']=='administrador' && $login['id']==1);
		$isme = $login['id'] == $args['id'];

		if($isAdmin) {

			if($isme){
				throw new Exception("No se puede desactivar", 403);
			}else{
				$Usu->estado = $inputs['estado'];
			}
		}else{

			throw new Exception("No está autorizado", 403);
		}

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

		$isAdmin = ($login['user']=='administrador' && $login['id']==1);

		if(!$isAdmin) 
			throw new Exception("No está autorizado", 403);

		$Usu = new Models\Usuario((int) $args['id']);
		$UAD = new Access\Usuario($mysqli, $logger);

		$UAD->read($Usu);

		try{
			$UAD->delete($Usu);
		}catch(\Exception $e){
			throw new Exception("No se puede eliminar porque este usuario ha registrado movimientos", 500);
		}

		return $response->withStatus(204);
	});

});