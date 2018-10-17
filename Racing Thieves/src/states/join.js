CatCatcher.joinState = function(game) {
}



CatCatcher.joinState.prototype = {

    preload: function () {

    },


    create: function() {
        var text = "PANTALLA DE UNIRSE A PARTIDA";
        var style = { font: "65px Impact", fill: "#ff0044", align: "center",boundsAlignH: "center", boundsAlignV: "middle" };

        var t = game.add.text(0, 0, text, style);

        t.setTextBounds(0, 235, 800, 100);
        

    },


    update: function() {
    }
}