<?php

use \SimpleStock\Models as Models;
use \SimpleStock\Access as Access;

$app->group('/api/inventarios', function(){

	require_once __DIR__.'/../models/ListModels.php';

	require_once __DIR__.'/../models/Inventario.php';
	require_once __DIR__.'/../access/Inventario.php';

	require_once __DIR__.'/../models/Periodo.php';
	require_once __DIR__.'/../access/Periodo.php';

	require_once __DIR__.'/../models/Producto.php';
	require_once __DIR__.'/../access/Producto.php';


	/**
	* Crear nuevo inventario
	*/
	$this->post('/', function($request, $response){

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Inv = new Models\Inventario();
		$IAD = new Access\Inventario($mysqli, $logger);

		$Inv->inicial 	 = $inputs['inicial'];
		$Inv->saldo 	 = $inputs['inicial'];
		$Inv->idproducto = $inputs['idproducto'];

		$Inv->validate();

		$Pro = new Models\Producto($Inv->idproducto);
		$PROAD = new Access\Producto($mysqli, $logger);
		$PROAD->read($Pro);

		$PAD = new Access\Periodo($mysqli, $logger);
		$Per = $PAD->search()->getBy('actual', true);

		$Inv->idperiodo = $Per->id;

		$list = $IAD->search();
		$listPer = $list->searchBy('idperiodo', $Inv->idperiodo);

		if($listPer->size()>0){
			$listPro = $listPer->searchBy('idproducto', $Inv->idproducto);
			if($listPro->size()>0){
				throw new \Exception("Este producto ya está inventariado en el periodo actual", 400);
			}
		}

		$IAD->create($Inv);

		return $response->withJson($Inv->toArray(), 201);
	});


	/**
	* Obtener todos los inventarios
	*/
	$this->get('/', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$IAD = new Access\Inventario($mysqli, $logger);
		$lista = $IAD->search();
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener inventarios por periodo
	*/
	$this->get('/periodo/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$IAD = new Access\Inventario($mysqli, $logger);

		$lista = $IAD->search()->searchBy('idperiodo', $args['id']);
		
		return $response->withJson($lista->toArray());
	});


	/**
	* Obtener inventario por periodo y producto
	*/
	$this->get('/periodo/{idperiodo}/producto/{idproducto}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$IAD = new Access\Inventario($mysqli, $logger);

		$lista = $IAD->search()->searchBy('idperiodo', $args['idperiodo']);
		$inv = $lista->getBy('idproducto', $args['idproducto']);
		
		return $response->withJson($inv->toArray());
	});


	/**
	* Obtener inventario por id
	*/
	$this->get('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Inv = new Models\Inventario((int) $args['id']);
		$IAD = new Access\Inventario($mysqli, $logger);

		$IAD->read($Inv);

		return $response->withJson($Inv->toArray());
	});


	/**
	* Actualizar inventario por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Inv = new Models\Inventario($args['id']);
		$IAD = new Access\Inventario($mysqli, $logger);

		$IAD->read($Inv);

		$Inv->inicial = $inputs['inicial'];

		$Inv->validate();

		$IAD->update($Inv);

		return $response->withJson($Inv->toArray(), 202);
	});


	/**
	* Eliminar inventario por id
	*/
	$this->delete('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Inv = new Models\Inventario($args['id']);
		$IAD = new Access\Inventario($mysqli, $logger);

		$IAD->read($Inv);

		try{
			$IAD->delete($Inv);
		}catch(\Exception $e){
			throw new Exception("No se puede eliminar porque se han registrado movimientos en este inventario", 500);
		}

		return $response->withStatus(204);
	});


});