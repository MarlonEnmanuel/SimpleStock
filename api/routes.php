<?php
// Routes

$app->get('/[{name}]', function ($request, $response, $args) {

	$args = [
		'pagename' => 'home',
		'templates' => __DIR__.'/../app/templates/*.html'
	];

    return $this->renderer->render($response, 'index.phtml', $args);
});


foreach (glob(__DIR__.'/routes/*.php') as $key => $filename){
	require_once $filename;
}