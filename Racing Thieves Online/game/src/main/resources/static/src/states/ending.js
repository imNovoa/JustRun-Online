CatCatcher.endingState = function(game) {

}

CatCatcher.endingState.prototype = {

    preload: function() {
        
    },

    create: function() {

        var text = "El " + winner + " ha ganado \n Pulsa M para volver al menú inicial";
        var style = { font: "55px Impact", fill: "#ff0044", align: "center",boundsAlignH: "center", boundsAlignV: "middle" };

        var t = game.add.text(0, 0, text, style);

        t.setTextBounds(0, 200, 800, 200);

    },

    update: function() {
        if (game.input.keyboard.addKey(Phaser.Keyboard.M).isDown) {
            this.state.start('menu');
        }
    }
}