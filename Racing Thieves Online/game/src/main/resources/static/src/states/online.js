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
var coin2;
var skill=false;

var coinsX = new Array();
var coinsY = new Array();

var checkCoin = false;
var checkPlayer2 = false;
var checkPlayer2C = false;

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
    ball.x=-100;
    ball.y = 0;
    ball.visible = false;
}


function p2vsp1() {
    player.slow = true;
    b2.x = 0;
    b2.y = 0;
    b2.visible = false;
}

function p1vp2() {
	ball.x=-100;
    ball.y = 0;
    ball.visible = false;
}

function ballvsball() {
	b2.x = 0;
    b2.y = 0;
    b2.visible = false;
	ball.x=-100;
    ball.y = 0;
    ball.visible = false;
}




function p1coins() {


    if(POWER!=2600){

        POWER+=200;
        healthBar.width = healthBar.width + POWER;
    }

for (i = 0; i < 50; i++) {
    c = coins.children[i];
    if (player.x >= (c.x-61) && player.x <=(c.x + 61) && player.y>= (c.y-85) && player.y <= (c.y+85)) {
        c.kill();
        clink.play();
        }
        
    }
}

function p2coins() {


for (i = 0; i < 50; i++) {
    c = coins.children[i];
    if (catCatcher2.x >= (c.x-61) && catCatcher2.x <=(c.x + 61) && catCatcher2.y>= (c.y-85) && catCatcher2.y <= (c.y+85)) {
        c.kill();
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


function fireball2(p) {
    if (game.time.now > ballTime) {
        b2 = balls.getFirstExists(false);
        b2.visible = true;
        

        if (b2) {
            if (lastAnimation == 1 || p.facing == 'left') {
                b2.reset(p.x - 20, p.y + 10);
                b2.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12, true);
                b2.animations.play('left');
                b2.body.velocity.x = -400;   
            } else {
                b2.reset(p.x + 20, p.y+10);
                b2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
                b2.animations.play('right');
                b2.body.velocity.x = 400;
            }
            b2.body.gravity.y = 0;
            b2.body.maxVelocity.y = 0;
        }
    }
}

//creacion de cajas misteriosas y monedas

function createBlocks() {
    var pos = 120;
    for (i = 0; i < 8; i++) {
        b = blocks.children[i];  
        //if(i==0){b.reset(475, 80);};
        if(i==1){b.reset(475, 412);};
        if(i==2){b.reset(1043, 687);};
        if(i==3){b.reset(2178, 240);};
        if(i==4){b.reset(2478, 99);};
        if(i==5){b.reset(3493, 99);};
        if(i==6){b.reset(3886, 295);};
        if(i==7){b.reset(4955, 115);};
        b.body.gravity.y = 0;
        b.body.maxVelocity.y = 0;
        b.body.maxVelocity.x = 0;
        pos += 500;
    }
}

function createCoins() {
	
	 for (i = 0; i < 21; i++)
     {
     	c = coins.children[i]; 
     	if(i==0){c.reset(3, 200);};
     	if(i==1){c.reset(130, 446);};
     	if(i==2){c.reset(302, 227);};
     	if(i==3){c.reset(522, 50);};
     	if(i==4){c.reset(819, 446);};
     	if(i==5){c.reset(1104, 687);};
     	if(i==6){c.reset(764, 612);};
     	if(i==7){c.reset(1856, 443);};
     	if(i==8){c.reset(2026, 259);};
     	if(i==9){c.reset(2411, 259);};
     	if(i==10){c.reset(1726, 135);};
     	if(i==11){c.reset(2318, 135);};
     	if(i==12){c.reset(2821, 135);};
     	if(i==13){c.reset(3176, 135);};
     	if(i==14){c.reset(2938, 443);};
     	if(i==15){c.reset(3587, 339);};
     	if(i==16){c.reset(4230, 215);};
     	if(i==17){c.reset(4472, 10);};
     	if(i==18){c.reset(3885, 647);};
     	if(i==19){c.reset(5123, 651);};
     	if(i==20){c.reset(5363, 600);};
     	
     	

     	c.scale.setTo(.6,.6);
     	c.body.maxVelocity.y = 0;
     	c.body.maxVelocity.x = 0;

     	c.animations.add('do', [0, 1, 2, 3, 4, 5], 12, true);
     	c.animations.play('do');
     }
     
    

}

//colisiones de jugadores con cajas misteriosas
function p1vsblocks() {
    if(canShoot == false){canShoot = true; boxball.visible = true;}
    for (i = 0; i < 10; i++) {
        b = blocks.children[i];
        if (player.x >= (b.x-61) && player.x <=(b.x + 61)) {
            b.kill();
        }
    }
}

function p2vsblocks() {
    for (i = 0; i < 10; i++) {
        b = blocks.children[i];
        if (catCatcher2.x >= (b.x-61) && catCatcher2.x <=(b.x + 61)) {
            b.kill();
        }
    }
}

//funciones para manejar la ralentización del jugador
function slowFalse() {
    player.slow = false;
}


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
			
			
			
		},
		
    preload: function () {
    	
   
    },

    create: function () {
    	
                //music

                music.stop();

                music = game.add.audio('lvl');
        
                music.loop=true;
                
                music.play();

    game.stage.backgroundColor = '#000000';

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

        //Bolas de fuego
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
        
        b2 = game.add.sprite(0, 0, 'fireball');
        game.physics.enable(b2, Phaser.Physics.ARCADE);
        b2.body.gravity.y = 0;
        b2.body.maxVelocity.y = 0;
        b2.visible = false;
        


        //JUGADOR 1
        if(skin == 0){
        player = game.add.sprite(32, 320, 'francesca');
        }else{
        	player = game.add.sprite(32, 320, 'drake');
        }
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.body.setSize(30, 85,26);

        //animaciones
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 20, true);
        player.animations.add('left', [84, 83, 82,81,80,89,88,87,86,85,94,93,92,91,90,99,98,97,96,95], 20, true);
        player.animations.add('idleright', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 30, true);
        player.animations.add('idleleft', [54,53,52,51,50,59,58,57,56,55,65,64,63,62,61,60,69,68,67,66,65,74,73,72,71,70,79,78,77,76,75], 30, true);
        
        
        //Obtenemos la info del jugador 2 y creamos su sprite
        var p2data = {
    			"type": "getPlayer2",
    			"id": onlineP1.id
    	}
    	ws.send(JSON.stringify(p2data));

        

        	if(onlineP2.skin == 0){
        	catCatcher2 = game.add.sprite(onlineP2.x, onlineP2.y, 'francesca');
        	}else{
        	catCatcher2 = game.add.sprite(onlineP2.x, onlineP2.y, 'drake');
        	}
        	game.physics.enable(catCatcher2, Phaser.Physics.ARCADE);
        	catCatcher2.animations.add('right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 20, true);
        	catCatcher2.animations.add('left', [84, 83, 82,81,80,89,88,87,86,85,94,93,92,91,90,99,98,97,96,95], 20, true);
        	catCatcher2.animations.add('idleright', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 30, true);
        	catCatcher2.animations.add('idleleft', [54,53,52,51,50,59,58,57,56,55,65,64,63,62,61,60,69,68,67,66,65,74,73,72,71,70,79,78,77,76,75], 30, true);
        
        //Creamos bloques y monedas

        blocks = game.add.group();
        blocks.enableBody = true;
        blocks.physicsBodyType = Phaser.Physics.ARCADE;
        blocks.createMultiple(10, 'block');

        createBlocks();


        //monedas
        coins = game.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.ARCADE;
        coins.createMultiple(50, 'coin');
        
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
    	
    	//subimos al servidor la info de nuestro jugador
    	onlineP1.x = player.x;
    	onlineP1.y = player.y;
    	
    	var data = {
    			"type": "updatePlayer",
    			"id" : onlineP1.id,
    			"x" : onlineP1.x,
    			"y" : onlineP1.y,
    			"skin" : onlineP1.skin,
    			"rightDown" : onlineP1.rightDown,
    			"leftDown" : onlineP1.leftDown,
    			"joined" : onlineP1.joined,
    			"spaceDown" : onlineP1.spaceDown,
    			"isWinner" : onlineP1.isWinner
    	}
    	
    	ws.send(JSON.stringify(data));
    	
    	//recogemos la info del jugador 2 y actualizamos el sprite
    	var p2data = {
    			"type": "getPlayer2",
    			"id": onlineP1.id
    	}
    	ws.send(JSON.stringify(p2data));
    	
    	catCatcher2.x = onlineP2.x;
    	catCatcher2.y = onlineP2.y;
    	
    	
    	//Gestion de animaciones del jugador 2
    	if(onlineP2.rightDown == true && onlineP2.leftDown == false){
    		catCatcher2.animations.play('right');
    		lastAnimation = 0;
    	}else if(onlineP2.leftDown == true && onlineP2.rightDown == false){
    		catCatcher2.animations.play('left');
    		lastAnimation = 1;
    	}else if (onlineP2.rightDown == false && onlineP2.leftDown == false && lastAnimation == 0){
    		catCatcher2.animations.play('idleright');
    	}else{
    		catCatcher2.animations.play('idleleft');
    	}


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
            onlineP1.rightDown = false;
            onlineP1.leftDown = true;


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
        	onlineP1.rightDown = true;
        	onlineP1.leftDown = false;
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
        	onlineP1.rightDown = false;
        	onlineP1.leftDown = false;
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
        	onlineP1.spaceDown = true;
            fireball(player);
            canShoot = false;
            boxball.visible = false;
            ballExists = true;
        }else{
        	onlineP1.spaceDown = false;
        }
        
        if(onlineP2.spaceDown == true){
        	fireball2(catCatcher2);
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
        game.physics.arcade.collide(ball, layer, collisionHandler, null, this);
        game.physics.arcade.collide(b2, layer, collisionHandler, null, this);

        game.physics.arcade.collide(player, b2, p2vsp1, null, this);
        
        

       game.physics.arcade.collide(ball, b2, ballvsball, null, this);

       game.physics.arcade.collide(blocks, player, p1vsblocks, null, this);

       game.physics.arcade.collide(blocks, catCatcher2, p2vsblocks, null, this);
       game.physics.arcade.collide(catCatcher2, ball, p1vp2, null, this);

        //colisión monedas

      game.physics.arcade.collide(coins, player, p1coins, null, this);
      game.physics.arcade.collide(coins, catCatcher2, p2coins, null, this);

        //Gestión de salto
        if (player.body.onFloor()) {
            jumpCount = 0;
        }


        cursors.up.onDown.add(jump);
        
        
        //Gestion de final de partida y ganador
        if (player.x == 5856 ) {
        	onlineP1.isWinner = true;
            this.state.start('ending');
        }
        
        if (catCatcher2.x == 5856 ) {
        	onlineP2.isWinner = true;
            this.state.start('ending');
        }

        //progreso

        pin.width= (player.x*1.9*3);

}



}