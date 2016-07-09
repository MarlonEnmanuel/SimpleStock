<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], Monolog\Logger::DEBUG));
    return $logger;
};

//Mysql Connection
$container['mysqli'] = function($c){
	$settings = $c->get('settings')['connection'];
	$mysqli =   new mysqli ($settings['host'],
                        	$settings['user'],
                        	$settings['pass'],
                        	$settings['name'],
                        	$settings['port']);
	if($mysqli->connect_errno){
		throw new Exception('Error al conectar con la base de datos', 500);
	}else{
		$mysqli->set_charset("utf8");
	}
	return $mysqli;
};

$container['login'] = function($c){
    if(isset($_SESSION['login'])){
        return $_SESSION['login'];
    }else{
        throw new Exception('Acceso denegado, inicie sesión', 403);
    }
};

$container['errorHandler'] = function($c){
    return function ($request, $response, $exception) use ($c) {

        $code = $exception->getCode() ? $exception->getCode() : 500;
        $mess = $exception->getMessage();
        $type = 'text/plain;charset=utf-8';

        return $c['response']->withStatus( $code )
                             ->withHeader('Content-Type', $type)
                             ->write( $mess );
    };
};