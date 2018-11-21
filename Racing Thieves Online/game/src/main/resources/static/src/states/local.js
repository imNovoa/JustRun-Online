CatCatcher.localState = function(game) {
}



CatCatcher.localState.prototype = {

    preload: function () {

    },


    create: function() {
        bg = game.add.image(0,0, 'title');
        bg.scale.set(0.27, 0.25);

        var p = game.add.image(75, 380, 'play');
        p.scale.set(0.45, 0.45);
        p.angle = -18;

        p.ns = 'arcade';

        p.inputEnabled = true;

        p.events.onInputOver.add(over, this);
        p.events.onInputOut.add(out, this);
        p.events.onInputDown.add(nextState, this)

    },


    update: function() {
    }
}