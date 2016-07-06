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
		throw new Exception('Error al conectar con la base de datos');
	}else{
		$mysqli->set_charset("utf8");
	}
	return $mysqli;
};