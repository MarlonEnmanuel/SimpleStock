# SimpleStock

Esta es una aplicación simple para control de inventarios, gestión simple de usuarios, registro de entradas y salidas, generación de kardex, etc.


## Como instalar

### Requisitos

* Tener instalado WAMP, se recomienda [AppServ 8.4.0](https://www.appservnetwork.com/en/download/ "Descargar AppServ 8.4.0")
* Configurar ruta de php como variable de entorno en window
* Descargar SimpleStock en formato zip desde este repositorio

### Crear la base de datos

* Ingresar a MySql desde el gestor de su preferencia y ejecutar el script de creación ubicado en `./database/simplestock.sql`

### Ejecutar
Dirigirse a la ruta donde se descargó SimpleStock y ejecutar lo siguiente

``` [CMD]
php -S 0.0.0.0:80 -t public
```