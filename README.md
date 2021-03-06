# [express-live-reloading](https://www.npmjs.com/package/express-live-reloading)

[![npm](https://img.shields.io/npm/l/express-live-reloading.svg?style=for-the-badge)](https://www.npmjs.com/package/express-live-reloading)
[![npm downloads](https://img.shields.io/npm/dw/express-live-reloading.svg?style=for-the-badge)](https://www.npmjs.com/package/express-live-reloading)
[![npm version](https://img.shields.io/npm/v/express-live-reloading.svg?style=for-the-badge)](https://www.npmjs.com/package/express-live-reloading)

[![Build Status](https://travis-ci.org/Orivoir/express-live-reloading.svg?branch=master)](https://travis-ci.org/Orivoir/express-live-reloading)
[![codecov](https://codecov.io/gh/Orivoir/express-live-reloading/branch/master/graph/badge.svg)](https://codecov.io/gh/Orivoir/express-live-reloading)

> live reloading middleware express for **fast dev** .

![screen demo](./screenshot-demo.png)

### express live reloading watch only files call with your view file for best performances

### re start server is listen with `live-reload.js` for auto reload your view

## Installation

```npm install express-live-reloading --save-dev```

```yarn add express-live-realoading --dev```

### server.js

```javascript
const
    exp = require('express')
    ,app = exp()
    ,server = require('http').Server( app )
    ,liveReload = require('express-live-reloading')( server )
;

liveReload.static( 'public' ) ;

liveReload.toolbar( true ) ; // active toolbar status live reload

app
    .use( exp.static( 'public' ) )
    .use( liveReload )
;

app.get('/' , (req,res) => {

    res
        .liveReload( './views/index.html' )
        .sendFile( __dirname + '\\views\\index.html' )
    ;

} ) ;


server.listen( 80 , () => console.log("server run ...") ) ;

```

### index.html

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Super Document</title>

        <!-- css status toolbar -->
        <link rel="stylesheet" href="/toolbar-live-reload.css">

        <link rel="stylesheet" href="/index.css">
    </head>

    <body>

        <main>

            <h1>Ullamco Lorem eiusmod deserunt elit aliquip ut reprehenderit.</h1>

        </main>

        <!-- socket.io TCP/IP client script  -->
        <script src="/socket.io/socket.io.js" ></script>

        <!-- live reloading app client script -->
        <script src="/live-reload.js"></script>

    </body>
</html>
```

## output `index.html`
```
"[live reload] on"
"index.html --watched with success"
"index.css --watched with success"
```

## with an virtual static directory

### server.js

```javascript
const
    exp = require('express')
    ,app = exp()
    ,server = require('http').Server( app )
    ,liveReload = require('express-live-reloading')( server )
;

liveReload.static(
    '/assets', // virtual directory for you URL
    'public' // phisycal directory in you computer
) ;

app
    .use(
        '/assets' , // virtual directory for you URL
        exp.static( 'public' ) // phisycal directory in you computer
    )
    .use( liveReload )
;

app.get('/' , (req,res) => {

    const render = __dirname + '\\index.html' ;

    res
        .liveReload( './views/index.html' )
        .sendFile( __dirname + '\\views\\index.html' )
    ;

} ) ;

server.listen( 80 , () => console.log("server run ...") ) ;

```

## you can define an views directory with

```javascript
const
    exp = require('express')
    ,app = exp()
    ,server = require('http').Server( app )
    ,liveReload = require('express-live-reloading')( server )
;

liveReload.static(
    '/assets', // virtual directory for you URL
    'public' // phisycal directory in you computer
) ;


// define directory of views render
liveReload.views('./views') ;

// ... ,
```

## the render file is auto search in *root/views*

```javascript
// , ...

liveReload.views('./views') ;

app.get('/' , (req,res) => {

    const render = __dirname + '\\index.html' ;

    res
        .liveReload( './index.html' ) // because views directory is define
        .sendFile( __dirname + '\\views\\index.html' )
    ;

} ) ;

// ... ,
```

## the toolbar default values is `false`

```javascript
// , ...

liveReload.toolbar( /* boolean default false */ true ) ; // active skeleton toolbar

// , ...

```

```html
<!-- css toolbar dist from middleware live reload -->
<link rel="stylesheet" href="/toolbar-live-reload.css">
```

#### develop by [Samuel Gaborieau](https://orivoir.github.io/profil-reactjs/) with **❤️** and **Nodejs** for **open source** and **enjoy**
