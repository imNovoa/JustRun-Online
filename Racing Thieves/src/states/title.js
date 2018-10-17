CatCatcher.titleState = function(game) {
}


function over(object) {
    object.fill = "#ffff44";
}

function out(object) {
    object.fill = "#ff0044";
}

function nextState(object){
    this.state.start(object.ns);
}



CatCatcher.titleState.prototype = {

    preload: function () {

    },


    create: function() {
        var text = "RACING THIEVES";
        var play = "PLAY";
        var style = { font: "65px Impact", fill: "#ff0044", align: "center",boundsAlignH: "center", boundsAlignV: "middle" };

        var t = game.add.text(0, 0, text, style);
        var p = game.add.text(0,0, play, style);

        t.setTextBounds(0, 100, 800, 100);
        p.setTextBounds(0, 400, 800, 100);

        p.ns = 'menu';

        p.inputEnabled = true;

        p.events.onInputOver.add(over, this);
        p.events.onInputOut.add(out, this);
        p.events.onInputDown.add(nextState, this)

    },


    update: function() {
        
    }
}