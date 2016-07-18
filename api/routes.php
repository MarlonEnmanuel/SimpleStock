<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'index.phtml');
});


foreach (glob(__DIR__.'/routes/*.php') as $key => $filename){
	require_once $filename;
}


$app->get('/{a}[/{b}[/{c}[/{d}[/e}[/{f}[/{g}]]]]]]', function ($request, $response, $args) {
    header('Location: /');
    exit;
});