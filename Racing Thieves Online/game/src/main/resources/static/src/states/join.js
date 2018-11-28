CatCatcher.joinState = function (game) {

}

var i = 0;

CatCatcher.joinState.prototype = {
	
	// Obtenemos el número de jugadores creados con this.getNumPlayers. Si ya hay 
	// suficientes jugadores, echa al menú al jugador para que lo vuelva a intentar.
	init: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length > 1) {
				console.log ('==========================================================');
				console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
				console.log ('==========================================================');
				game.state.start('menu');
			}
		});
		

	},
		
    preload: function () {
        var text = "- MatchMaking -\n Esperando otro jugador \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX - 200, 0, text, style);
    },

    // en CREATE, a pesar de estar bastante lejos de INIT, puede dar tiempo a que se cree el jugador
    // ya que this.getNumPlayers puede haberse ejecutado en su totalidad (a falta del DONE) y Phaser
    // sigue con la ejecución de PRELOAD y de CREATE. ¡¡¡ Esa es una de las claves.!!!
    create: function () {
    	this.createPlayer();
    	this.createBall();
    	for(var i = 0; i<25; i++){
    	this.createCoins();
    	}

    },

    // Una vez hay suficientes jugadores, se pasa a levelState. El problema de no hacer en INIT
    // el this.createPlayer, haciendo un ELSE de si puede crear jugadores, es que va tan rápido,
    // que antes de haber comprobado si más de 1 jugador ya conectado, llega aquí y te dice que hay ya 2.
    // Por eso el comprobador de >1 y que en el MENÚ revise si hay un jugador sobrante creado para eliminar.
    update: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('online');
			}
		});
		
    }, 
    
    getNumPlayers: function (callback) {
        $.ajax({
            url: window.location.href + '/game',
        }).done(function (data) {
            callback(data);
            
        })
    },
    
    createPlayer: function () {
        $.ajax({
            method: "POST",
            url: window.location.href + '/game',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Player created: " + JSON.stringify(data));
            game.player1 = data
            game.player1.skin = skin;
        })
    },
    
    createBall: function () {
        $.ajax({
            method: "POST",
            url: window.location.href + '/ball',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Ball created: " + JSON.stringify(data));
            game.ball1 = data;
        })
    },
    
    createCoins: function () {
        $.ajax({
            method: "POST",
            url: window.location.href + '/coin',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Coins created: " + JSON.stringify(data));
            game.c = data;
        })
    }

    

    

}
