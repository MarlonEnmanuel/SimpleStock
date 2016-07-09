<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/productos', function(){

	require_once __DIR__.'/../models/ListModels.php';

	require_once __DIR__.'/../models/Producto.php';
	require_once __DIR__.'/../access/Producto.php';

	require_once __DIR__.'/../models/Inventario.php';
	require_once __DIR__.'/../access/Inventario.php';

	/**
	* Crear nuevo producto
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Pro = new Models\Producto();
		$PAD = new Access\Producto($mysqli, $logger);

		$Pro->codigo 	= $inputs['codigo'];
		$Pro->nombre	= $inputs['nombre'];
		$Pro->descrip	= $inputs['descrip'];
		$Pro->idusuario	= $login['id'];
		$Pro->idcategoria = $inputs['idcategoria'];

		$Pro->validate();

		$PAD->create($Pro);

		return $response->withJson($Pro->toArray(), 201);
	});


	/**
	* Obtener todos las Productos
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$PAD = new Access\Producto($mysqli, $logger);

		$lista = $PAD->search();
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener productos por periodo
	*/
	$this->get('/periodo/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$PAD = new Access\Producto($mysqli, $logger);
		$IAD = new Access\Inventario($mysqli, $logger);

		$invs = $IAD->search()->searchBy('idperiodo', $args['id']);

		$prods = new Models\ListModels(new Models\Producto());
		foreach ($invs->list as $key => $iv) {
			$pro = new Models\Producto($iv->idproducto);
			$PAD->read($pro);
			$prods->add($pro);
		}
		
		return $response->withJson($prods->toArray());
	});


	/**
	* Obtener Producto por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Pro = new Models\Producto((int) $args['id']);
		$PAD = new Access\Producto($mysqli, $logger);

		$PAD->read($Pro);

		return $response->withJson($Pro->toArray());
	});


	/**
	* Actualizar Producto por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Pro = new Models\Producto((int) $args['id']);
		$PAD = new Access\Producto($mysqli, $logger);

		$PAD->read($Pro);

		$Pro->codigo 	= $inputs['codigo'];
		$Pro->nombre	= $inputs['nombre'];
		$Pro->descrip	= $inputs['descrip'];
		$Pro->idcategoria = $inputs['idcategoria'];

		$Pro->validate();

		$PAD->update($Pro);

		return $response->withJson($Pro->toArray(), 202);
	});


	/**
	* Eliminar Producto por id
	*/
	$this->delete('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Pro = new Models\Producto((int) $args['id']);
		$PAD = new Access\Producto($mysqli, $logger);

		$PAD->read($Pro);

		$PAD->delete($Pro);

		return $response->withStatus(204);
	});

});