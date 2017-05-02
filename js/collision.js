/**
 * Created by ValLabY on 02/05/2017.
 */
/* collision */

function collision(){
    for(var monster in spacemonsters){
        for( var missile in missiles) {
            if( missiles[missile].y< spacemonsters[monster].y + 50 &&
                spacemonsters[monster].x + 50 > missiles[missile].x &&
                missiles[missile].x> spacemonsters[monster].x &&
                missiles[missile].ySpeed >0){

                spacemonsters[monster].kill = true;
                missiles.splice(missile, 1);


                if ( noSound == false) {
                    explosionSound.play();
                }

                if ( noSound == true) {
                    explosionSound.stop();
                }

            }

        }
        if (spacemonsters[monster].spriteIndexY >= 100) {

            animScore( spacemonsters[monster].x, spacemonsters[monster].y);
            spacemonsters.splice(monster, 1);
            score.point += 10;
        }
    }

    for( var missileMonster in missiles ){
        if(missiles[missileMonster].y + 28 > spaceship.y &&
            missiles[missileMonster].y + 28 < spaceship.y + 48 &&
            missiles[missileMonster].x > spaceship.x &&
            missiles[missileMonster].x + 8 < spaceship.x+47 &&
            missiles[missileMonster].ySpeed <0){

            if ( noSound != true) {
                hit.play();
            }

            spaceship.touch = true;
            missiles.splice(missileMonster,1);
        }
    }
}
