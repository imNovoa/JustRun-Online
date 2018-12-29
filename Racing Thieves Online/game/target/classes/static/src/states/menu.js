CatCatcher.menuState = function(game) {
}



CatCatcher.menuState.prototype = {

    preload: function () {

    },


    create: function() {
        bg = game.add.image(0,0, 'title');
        bg.scale.set(0.27,0.25);

        music = game.add.audio('menu');
        
        music.loop=true;
        
        music.play();

        var local = game.add.image(35, 360, "local");
        var crear = game.add.image(60, 420,"create");
        var join = game.add.image(75, 480,"join");

        local.scale.set(0.45, 0.45);
        crear.scale.set(0.45, 0.45);
        join.scale.set(0.45, 0.45);

        local.angle = -18;
        crear.angle = -18;
        join.angle = -18;

        local.inputEnabled = true;
        crear.inputEnabled = true;
        join.inputEnabled = true;

        local.ns = 'local';
        crear.ns = 'create';
        join.ns = 'character';

        local.events.onInputOver.add(over, this);
        local.events.onInputOut.add(out, this);
        local.events.onInputDown.add(nextState, this)

        crear.events.onInputOver.add(over, this);
        crear.events.onInputOut.add(out, this);
        crear.events.onInputDown.add(nextState, this)

        join.events.onInputOver.add(over, this);
        join.events.onInputOut.add(out, this);
        join.events.onInputDown.add(nextState, this)

    },


    update: function() {
        
    }
}