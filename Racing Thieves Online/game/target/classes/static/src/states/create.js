CatCatcher.createState = function(game) {
}



CatCatcher.createState.prototype = {

    preload: function () {

    },


    create: function() {
        var text = "Creacion de partida \n no disponible \n Para jugar online \n dirigete a 'Unirse a Partida'\n Pulsa M para volver";
        var style = { font: "65px Impact", fill: "#ff0044", align: "center",boundsAlignH: "center", boundsAlignV: "middle" };

        var t = game.add.text(0, 0, text, style);

        t.setTextBounds(0, 235, 800, 100);

    },


    update: function() {
    	 if (game.input.keyboard.addKey(Phaser.Keyboard.M).isDown) {
             this.state.start('menu');
         }
    }
}