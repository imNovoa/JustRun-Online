var CatCatcher = {}

CatCatcher.bootState = function(game) {

}

CatCatcher.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.P2);
    },


    create: function () {
        this.state.start('preload');
    },

    update: function() {

    }
}