# WhereWeEat

## Descripción

¡Bienvenido a WhereWeEat! En este repositorio, encontrarás todos los recursos necesarios para instalar y probar nuestra página web paso a paso.

## Pasos

### Paso 1

Lo primero de todo, vamos a tener que copiarnos el repositorio en un directorio de nuestro ordenador. Para ello, ejecuta el siguiente comando en tu terminal:

```
git clone https://github.com/FranN2442/WhereWeEat.git
```

### Paso 2

Cuando tengamos el repositorio, lo abrimos, y lo primero que tendremos que hacer es ir a la carpeta src/main.html. En el script que importa la api del mapa, añadimos nuestra Google Maps API Key:

```
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=MY_API_KEY&libraries=places&callback=initMap"></script>

```
Reemplaza MY_API_KEY con tu propia clave de API de Google Maps.

### Paso 3 
Ejecutamos en la carpeta del proyecto el siguiente comando para instalar las dependencias del proyecto:

```
npm install
```
Esto instalará todas las dependencias necesarias para el proyecto.

### Paso 4

Podemos ver que en la carpeta principal tenemos una carpeta Bootstrap que contiene los archivos personalizados de nuestro proyecto. La arrastramos dentro de node_modules y le damos a reemplazar.

### Paso 5 
Por último, ejecutamos el siguiente comando para compilar el proyecto:
```
npm run build
```
Y con el siguiente comando, podremos iniciar el servidor webpack para trabajar con el proyecto:

```
npm run start
```
Esto iniciará el servidor webpack para que puedas comenzar a trabajar en el proyecto, etndras que acceder a [http://localhost:9000/](http://localhost:9000/)
