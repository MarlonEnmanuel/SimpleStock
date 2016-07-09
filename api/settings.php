<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
        ],

        //Database Settings
        'connection' => [
            'host' => "localhost",             //Dirección de la BD
            'user' => "usersimplestock",       //Usuario de la BD
            'pass' => "aplicacionsimplestock", //Password de la BD
            'name' => "simplestock",           //Nombre de la BD   
            'port' => "3306",                  //Puerto de la BD
        ],
    ],
];
