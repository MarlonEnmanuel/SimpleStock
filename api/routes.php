<?php
// Routes

$app->get('/', function ($request, $response, $args) {
	$args = [
		'pagename' => 'Login',
		'templates' => __DIR__.'/../app/templates/*.html'
	];
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/home[/]', function ($request, $response, $args) {
	$args = [
		'pagename' => 'Home',
		'templates' => __DIR__.'/../app/templates/*.html'
	];
    return $this->renderer->render($response, 'index.phtml', $args);
});


foreach (glob(__DIR__.'/routes/*.php') as $key => $filename){
	require_once $filename;
}