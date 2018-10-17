CatCatcher.platformState = function(game) {

}

var sprite;

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var yAxis = p2.vec2.fromValues(0, 1);
var jumpCount;
var ball;
var Z;



var checkIfCanJump = function () {
    var c, d, i, result, yAxis;
    yAxis = p2.vec2.fromValues(0, 1);
    result = false;
    i = 0;
    while (i < game.physics.p2.world.narrowphase.contactEquations.length) {
        c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
            d = p2.vec2.dot(c.normalA, yAxis);
            if (c.bodyA === player.body.data) {
                d *= -1;
            }
            if (d > 0.5) {
                result = true;
            }
        }
        i++;
    }
    return result;
};



var check = function (sprite) {
    var c, d, i, result, yAxis;
    yAxis = p2.vec2.fromValues(0, 1);
    result = false;
    i = 0;
    while (i < game.physics.p2.world.narrowphase.contactEquations.length) {
        c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === sprite.body.data || c.bodyB === sprite.body.data) {
            d = p2.vec2.dot(c.normalA, yAxis);
            if (c.bodyA === sprite.body.data) {
                d *= -1;
            }
            if (d > 0.5) {
                result = true;
            }
        }
        i++;
    }
    return result;
};


function jump1() {
    player.body.moveUp(300);
    jumpCount++;
}

function jump2() {
    if (jumpCount < 1) {
        player.body.moveUp(300);
        jumpCount++;
    }
}

function jump() {
    if (checkIfCanJump()) {
        jump1();
    }
    if (!checkIfCanJump()) {
        jump2();
    }
}

function fireball() {
    ball = game.add.sprite(player.x + 1, player.y, 'fireball');
    game.physics.p2.enable(ball);
    ball.body.velocity.x = 200;
    ball.body.data.gravityScale = 0;

}


function removeSprite(sprite) {
    sprite.destroy();
}

CatCatcher.platformState.prototype = {

   
    preload: function () {

    },

    create: function () {

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    layer = map.createLayer('World1');


    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
    map.setCollision(40);

    layer.resizeWorld();

        layer.wrap = true;


    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 600;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

    game.physics.p2.setImpactEvents(true);

    //  Add a sprite
    player = game.add.sprite(32, 32, 'dude');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

  
    //  Enable if for physics. This creates a default rectangular body.
        game.physics.p2.enable(player);


    player.body.fixedRotation = true;
    player.body.damping = 0.5;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { friction: 0.0 });
    var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });

    cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        Z = game.input.keyboard.addKey(Phaser.Keyboard.Z)

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);


},

    update: function () {


        barWidth = healthBar.width;
        healthBar.width = barWidth - barWidth/POWER;
   

        this.physics.p2.convertTilemap(map, layer);

    if (cursors.left.isDown) {
        player.body.moveLeft(200);

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown) {
        player.body.moveRight(200);

        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else {
        player.body.velocity.x = 0;

        if (facing != 'idle') {
            player.animations.stop();

            if (facing == 'left') {
                player.frame = 0;
            }
            else {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

            jumpButton.onDown.add(fireball);




     if (checkIfCanJump()) {
            jumpCount = 0;
     }

        cursors.up.onDown.add(jump);
}


}