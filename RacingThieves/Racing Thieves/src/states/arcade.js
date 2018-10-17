CatCatcher.arcadeState = function(game) {

}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var ballButton;
var jumpCount;
var ball;
var layer;
var balls;
var ballTime = 0;

POWER=0;
PROGRESS=0;


function jump1() {
    player.body.velocity.y = -500;
    jumpCount++;
}

function jump2() {
    if (jumpCount === 1) {
        player.body.velocity.y = -500;
        jumpCount++;
    }
}

function jump() {
    if (player.body.onFloor()) {
        jump1();
    }
    if (!player.body.onFloor()) {
        jump2();
    }
}

function collisionHandler(ball, layer) {
    ball.kill();
}

function fireball() {
    if (game.time.now > ballTime) {
        ball = balls.getFirstExists(false);

        if (ball) {
            ball.reset(player.x + 5, player.y);
            if (player.frame == 0 || facing == 'left') {
                ball.body.velocity.x = -400;
            } else {
                ball.body.velocity.x = 400;
            }
            ball.body.gravity.y = 0;
            ball.body.maxVelocity.y = 0;
            ballTime = game.time.now + 200;
        }
    }
}

function removeSprite(sprite) {
    sprite.destroy();
}

CatCatcher.arcadeState.prototype = {

   
    preload: function () {

    },

    create: function () {

                //music

                music.stop();

                music = game.add.audio('lvl');
        
                music.loop=true;
                
                music.play();

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

        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.physics.arcade.gravity.y = 300;

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.ARCADE;
        balls.createMultiple(30, 'fireball');
        balls.setAll('outOfBoundsKill', true);
        balls.setAll('checkWorldBounds', true);

        player = game.add.sprite(32, 320, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        //ball = game.add.sprite(9999, 9999, 'fireball');
        //game.physics.enable(ball, Phaser.Physics.ARCADE);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.body.setSize(20, 32, 5, 16);


        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        cursors = game.input.keyboard.createCursorKeys();
        ballButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

          ///////bars

    



// BARRA DE PODER

var bmd2 = game.add.bitmapData(200,40);
bmd2.ctx.beginPath();
bmd2.ctx.rect(0,0,192,20);
bmd2.ctx.fillStyle = '#000000';
bmd2.ctx.fill();

healthBar2 = game.add.sprite(60,30,bmd2);

healthBar2.fixedToCamera = true;

var bmd = game.add.bitmapData(200,40);
bmd.ctx.beginPath();
bmd.ctx.rect(0,0,192,20);
bmd.ctx.fillStyle = '#00685e';
bmd.ctx.fill();

healthBar = game.add.sprite(60,30,bmd);

healthBar.fixedToCamera = true;


    //lifebar/////////////////
    
    var lifebar = game.add.sprite(12,12,'3');
    lifebar.scale.setTo(.1,.1);
    lifebar.fixedToCamera = true;

///////////////////////////

// BARRA DE PODER

var bmd3 = game.add.bitmapData(200,40);
bmd3.ctx.beginPath();
bmd3.ctx.rect(0,0,190,7);
bmd3.ctx.fillStyle = '#000000';
bmd3.ctx.fill();

pout = game.add.sprite(300,550,bmd3);

pout.fixedToCamera = true;

var bmd4 = game.add.bitmapData(200,40);
bmd4.ctx.beginPath();
bmd4.ctx.rect(0,0,175,7);
bmd4.ctx.fillStyle = '#0AF2DF';
bmd4.ctx.fill();

pin = game.add.sprite(300,550,bmd4);

pin.fixedToCamera = true;

///////////////////////////

// ITEMS //////////


var box = game.add.sprite(710,15,'box');
box.scale.setTo(.1,.1);
box.fixedToCamera = true;

/////////////////////////


},

    update: function () {

        game.physics.arcade.collide(player, layer);

        //game.physics.arcade.collide(ball, layer);

        //barWidth = healthBar.width;
        //healthBar.width = barWidth - barWidth/POWER;
   


        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;

            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;

            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else {
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

        if (ballButton.isDown) {
            fireball();
        }

        //ballButton.onDown.add(fireball());

        game.physics.arcade.collide(balls, layer, collisionHandler, null, this);

        /*if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -500;
            jumpTimer = game.time.now + 750;
        }
        */

        if (player.body.onFloor()) {
            jumpCount = 0;
        }

        cursors.up.onDown.add(jump);
}


}