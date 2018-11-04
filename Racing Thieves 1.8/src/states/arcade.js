CatCatcher.arcadeState = function(game) {

}

var player;
var jumpTimer = 0;
var cursors;
var ballButton;
var jumpCount;
var jumpCount2;
var ball;
var layer;
var balls;
var balls2;
var ballTime = 0;
var ballTime2 = 0;
var slowTime = 0;
var slowTime2 = 0;
var canShoot=false;
var canShoot2 = false;
var shootLeft = false;
var shootLeft2 = false;
var winner;

var skill=false;
var skill2= false;

var spark;

var coins;

var fires;
var explos;

POWER=0;
POWER2=0;
PROGRESS=0;
PROGRESS=0;


// Funciones necesarias para implementar el doble salto, usamos un contador para que solo se pueda saltar 2 veces.

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
//doble salto jugador 2

function p2jump1() {
    player2.body.velocity.y = -700;
    jumpCount2++;
}

function p2jump2() {
    if (jumpCount2 === 1) {
        player2.body.velocity.y = -700;
        jumpCount2++;
    }
}

function p2jump() {
    if (player2.body.onFloor()) {
        p2jump1();
    }
    if (!player2.body.onFloor()) {
        p2jump2();
    }
}


//Eventos de colisiones, en los que definimos qué pasa cuando un jugador colisiona con una bola, una bola con el mundo, etc.
//Después las llamaremos en update

function collisionHandler(ball, layer) {
    ball.kill();
}

function p1vsp2() {
    player2.slow = true;
    ball.kill();
}

function p2vsp1() {
    player.slow = true;
    ball2.kill();
}

function ballvsball() {
    ball2.kill();
    ball.kill();
}

function p1block() {
    canShoot = true;
    boxball.visible = true;
    block.kill();
}

function p2block() {
    canShoot2 = true;
    boxball2.visible = true;
    block.kill();
}


//En esta función usamos el grupo de monedas que hemos creado y con un for comprobamos las colisiones para todas las monedas
//Hay una función para el jugador uno y otra para el jugador 2

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

function p2coins() {

    for (i = 0; i < 50; i++) {
    c = coins.children[i];
    if (player2.x >= (c.x-61) && player2.x <=(c.x + 61)) {
        c.kill();
        
    }
}


}

//Funciones de creacion de bolas de fuego, sacamos la primera bola del grupo de bolas y también tenemos en cuenta
//si el jugador está mirando para la derecha o para la izquierda, además le añadimos la animación
//Hay una función para el jugador uno y otra para el jugador 2
//Le pasamos el jugador "p" porque estaba pensado que "shootLeft" fuera un atributo del mismo, pero no funcionaba correctamente

function fireball(p) {
    if (game.time.now > ballTime) {
        ball = balls.getFirstExists(false);

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
    if (game.time.now > ballTime2) {
        ball2 = balls2.getFirstExists(false);

        if (ball2) {
            if (shootLeft2 == true || p.facing == 'left') {
                ball2.reset(p.x - 20, p.y);
                ball2.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12, true);
                ball2.animations.play('left');
                ball2.body.velocity.x = -400;
            } else {
                ball2.reset(p.x + 20, p.y);
                ball2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
                ball2.animations.play('right');
                ball2.body.velocity.x = 400;
            }
            ball2.body.gravity.y = 0;
            ball2.body.maxVelocity.y = 0;
            ballTime2 = game.time.now + 600;
        }
    }
}

//Creación de cajas misteriosas y de monedas, la y es random y la x se va sumando en cada iteración

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

//Colisiones de jugadores con cajas misteriosas, similar a las colisiones con las monedas
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
    if(canShoot2 == false){canShoot2 = true; boxball2.visible = true;}
    for (i = 0; i < 10; i++) {
        b = blocks.children[i];
        if (player2.x >= (b.x-61) && player2.x <=(b.x + 61)) {
            b.kill();
        }
    }
}

//funciones para manejar la ralentización del jugador
function slowFalse() {
    player.slow = false;
}

//colisiones con el fuego de la habilidad especial, se añade una animacion de explosion y se destruye el fuego
function slowTrue2(){
    
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
    
}


function slowFalse2() {
    player2.slow = false;
}

//función usada cuando se acaba el sprint de la habilidad especial
function sprintFalse() {
    player.sprint = false;
}

function deadFire(){
    fires.callAll('kill');
}


//habilidad especial, genera fuego en la estela del jugador, tiene su propia animación.
function firing(){

        fire = fires.create(player.x-2, player.y-2, 'stela');
        fire.scale.setTo(.7,.7);
        fire.body.maxVelocity.x = 0;
        fire.body.maxVelocity.y = 0;
        fire.animations.add('hella', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13,12,11,10 ,9,8,7,6,5,4,3,2,1], 10, true);
        fire.animations.play('hella');

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

        map.addTilesetImage('World1-1', 'tiles');
    

    layer = map.createLayer('collisions');

    timer = new Phaser.Timer(game)

    
        map.setCollision(1);

    layer.resizeWorld();

        layer.wrap = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        

        bg = game.add.image(0,0, 'level1');

        game.physics.arcade.gravity.y = 100;


        //Creamos un grupo de phaser para las bolas de fuego, de tal manera que podemos generarlas dinámicamente cuando el jugador dispare
        //Bolas de fuego del jugador 1
        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.ARCADE;
        balls.createMultiple(30, 'fireball');
        balls.setAll('outOfBoundsKill', true);
        balls.setAll('checkWorldBounds', true);

        //Bolas de fuego del jugador 2
        balls2 = game.add.group();
        balls2.enableBody = true;
        balls2.physicsBodyType = Phaser.Physics.ARCADE;
        balls2.createMultiple(30, 'fireball');
        balls2.setAll('outOfBoundsKill', true);
        balls2.setAll('checkWorldBounds', true);


        //Creación del JUGADOR 1
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

        //Creación del JUGADOR 2
        player2 = game.add.sprite(60, 320, 'francesca2');
        game.physics.enable(player2, Phaser.Physics.ARCADE);
        player2.body.collideWorldBounds = true;
        player2.body.gravity.y = 1000;
        player2.body.maxVelocity.y = 500;
        player2.body.setSize(30, 85,26);

        //animaciones
        player2.animations.add('right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 20, true);
        player2.animations.add('left', [124, 123, 122, 121, 120, 129, 128, 127, 126, 125, 134, 133, 132, 131, 130, 139, 138, 137, 136, 135], 20, true);
        player2.animations.add('idleright', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 30, true);
        player2.animations.add('idleleft', [94, 93, 92, 91, 90, 99, 98, 97, 96, 95, 104, 103, 102, 101, 100, 109, 108, 107, 106, 105, 114, 113, 112, 111, 110, 119, 118, 117, 116, 115], 30, true);


        //Grupo de cajas misteriosas, monedas y fuego, similar a las bolas de fuego
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
        ballButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        ballButton2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        //CONTROLES DEL JUGADOR 2
        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        f = game.input.keyboard.addKey(Phaser.Keyboard.F);

        
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        


        //Otras propiedades del jugador
        player.jumpCount = 0;
        player2.jumpCount = 0;

        player.facing = 'left';
        player2.facing = 'left';

        player.slow = false;
        player2.slow = false;

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

var box2 = game.add.sprite(630,15,'box');
box2.scale.setTo(.1,.1);
box2.fixedToCamera = true;

/////////////////////////


        //es parte superior derecha
        boxball = game.add.sprite(710, 35, 'fireball');
        boxball.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        boxball.animations.play('right');
        boxball.visible = false;
        boxball.fixedToCamera = true;

        boxball2 = game.add.sprite(635, 35, 'fireball');
        boxball2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        boxball2.animations.play('right');
        boxball2.visible = false;
        boxball2.fixedToCamera = true;

},

    update: function () {

        //Activamos colisiones de los jugadores con el mundo
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(player2, layer);

         //Si la barra de poder está llena, podemos usar la habilidad especial

         if(POWER==2600){
            spark.visible = true;
            skill=true;
            run.play();
        }
        if(POWER2==2600){
            skill2=true;
        }

        //barWidth = healthBar.width;
        //healthBar.width = barWidth - barWidth/POWER;

        //velocidad de los jugadores a 0
        player.body.velocity.x = 0;
        player2.body.velocity.x = 0;

        //Al mover al jugador para un lado u otro, tenemos que activar su respectiva animación, indicamos también si shootLeft es true o false
        //Para así disparar al lado correcto, y tenemos en cuenta también si el jugador está afectado por ralentización o si tiene habilidad especial.
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

        //Controles jugador 2
        if (a.isDown) {

            game.physics.arcade.collide(fires, player2, slowTrue2, null, this);

            player.body.setSize(30, 85);

            if (player2.slow == false) {
                player2.body.velocity.x = -150;
            } else {              
                player2.body.velocity.x = -75;
            }

            if (player2.facing != 'left') {
                player2.animations.play('left');
                player2.facing = 'left';
            }
        }
        else if (d.isDown) {
            shootLeft2 = false;
            player.body.setSize(30, 85, 26);
            game.physics.arcade.collide(fires, player2, slowTrue2, null, this);

            if (player2.slow == false) {
                player2.body.velocity.x = 150;
            } else {
                player2.body.velocity.x = 75;
            }

            if (player2.facing != 'right') {
                player2.animations.play('right');
                player2.facing = 'right';
            }
        }
        else {
            if (player2.facing != 'idle') {
               
                player.body.setSize(30, 85, 26);
                if (player2.facing == 'left') {
                    shootLeft2 = true;
                    player2.animations.play('idleleft');
                }
                else {
                    player2.animations.play('idleright');
                    shootLeft2 = false;
                }

                player2.facing = 'idle';
            }
        }


        //timers para la ralentización del jugador, en este caso 2 segundos
        if(player.slow == true){
        game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse, this);
        }

        if(player2.slow == true){
            game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse2, this);
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
        }

        if (ballButton2.isDown && canShoot2 == true) {
            fireball2(player2);
            canShoot2 = false;
            boxball2.visible = false;
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

       /* if(one.isDown && skill2){
            
            skill2=false;
            POWER2=0;
            healthBar.width = 0;
        } */

        //Eventos de colisiones de las bolas de fuego
        game.physics.arcade.collide(balls, layer, collisionHandler, null, this);
        game.physics.arcade.collide(balls2, layer, collisionHandler, null, this);

        game.physics.arcade.collide(player2, balls, p1vsp2, null, this);
        game.physics.arcade.collide(player, balls2, p2vsp1, null, this);

        game.physics.arcade.collide(balls, balls2, ballvsball, null, this);

        game.physics.arcade.collide(blocks, player, p1vsblocks, null, this);
        game.physics.arcade.collide(blocks, player2, p2vsblocks, null, this);

        //colisión monedas

      game.physics.arcade.collide(coins, player, p1coins, null, this);
      game.physics.arcade.collide(coins, player2, p2coins, null, this);

        //Gestión de salto
        if (player.body.onFloor()) {
            jumpCount = 0;
        }

        if (player2.body.onFloor()) {
            jumpCount2 = 0;
        }

        if (player2.body.onFloor()) {
            player2.jumpCount = 0;
        }


        cursors.up.onDown.add(jump);
        w.onDown.add(p2jump);


        //Detecta si un jugador llega a la meta y lo guarda como ganador de la partida.
        if (player.x == 5856) {
            winner = 'jugador 1';
            this.state.start('ending');
        }

        if (player2.x == 5856) {
            winner = 'jugador 2';
            this.state.start('ending');
        }

        //progreso

        pin.width= (player.x*1.9*3);

}


}