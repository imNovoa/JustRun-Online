CatCatcher.characterState = function(game) {
}


function over(object) {
    object.scale.set(0.5, 0.5);
}

function out(object) {
    object.scale.set(0.45, 0.45);
}

function nextState(object){
    this.state.start(object.ns);
}

function nextCharacter(){
    if(skin == 0){
    	characterSelection.loadTexture('drakeSeleccion');
    	skin = 1;
    }else{
    	characterSelection.loadTexture('francescaSeleccion');
    	skin = 0;
    }
}

var skin = 0;
var characterSelection;


CatCatcher.characterState.prototype = {

    preload: function () {

    },


    create: function() {
    	characterSelection = game.add.image(0,0, 'francescaSeleccion');
    	characterSelection.scale.set(0.27, 0.25);

        var left = game.add.image(480, 410, 'lArrow');
        var right = game.add.image(600, 410, 'rArrow');
        var p = game.add.image(530, 430, 'ready');
        p.scale.set(0.45, 0.45)
        
        right.inputEnabled = true;
        left.inputEnabled = true;
        
        right.events.onInputDown.add(nextCharacter, this);
        left.events.onInputDown.add(nextCharacter, this);
        

        p.ns = 'join';

        p.inputEnabled = true;

        p.events.onInputDown.add(nextState, this)

    },


}