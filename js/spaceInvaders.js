/**
 * Created by ValLabY on 30/03/2017.
 */

/* main */
var play = true;
var musicIsOn = true;

function create(){
    update();
    var t = 0;
    for(i= 25; i<= 500; i += 100){
        spacemonster(i, 100,t);
        spacemonster(i, 150,t + 4);
        t++;
    }
    if(noMusic == false){
        music.play();
        musicIsOn = true;
    }
}

function update(){
    var date = new Date();
    console.log(date.toLocaleTimeString());
    setTimeout(update, 16);

    if (musicIsOn == false){
        musicIsOn = true;
        music.play();
    }

    if (noMusic == true){
        musicIsOn = false;
        music.stop();
    }

    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle="#070048";
    ctx.fillRect(0,0,500,500);
    star(1,2,2);
    star(1,2,3);
    star(1,2,6);
    killStar();

    stars.map(function (_star) {
        _star.update();
    });

    if( play == true) {
        collision();
        score.update();

        spacemonsters.map(function (_spacemonster) {
            _spacemonster.update();
        });

        spaceship.update();

        missiles.map(function (_missile) {
            _missile.update();
        });

        animscores.map(function (_score) {
            _score.update();
        });

        killMissile();
    }

    if(play == false && score.point < 100){
        ctx.font = "20pt Pixeled";
        ctx.fillStyle = "white";
        ctx.fillText("Le jeu est en pause", 25, 150);
        ctx.font = "10pt Pixeled";
        ctx.fillStyle = "white";
        ctx.fillText("Appuyez sur P pour relancer", 25, 200);
    }

    if( score.point == 100){
        ctx.font = "30pt Pixeled";
        ctx.fillStyle = "white";
        ctx.fillText("Victoire !", 100, 150);
    }

    if(document.getElementById("sound").checked == true){
        noSound = true;
    } else if(document.getElementById("sound").checked == false){
        noSound = false;
    }


    if(document.getElementById("music").checked == true){
        noMusic = true;
    } else if(document.getElementById("music").checked == false){
        noMusic = false;
    }
}

create();



