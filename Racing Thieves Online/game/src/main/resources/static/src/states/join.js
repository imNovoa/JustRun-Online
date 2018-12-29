CatCatcher.joinState = function (game) {

}

var i = 0;
var onlineP1;
var onlineP2;
var numPlayers;
var checkNum = false;

//API de WebSocket
//https://developer.mozilla.org/es/docs/Web/API/WebSocket

debug = {
 ws: 1
}

//La URL a la cual se conecta, debe ser la URL con la cual el servidor WebSocket debe responder.
var ws = new WebSocket('ws://' + window.location.href '/gameplayer')

//Un monitor de eventos que es llamado cuando el estado readyState de la conexión Websocket cambia a OPEN. Esto indica que la conexión está lista para enviar y recibir datos. El evento es uno simple con el nombre "open".
ws.onopen = function (event) {
 if (debug.ws) {
     console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.')
 }
 data = {
     type: 'JOIN'
 }
 this.send(JSON.stringify(data))

}

//Un monitor de eventos que es llamado cuando un error ocurre. Esto es un evento simple llamado "error"
ws.onerror = function (error) {
 console.log('[DEBUG-WS] Ha ocurrido un error: ' + error)
}

//Un monitor de eventos que atiende una llamada cuando la conexión del WebSocket cambia a un estado CERRADO (CLOSED). El monitor recibe un CloseEvent llamado "cerrado".
ws.onclose = function (event) {
 if (debug.ws) {
     console.log('[DEBUG-WS] Se ha cerrado la conexion.')
 }
}

//Un monitor de eventos que es llamado cuando un mensaje es recibido desde un servidor. El monitor recibe un objeto MessageEvent llamado "mensaje".
ws.onmessage = function (message) {
 if (debug.ws) {
     console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data)
 }

 var msg = JSON.parse(message.data)

 console.log('INFO RECIBIDA ' + msg.type)

 switch (msg.type) {
     case "PLAYER_CREATED":
         console.log('@@@@@@ PLAYER CREATED @@@@@')
         console.log('id: ' + msg.player.id)
         console.log('pos: (' + msg.player.x + ',' + msg.player.y + ')')
         console.log('score: ' + msg.player.score)
         onlineP1 = msg.player
         break
     case "GAME_COMPLETE":
         console.log('##### GAME IS COMPLETE #####')
         break
     case "PLAYER2_UPDATED":
         onlineP2 = msg.player2;
         break
     case "TOTAL_PLAYERS":
    	 numPlayers = msg.numPlayers;
    	 break
 }
}


CatCatcher.joinState.prototype = {
	
	// Obtenemos el número de jugadores creados con this.getNumPlayers. Si ya hay 
	// suficientes jugadores, echa al menú al jugador para que lo vuelva a intentar.
	init: function () {
		
		

	},
		
    preload: function () {
        var text = "- MatchMaking -\n Esperando otro jugador \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX - 200, 0, text, style);
    },

    //En create le pasamos la skin al server y le decimos que el jugador se ha unido a la partida
    create: function () {
    	onlineP1.skin = skin;
    	onlineP1.joined = true;
    	var data = {
    			"type": "updatePlayer",
    			"id" : onlineP1.id,
    			"x" : onlineP1.x,
    			"y" : onlineP1.y,
    			"skin" : onlineP1.skin,
    			"rightDown" : onlineP1.rightDown,
    			"leftDown" : onlineP1.leftDown,
    			"joined" :  onlineP1.joined,
    			"spaceDown" : onlineP1.spaceDown,
    			"isWinner" : onlineP1.isWinner
    	}
    	ws.send(JSON.stringify(data));
    },
    
    //En update cuando se comprueba que hay dos jugadores que se han unido, se pasa al estado de partida online. checkNum es para comprobar que se han
    //recopilado los datos del otro jugador y una vez se haya hecho eso podemos comprobar si se ha unido a partida
    update: function () {
    	var n = {
    			"type" : "getNumPlayers",
    	}
    	ws.send(JSON.stringify(n));
    	
    	if(numPlayers == 2){
    		
    		if(checkNum == false){
    		 var p2data = {
    	     			"type": "getPlayer2",
    	     			"id": onlineP1.id
    	     	}
    	     	ws.send(JSON.stringify(p2data));
    		 checkNum = true;
    		}else{
    			var p2data = {
    	     			"type": "getPlayer2",
    	     			"id": onlineP1.id
    	     	}
    	     	ws.send(JSON.stringify(p2data));
    		 if(onlineP1.joined == true && onlineP2.joined == true){
    		this.state.start("online");
    		 }
    		 }
    	}
		
    }, 
    

    

}
