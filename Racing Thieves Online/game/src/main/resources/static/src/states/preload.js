CatCatcher.preloadState = function(game) {

}

CatCatcher.preloadState.prototype = {

    preload: function() {
        this.load.image('block', 'assets/images/block.png');
        this.load.spritesheet('fireball', 'assets/images/FireBall.png',60,29);
        this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        this.load.tilemap('mario', 'assets/maps/colisiones_nivel1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tiles/super_mario.png');
        this.load.image('3', 'assets/images/skill.png');
        this.load.image('box', 'assets/images/box.png');
        this.load.image('2', 'assets/images/greenbar2.png');
        this.load.image('1', 'assets/images/greenbar.png');
        this.load.image('flag', 'assets/images/flag.png');
        this.load.spritesheet('francesca', 'assets/images/Francesca.png', 61, 85);
        this.load.spritesheet('francesca2', 'assets/images/Francesca2.png', 61, 85);
        this.load.spritesheet('stela', 'assets/images/fire.png', 128, 128);
        this.load.spritesheet('stelo', 'assets/images/firo.png', 128, 128);
        this.load.image('level1', 'assets/images/level1_final.jpg');
        this.load.spritesheet('coin', 'assets/images/coin.png', 40, 45);
        this.load.spritesheet('spark', 'assets/images/spark.png',180,206);
        this.load.image('title', 'assets/images/title_screen_logo.jpg');
        this.load.image('play', 'assets/images/play.png');
        this.load.image('local', 'assets/images/local.png');
        this.load.image('create', 'assets/images/creategame.png');
        this.load.image('join', 'assets/images/joingame.png');

        this.load.audio('lvl', 'assets/audio/lv.mp3');
        this.load.audio('menu', 'assets/audio/menu.mp3');
        this.load.audio('coine', 'assets/audio/coin.mp3');
        this.load.audio('fireu', 'assets/audio/run.mp3');
        this.load.audio('skile', 'assets/audio/skill.mp3');
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