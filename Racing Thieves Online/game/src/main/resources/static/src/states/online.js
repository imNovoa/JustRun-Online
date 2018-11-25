CatCatcher.onlineState = function(game) {

}

var player;
var catCatcher2;
var jumpTimer = 0;
var cursors;
var ballButton;
var jumpCount;
var ball;
var b2;
var layer;
var balls;
var ballTime = 0;
var slowTime = 0;
var canShoot=false;
var shootLeft = false;
var winner;
var lastAnimation = -1;
var ballId;
var ballExists = false;

var skill=false;

var spark;

var coins;

var fires;
var explos;

POWER=0;
PROGRESS=0;


// Funciones necesarias para implementar el doble salto
function jump1() {
    player.body.velocity.y = -700;
    jumpCount++;
}

function jump2() {
    if (jumpCount === 1) {
        player.body.velocity.y = -700;
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

//Eventos de colisiones
function collisionHandler(ball, layer) {
    ball.kill();
}


function p2vsp1() {
    player.slow = true;
    b2.kill();
}

function ballvsball() {
	b2.kill();
    ball.kill();
}

function p1block() {
    canShoot = true;
    boxball.visible = true;
    block.kill();
}


function p1coins() {


    if(POWER!=2600){

        POWER+=200;
        healthBar.width = healthBar.width + POWER;
    }

for (i = 0; i < 50; i++) {
    c = coins.children[i];
    if (player.x >= (c.x-61) && player.x <=(c.x + 61)) {
        c.kill();
        clink.play();
        }
        
    }
}


//bolas de fuego
function fireball(p) {
    if (game.time.now > ballTime) {
        ball = balls.getFirstExists(false);
        ball.visible = true;

        if (ball) {
            if (shootLeft == true || p.facing == 'left') {
                ball.reset(p.x - 20, p.y + 10);
                ball.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12, true);
                ball.animations.play('left');
                ball.body.velocity.x = -400;   
            } else {
                ball.reset(p.x + 20, p.y+10);
                ball.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
                ball.animations.play('right');
                ball.body.velocity.x = 400;
            }
            ball.body.gravity.y = 0;
            ball.body.maxVelocity.y = 0;
            ballTime = game.time.now + 600;
        }
    }
}

function createBlocks() {
    var pos = 120;
    for (i = 0; i < 5; i++) {
        b = blocks.children[i];      
        b.reset(pos, game.rnd.integerInRange(0, 500));
        b.body.gravity.y = 0;
        b.body.maxVelocity.y = 0;
        b.body.maxVelocity.x = 0;
        pos += 500;
    }
}

function createCoins() {

    var pos = 240;
        //  Now let's add 50 coins into it
        for (var i = 0; i < 50; i++)
        {

            c = coins.create(120 * i, game.rnd.integerInRange(0, 500), 'coin');

            c.scale.setTo(.6,.6);
            c.body.maxVelocity.y = 0;
            c.body.maxVelocity.x = 0;

            c.animations.add('do', [0, 1, 2, 3, 4, 5], 12, true);
            c.animations.play('do');

            pos+=50;
        }
    

}

function p1vsblocks() {
    if(canShoot == false){canShoot = true; boxball.visible = true;}
    for (i = 0; i < 10; i++) {
        b = blocks.children[i];
        if (player.x >= (b.x-61) && player.x <=(b.x + 61)) {
            b.kill();
        }
    }
}

//funciones para manejar la ralentización del jugador
function slowFalse() {
    player.slow = false;
}

/*function slowTrue2(){
    
    player2.slow = true;
    
    
    for (i = 0; i < fires.length; i++) {
        f = fires.children[i];
        if (game.physics.arcade.overlap(player2, f, null, null, this)) {
            f.kill();
            c = explos.create(player2.x, player2.y, 'stelo');
            c.animations.add('ex', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37], 80, true);
            c.killOnComplete=true;
            c.play('ex', null, false, true);
            }
            
        }
    
}*/


function sprintFalse() {
    player.sprint = false;
}

function deadFire(){
    fires.callAll('kill');
}

function firing(){




        fire = fires.create(player.x-2, player.y-2, 'stela');
        fire.scale.setTo(.7,.7);
        fire.body.maxVelocity.x = 0;
        fire.body.maxVelocity.y = 0;
        fire.animations.add('hella', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13,12,11,10 ,9,8,7,6,5,4,3,2,1], 10, true);
        fire.animations.play('hella');



}

CatCatcher.onlineState.prototype = {

		init() {
			if (game.player1.id == 1) {
				game.player2 = {id: 2}
			} else {
				game.player2 = {id: 1}
			}
			
			if(game.ball1.id == 3){
				game.ball2 = {id:4}
			}else{
				game.ball2 = {id:3}
			}
			
		},
		
    preload: function () {
    	console.log(JSON.stringify(game.player1));
    	console.log(JSON.stringify(game.ball1));
    },

    create: function () {
    	
    	
                //music

                music.stop();

                music = game.add.audio('lvl');
        
                music.loop=true;
                
                music.play();

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('mario');

        map.addTilesetImage('World1-1', 'tiles');
    

    layer = map.createLayer('collisions');

    timer = new Phaser.Timer(game)

    
    map.setCollision(1);

    layer.resizeWorld();

        layer.wrap = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        

        bg = game.add.image(0,0, 'level1');

        game.physics.arcade.gravity.y = 100;

        //Bolas de fuego del jugador 1
        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.ARCADE;
        balls.createMultiple(30, 'fireball');
        balls.setAll('outOfBoundsKill', true);
        balls.setAll('checkWorldBounds', true);
        
        ball = game.add.sprite(0, 0, 'fireball');
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.gravity.y = 0;
        ball.body.maxVelocity.y = 0;
        ball.visible = false;
        
        //Bolas de fuego del jugador 2
        balls2 = game.add.group();
        balls2.enableBody = true;
        balls2.physicsBodyType = Phaser.Physics.ARCADE;
        balls2.createMultiple(30, 'fireball');
        balls2.setAll('outOfBoundsKill', true);
        balls2.setAll('checkWorldBounds', true);


        //JUGADOR 1
        player = game.add.sprite(32, 320, 'francesca');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.body.setSize(30, 85,26);

        //animaciones
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 20, true);
        player.animations.add('left', [124, 123, 122, 121, 120, 129, 128, 127, 126, 125, 134, 133, 132, 131, 130,139,138,137,136,135], 20, true);
        player.animations.add('idleright', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 30, true);
        player.animations.add('idleleft', [94, 93, 92, 91, 90, 99, 98, 97, 96, 95, 104, 103, 102, 101, 100, 109, 108, 107, 106, 105, 114, 113, 112, 111, 110,119,118,117,116,115], 30, true);

        
        // Obtenemos la posición del jugador 2 y lo pintamos. No nos importa la física, ya que será
        // el otro jugador en su propia pantalla el que gestione dicho dato. Sólo necesitamos pintarlo
        // para verlo. Utilizamos un callback (player2Data) para que UNA VEZ tengamos la posición
        // del player 2, la pintemos en escenario y así evitar un undefined.
        this.getPlayer(function (player2Data) {
        	game.player2 = JSON.parse(JSON.stringify(player2Data));
        	catCatcher2 = game.add.sprite(game.player2.x, game.player2.y, 'francesca2');
        	game.physics.enable(catCatcher2, Phaser.Physics.ARCADE);
        	catCatcher2.animations.add('right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 20, true);
            catCatcher2.animations.add('left', [124, 123, 122, 121, 120, 129, 128, 127, 126, 125, 134, 133, 132, 131, 130,139,138,137,136,135], 20, true);
            catCatcher2.animations.add('idleright', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 30, true);
            catCatcher2.animations.add('idleleft', [94, 93, 92, 91, 90, 99, 98, 97, 96, 95, 104, 103, 102, 101, 100, 109, 108, 107, 106, 105, 114, 113, 112, 111, 110,119,118,117,116,115], 30, true);
        	console.log(JSON.stringify(game.player2))
        })
        
        
        this.getBall(function (ball2Data) {
        	game.ball2 = JSON.parse(JSON.stringify(ball2Data));
            game.ball2.x = 0;
            game.ball2.y = 0;
            b2 = game.add.sprite(game.ball2.x, game.ball2.y, 'fireball');
        	game.physics.enable(b2, Phaser.Physics.ARCADE);
        	b2.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12, true);
        	b2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        	b2.body.gravity.y = 0;
        	b2.body.maxVelocity.y = 0;
        	b2.visible = false;
        	console.log(JSON.stringify(game.ball2))
        })
        
        
        

        blocks = game.add.group();
        blocks.enableBody = true;
        blocks.physicsBodyType = Phaser.Physics.ARCADE;
        blocks.createMultiple(10, 'block');

        createBlocks();


        //monedas
        coins = game.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.ARCADE;

        createCoins();


        //fxs

        explos = game.add.group();

        fires = game.add.group();
        fires.enableBody = true;
        fires.physicsBodyType = Phaser.Physics.ARCADE;

        ///sounds

        music.stop();

        music = game.add.audio('lvl');

        clink= game.add.audio('coine');
        run= game.add.audio('fireu');
        thunder= game.add.audio('skile');


        //Controles

        cursors = game.input.keyboard.createCursorKeys();
        ballButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        
        f = game.input.keyboard.addKey(Phaser.Keyboard.F);

        
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        


        //Otras propiedades del jugador
        player.jumpCount = 0;

        player.facing = 'left';

        player.slow = false;

        player.sprint = false;

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
bmd.ctx.rect(0,0,2,20);
bmd.ctx.fillStyle = '#00685e';
bmd.ctx.fill();

healthBar = game.add.sprite(60,30,bmd);

healthBar.fixedToCamera = true;


    //icons/////////////////

    spark = game.add.sprite(-35, -35, 'spark');
    spark.scale.setTo(.8,.8);
    spark.animations.add('shine', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    spark.animations.play('shine');
    spark.visible = false;
    spark.fixedToCamera = true;
    
    var lifebar = game.add.sprite(12,12,'3');
    lifebar.scale.setTo(.1,.1);
    lifebar.fixedToCamera = true;



    

///////////////////////////

// BARRA DE PROGRESO

var bmd3 = game.add.bitmapData(200,40);
bmd3.ctx.beginPath();
bmd3.ctx.rect(0,0,190,7);
bmd3.ctx.fillStyle = '#000000';
bmd3.ctx.fill();

pout = game.add.sprite(300,550,bmd3);

pout.fixedToCamera = true;

var bmd4 = game.add.bitmapData(200,40);
bmd4.ctx.beginPath();
bmd4.ctx.rect(0,0,2,7);
bmd4.ctx.fillStyle = '#0AF2DF';
bmd4.ctx.fill();

pin = game.add.sprite(300,550,bmd4);

pin.fixedToCamera = true;



var fl = game.add.sprite(470,535,'flag');
fl.scale.setTo(.02,.02);
fl.fixedToCamera = true;

///////////////////////////

// ITEMS //////////


var box = game.add.sprite(710,15,'box');
box.scale.setTo(.1,.1);
box.fixedToCamera = true;



/////////////////////////


        //es parte superior derecha
        boxball = game.add.sprite(710, 35, 'fireball');
        boxball.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        boxball.animations.play('right');
        boxball.visible = false;
        boxball.fixedToCamera = true;


},

    update: function () {
    	
    	// Manda al servidor la posición actualizada de player 1 para que el otro jugador pueda actualizarla.
        this.putPlayer();
        
        if(ballExists){this.putBall(); game.ball1.visibility = true;};
        
    	
    	// Obtiene mediante GET la posición de player 2. Usa un callback para que UNA VEZ tenga su posición,
        // pinte su ubicación.
        this.getPlayer( function (updatePlayer2) {
        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
        	if(catCatcher2.x<game.player2.x){
        		catCatcher2.animations.play('right');
        		lastAnimation = 0;
        	}else if(catCatcher2.x>game.player2.x){
        		catCatcher2.animations.play('left');
        		lastAnimation = 1;
        	}else if(lastAnimation>0){
        		catCatcher2.animations.play('idleleft');
        	}else{
        		catCatcher2.animations.play('idleright');
        	}
        	catCatcher2.x = game.player2.x;
        	catCatcher2.y = game.player2.y;        	
        	//console.log("Posicion de player 2: " + game.player2 + " actualizada");
        })
        
        
        
        this.getBall( function (updateBall2) {
        	game.ball2 = JSON.parse(JSON.stringify(updateBall2));
        	if(game.ball2.visibility == true){
        		b2.visible = true;
        	}
        	if(b2.x<game.ball2.x){
        		b2.animations.play('right');
        	}else if(b2.x>game.ball2.x){
        		b2.animations.play('left');
        	}
        	b2.x = game.ball2.x;
        	b2.y = game.ball2.y;        	
        })

        //Activamos colisiones de los jugadores con el mundo
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(catCatcher2, layer);
        


         //es

         if(POWER==2600){
            spark.visible = true;
            skill=true;
            run.play();
        }

        //barWidth = healthBar.width;
        //healthBar.width = barWidth - barWidth/POWER;

        //velocidad de los jugadores a 0
        player.body.velocity.x = 0;

        //Controles jugador 1

        
        if (cursors.left.isDown) {
            player.body.setSize(50, 85);



            if (player.sprint==true) {
                
                player.body.velocity.x = -450;

                firing();
                

                
            } else if(player.slow == false){

                player.body.velocity.x = -150;

                
            }
            else {
                player.body.velocity.x = -75;
            }

            
            

            if (player.facing != 'left') {
                player.animations.play('left');
                player.facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            player.body.setSize(30, 85, 26);
            shootLeft = false;
            if (player.sprint == true) {
                player.body.velocity.x =450;
                firing();
            

            } else if(player.slow == false) {  
                player.body.velocity.x = 150;
                
            }else{
                player.body.velocity.x = 75;
            }


            if (player.facing != 'right') {
                player.animations.play('right');
                player.facing = 'right';
            }
        }
        else {
            if (player.facing != 'idle') {
                player.body.setSize(30, 85, 26);

                if (player.facing == 'left') {
                    //player.frame = 0;
                    player.animations.play('idleleft');
                    shootLeft = true;
                }
                else {
                    player.animations.play('idleright');
                    shootLeft = false;
                }

                player.facing = 'idle';
            }
        }

       

        if(player.slow == true){
        game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse, this);
        }


        if(player.sprint == true){
            game.time.events.add(Phaser.Timer.SECOND * 2, sprintFalse, this);
            game.time.events.add(Phaser.Timer.SECOND * 5, deadFire, this);

        }

        //Controles de bola de fuego para cada jugador
        if (ballButton.isDown && canShoot == true) {
            fireball(player);
            canShoot = false;
            boxball.visible = false;
            ballExists = true;
        }



        //controles  especial

        if(f.isDown && skill){

            thunder.play();

            
            //INSERTAR  HABILIDAD PERSONAJE/////////
                player.sprint= true;
                player.animations.play('hella');
                
            //
            ///////////////////////////////

            skill=false;
            POWER=0;
            healthBar.width = 0;
            spark.visible = false;


        }


        //Eventos de colisiones de las bolas de fuego
        game.physics.arcade.collide(balls, layer, collisionHandler, null, this);
        game.physics.arcade.collide(balls2, layer, collisionHandler, null, this);

        game.physics.arcade.collide(player, balls2, p2vsp1, null, this);

        game.physics.arcade.collide(balls, balls2, ballvsball, null, this);

        game.physics.arcade.collide(blocks, player, p1vsblocks, null, this);


        //colisión monedas

      game.physics.arcade.collide(coins, player, p1coins, null, this);

        //Gestión de salto
        if (player.body.onFloor()) {
            jumpCount = 0;
        }


        cursors.up.onDown.add(jump);

        if (player.x == 5856) {
            winner = 'jugador 1';
            this.state.start('ending');
        }

        //progreso

        pin.width= (player.x*1.9*3);

},

//Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2)
getPlayer(callback) {
    $.ajax({
        method: "GET",
        url: window.location.href + '/game/' + game.player2.id,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.player2 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
},

// Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2
putPlayer() {
	game.player1.x = player.x;
	game.player1.y = player.y;
    $.ajax({
        method: "PUT",
        url: window.location.href + '/game/' + game.player1.id,
        data: JSON.stringify(game.player1),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
    	//console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
    })
},

getBall(callback) {
    $.ajax({
        method: "GET",
        url: window.location.href + '/ball/' + game.ball2.id,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.ball2 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
},


//Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2
putBall() {
	game.ball1.x = ball.x;
	game.ball1.y = ball.y;
    $.ajax({
        method: "PUT",
        url: window.location.href + '/ball/' + game.ball1.id,
        data: JSON.stringify(game.ball1),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
    	//console.log("Actualizada posicion de ball 1: " + JSON.stringify(data))
    })
}



}