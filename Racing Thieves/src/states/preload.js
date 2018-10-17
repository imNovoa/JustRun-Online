CatCatcher.preloadState = function(game) {

}

CatCatcher.preloadState.prototype = {

    preload: function() {
        this.load.image('background', '../assets/images/bg.png');
        this.load.image('cat', '../assets/images/cat.png');
        this.load.image('catcher', '../assets/images/catcher.png');
        this.load.image('atari', 'assets/images/block.png');
        this.load.image('back', 'assets/images/background2.png');
        this.load.image('3', 'assets/images/greenbar3.png');
        this.load.image('2', 'assets/images/greenbar2.png');
        this.load.image('1', 'assets/images/greenbar.png');
        this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    },

    create: function () {
        var text = "LOADING";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX - 300, 0, text, style);

        this.state.start('title');
    },

    update: function() {

    }
}