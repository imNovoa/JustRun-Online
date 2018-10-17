CatCatcher.menuState = function(game) {
}



CatCatcher.menuState.prototype = {

    preload: function () {

    },


    create: function() {
        var text = "RACING THIEVES";
        var style = { font: "65px Impact", fill: "#ff0044", align: "center",boundsAlignH: "center", boundsAlignV: "middle" };

        var t = game.add.text(0, 0, text, style);
        var local = game.add.text(0,0, "Local",style);
        var crear = game.add.text(0,0,"Crear Partida", style);
        var join = game.add.text(0,0,"Unirse a Partida", style);

        t.setTextBounds(0, 100, 800, 100);
        local.setTextBounds(0, 235, 800, 100);
        crear.setTextBounds(0, 325, 800, 100);
        join.setTextBounds(0, 425, 800, 100);

        game.input.keyboard.addKeyCapture(Phaser.Keyboard.P)

        local.inputEnabled = true;
        crear.inputEnabled = true;
        join.inputEnabled = true;

        local.ns = 'local';
        crear.ns = 'create';
        join.ns = 'join';

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
        if (game.input.keyboard.addKey(Phaser.Keyboard.P).isDown) {
            this.state.start('level');
        }
        if (game.input.keyboard.addKey(Phaser.Keyboard.T).isDown) {
            this.state.start('platform');
        }
    }
}