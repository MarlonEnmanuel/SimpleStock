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

		$Inv = new Models\Inventario((int) $inputs['idinventario']);
		$IAD->read($Inv);
		
		$Mov = new Models\Movimiento();
		$Mov->fechreg 	= \DateTime::createFromFormat('d-m-Y H:i', $inputs['fechreg']);
		$Mov->tipo 		= $inputs['tipo'];
		$Mov->cantidad	= $inputs['cantidad'];
		$Mov->lote		= $inputs['lote'];
		$Mov->guia 		= $inputs['guia'];
		$Mov->apunte 	= $inputs['apunte'];
		$Mov->idusuario = $login['id'];
		$Mov->idinventario= $inputs['idinventario'];

		if($Mov->fechreg===false)
			throw new Exception("Fecha inválida, formato no aceptado<br>Ejemplo Correcto: 4-4-2014 02:05", 400);

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
			$mysqli->commit();
		}catch(\Exception $e){
			$mysqli->rollback();
			throw $e;
		}finally{
			$mysqli->autocommit(true);
		}

		return $response->withJson($Mov->toArray(), 201);
	});

	/**
	* Actualizar movimiento por id
	*/
	$this->put('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$inputs = $request->getParsedBody();

		$Mov = new Models\Movimiento((int) $args['id']);
		$MAD = new Access\Movimiento($mysqli, $logger);

		$MAD->read($Mov);

		$Mov->fechreg 	= \DateTime::createFromFormat('d-m-Y H:i', $inputs['fechreg']);
		$Mov->tipo 		= $inputs['tipo'];
		$Mov->cantidad	= $inputs['cantidad'];
		$Mov->lote		= $inputs['lote'];
		$Mov->guia 		= $inputs['guia'];
		$Mov->apunte 	= $inputs['apunte'];

		if($Mov->fechreg===false)
			throw new Exception("Fecha inválida, formato no aceptado<br>Ejemplo Correcto: 4-4-2014 02:05", 400);

		$Mov->validate();

		$MAD->update($Mov);

		return $response->withJson($Mov->toArray(), 202);
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
	$this->get('/inventario/{id}/desde/{desde}/hasta/{hasta}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$desde;$hasta;

		if($args['desde']=='null'){
			$desde = null;
		}else{
			$desde = \DateTime::createFromFormat('d-m-Y H:i', $args['desde']);
			if($desde===false)
				throw new Exception("La fecha 'desde' no es válida", 400);
		}

		if($args['hasta']=='null'){
			$hasta = null;
		}else{
			$hasta = \DateTime::createFromFormat('d-m-Y H:i', $args['hasta']);
			if($hasta===false)
				throw new Exception("La fecha 'hasta' no es válida", 400);
		}

		$MAD = new Access\Movimiento($mysqli, $logger);
		$IAD = new Access\Inventario($mysqli, $logger);

		$inv = new Models\Inventario($args['id']);

		$IAD->read($inv);

		$lista = $MAD->searchByInventario($args['id'], $desde, $hasta);
		
		return $response->withJson($lista->toArray());
	});

	/**
	* Obtener todos los movimientos por inventario
	*/
	$this->get('/inventario/{id}/desde/{desde}/hasta/{hasta}/entradas', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$desde;$hasta;

		if($args['desde']=='null'){
			$desde = null;
		}else{
			$desde = \DateTime::createFromFormat('d-m-Y H:i', $args['desde']);
			if($desde===false)
				throw new Exception("La fecha 'desde' no es válida", 400);
		}

		if($args['hasta']=='null'){
			$hasta = null;
		}else{
			$hasta = \DateTime::createFromFormat('d-m-Y H:i', $args['hasta']);
			if($hasta===false)
				throw new Exception("La fecha 'hasta' no es válida", 400);
		}

		$MAD = new Access\Movimiento($mysqli, $logger);
		$IAD = new Access\Inventario($mysqli, $logger);

		$inv = new Models\Inventario($args['id']);

		$IAD->read($inv);

		$lista = $MAD->searchByInventario($args['id'], $desde, $hasta);

		$lista = $lista->searchBy('tipo', 'entrada');
		
		return $response->withJson($lista->toArray());
	});

	$this->get('/inventario/{id}/desde/{desde}/hasta/{hasta}/salidas', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$desde;$hasta;

		if($args['desde']=='null'){
			$desde = null;
		}else{
			$desde = \DateTime::createFromFormat('d-m-Y H:i', $args['desde']);
			if($desde===false)
				throw new Exception("La fecha 'desde' no es válida", 400);
		}

		if($args['hasta']=='null'){
			$hasta = null;
		}else{
			$hasta = \DateTime::createFromFormat('d-m-Y H:i', $args['hasta']);
			if($hasta===false)
				throw new Exception("La fecha 'hasta' no es válida", 400);
		}

		$MAD = new Access\Movimiento($mysqli, $logger);
		$IAD = new Access\Inventario($mysqli, $logger);

		$inv = new Models\Inventario($args['id']);

		$IAD->read($inv);

		$lista = $MAD->searchByInventario($args['id'], $desde, $hasta);

		$lista = $lista->searchBy('tipo', 'salida');
		
		return $response->withJson($lista->toArray());
	});

	/**
	* Actualizar los valores por inventario
	*/
	$this->put('/inventario/{id}/actualizar', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$MAD = new Access\Movimiento($mysqli, $logger);
		$IAD = new Access\Inventario($mysqli, $logger);
		$inv = new Models\Inventario($args['id']);

		$IAD->read($inv);
		$lista = $MAD->searchByInventario($args['id'], $desde, $hasta);

		$negativos = false;

		$stock = $inv->inicial;
		foreach ($lista->list as $i => $mov) {
			$mov->saldoini = $stock;
			if($mov->tipo=='entrada'){
				$stock += $mov->cantidad;
			}else{
				$stock -= $mov->cantidad;
			}
			$mov->saldofin = $stock;
			if($stock<0) $negativos=true;
			$MAD->update($mov);
		}
		$inv->saldo = $stock;

		$IAD->update($inv);

		$rpta = 'Actualización Exitosa';
		if($negativos) $rpta .= '<br>Se encontraron saldos negativos, porfavor verificar.';

		$i = $inv->toArray();
		$i['mensaje'] = $rpta;

		return $response->withJson($i);
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
	* Eliminar movimiento por id
	*/
	$this->delete('/{id}', function ($request, $response, $args) {

		$mysqli = &$this->mysqli;
		$logger = &$this->logger;
		$login  = &$this->login;

		$Mov = new Models\Movimiento($args['id']);
		$MAD = new Access\Movimiento($mysqli, $logger);

		$MAD->read($Mov);

		$MAD->delete($Mov);

		return $response->withStatus(204);
	});

});