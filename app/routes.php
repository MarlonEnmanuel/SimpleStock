<?php
// Routes
use SimpleStock\Models as Models;
use SimpleStock\Access as Access;

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});


$app->post('/api/usuario', function($request, $response){
	require_once __DIR__.'/access/Usuario.php';
	require_once __DIR__.'/models/Usuario.php';

	$inputs = $request->getParsedBody();
	$mysqli = $this->mysqli;

	$Usu = new Models\Usuario();
	$Uad = new Access\Usuario($mysqli);

	$Usu->fechreg 	= new DateTime();
	$Usu->estado 	= true;
	$Usu->user 		= $inputs['user'];
	$Usu->pass 		= $inputs['pass'];
	$Usu->nombres	= $inputs['nombres'];
	$Usu->apellidos = $inputs['apellidos'];
	$Usu->puesto	= $inputs['puesto'];

	$Uad->create($Usu);

	$response->getBody()->write($Usu->toJSON());
});