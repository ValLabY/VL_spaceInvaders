/**
 * Created by ValLabY on 02/05/2017.
 */
/* controller*/

document.onkeydown = function(key){

    if(key.keyCode === 37) {
        spaceship.keyswitch = true;
        spaceship.dir = -1;
    }

    if (key.keyCode === 39){
        spaceship.keyswitch = true;
        spaceship.dir= 1;
    }

    if(key.keyCode === 38) {
        spaceship.shootSwitch = true;
    }

    if(key.keyCode === 80){

        if( play == true) {
            play = false;
        } else if (play == false){
            play = true;
        }

    }
};

document.onkeyup = function(key){
    if(key.keyCode === 37) {

        if( spaceship.dir == -1 ) {
            spaceship.keyswitch = false;
        }

    }
    if (key.keyCode === 39){

        if( spaceship.dir == 1 ) {
            spaceship.keyswitch = false;
        }

    }

    if(key.keyCode === 38) {
        spaceship.shootSwitch = false;
    }


};
