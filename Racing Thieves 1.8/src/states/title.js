CatCatcher.titleState = function(game) {
}


function over(object) {
    object.scale.set(0.5, 0.5);
}

function out(object) {
    object.scale.set(0.45, 0.45);
}

function nextState(object){
    this.state.start(object.ns);
}



CatCatcher.titleState.prototype = {

    preload: function () {

    },


    create: function() {
        bg = game.add.image(0,0, 'title');
        bg.scale.set(0.27, 0.25);

        var p = game.add.image(75, 380, 'play');
        p.scale.set(0.45, 0.45);
        p.angle = -18;

        p.ns = 'menu';

        p.inputEnabled = true;

        p.events.onInputDown.add(nextState, this)
        p.events.onInputOver.add(over, this);
        p.events.onInputOut.add(out, this);

    },


}