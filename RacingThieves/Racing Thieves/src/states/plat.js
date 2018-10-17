CatCatcher.platState = function (game) {

}

var score = 0;
var style = { font: "40px Impact", fill: "#ff0044", align: "center" };
var t;

function collisionHandler(obj1, obj2) {

    cat.x = game.rnd.integerInRange(70, 709);
    cat.y = game.rnd.integerInRange(67, 508);
    score++;

    t.setText('Score: ' + score);

    if (score >= 3) {
        score = 0;
        this.state.start('ending');
    }

}

CatCatcher.platState.prototype = {

    preload: function () {
    },

    create: function () {
        game.add.sprite(0, 0, 'background');
        cat = game.add.sprite(game.rnd.integerInRange(72, 709), game.rnd.integerInRange(67, 508), 'cat');
        sprite = game.add.sprite(400, 300, 'catcher');

        game.physics.enable(cat, Phaser.Physics.ARCADE);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);

        cat.body.setSize(19, 25, 0, 0);
        sprite.body.setSize(36, 40, 0, 0);

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //674*479 72*67

        t = game.add.text(0, 0, 'Score: ' + score, style);
    },


    update: function () {
        if (upKey.isDown) {
            if (sprite.y > 67) {
                sprite.y -= 5;
            }
        }
        else if (downKey.isDown) {
            if (sprite.y < 493) {
                sprite.y += 5;
            }
        }

        if (leftKey.isDown) {
            if (sprite.x > 72) {
                sprite.x -= 5;
            }
        }
        else if (rightKey.isDown) {
            if (sprite.x < 692) {
                sprite.x += 5;
            }
        }

        game.physics.arcade.collide(cat, sprite, collisionHandler, null, this);



    }

}