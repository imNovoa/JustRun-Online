CatCatcher.localState = function(game) {
}



CatCatcher.localState.prototype = {

    preload: function () {

    },


    create: function() {
        var text = "PANTALLA DE PARTIDA LOCAL";
        var style = { font: "65px Impact", fill: "#ff0044", align: "center",boundsAlignH: "center", boundsAlignV: "middle" };

        var t = game.add.text(0, 0, text, style);
        var p = game.add.text(0,0,"PLAY",style);

        t.setTextBounds(0, 100, 800, 100);
        p.setTextBounds(0, 235, 800, 100);

        p.ns = 'platform';

        p.inputEnabled = true;

        p.events.onInputOver.add(over, this);
        p.events.onInputOut.add(out, this);
        p.events.onInputDown.add(nextState, this)

    },


    update: function() {
    }
}