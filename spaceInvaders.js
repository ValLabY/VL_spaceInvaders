/**
 * Created by ValLabY on 30/03/2017.
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

var imgSpaceship= new Image();
imgSpaceship.src = 'images/sprite.png';
var imgMissileSpaceship= new Image();
imgMissileSpaceship.src = 'images/sprite_missile.png';
var imgMissileSpaceMonster= new Image();
imgMissileSpaceMonster.src = 'images/sprite_missile_monster.png';
var imgSpaceMonster = new Image();
imgSpaceMonster.src = 'images/sprite_alien.png';
var imgExplosion = new Image();
imgExplosion.src = 'images/sprite_explosion.png';

var laserSound = new Howl({
    src: [' son/laser.mp3']
});

var laserSoundMonster= new Howl({
    src: [' son/Laser_Shoot6.wav']
});

var explosionSound = new Howl({
    src: [' son/explosion.wav']
});

var music= new Howl({
    src: [' son/H-Mister-Willpower.mp3']
});

var hit= new Howl({
    src: [' son/Hit_Hurt2.wav']
});

var noMusic = false;
var noSound = false;



/* spaceship */

var spaceship = {
    x: 0,
    y: 450,
    sprite: imgSpaceship,
    spriteIndexX: 94,
    spriteIndexY: 0,
    dir: 1,
    pv: 100,
    touch: false,
    spriteCounter: 0,
    shootCounter: 0,
    spriteCounterDeath: 0,
    xSpeed: 8,
    keyswitch: false,
    inertie: 8,
    shootSwitch: false,
    pvSprite: function () {
        ctx.beginPath();
        ctx.strokeStyle="white";
        ctx.lineWidth="2";
        ctx.rect(10,10,this.pv*3,20);
        ctx.fillStyle="green";
        ctx.fill();
        ctx.stroke();
    },
    shoot: function () {


        if(this.shootSwitch == true && this.shootCounter == 0 && this.pv > 0){



            if ( noSound == false) {
                laserSound.play();
            }
            if ( noSound == true) {
                laserSound.stop();
            }


            missile(this.x + 23.5,this.y,15,imgMissileSpaceship);
            this.shootCounter = 10;
        }
        this.shootCounter--;

        if (this.shootCounter < 0 ){
            this.shootCounter = 0;
        }
    },
    move: function () {
        if ( this.keyswitch == true && this.pv > 0){
            this.inertie--;
            this.x = this.x + (this.xSpeed - this.inertie) *this.dir;
            if( this.inertie <=0){
                this.inertie = 0;
            }

        }
        if (this.keyswitch == false){
            this.inertie = 8;
        }
    },
    spriteAnim: function () {

        if (this.keyswitch == false && this.pv > 0) {
            this.spriteIndexX = 94;
            this.spriteCounter = 0;
        }
        else if ( this.keyswitch == true && this.pv > 0) {
            this.spriteCounter++;
            if (this.keyswitch == true && this.dir == -1 && this.spriteCounter == 5) {
                    this.spriteIndexX -= 47;
                if (this.spriteIndexX<= 0){
                    this.spriteIndexX = 0;
                }
                this.spriteCounter = 0;
            } else if (this.keyswitch == true && this.dir == 1 && this.spriteCounter == 5) {
                    this.spriteIndexX += 47;
                    if (this.spriteIndexX>= 188){
                        this.spriteIndexX = 188;
                    }

                this.spriteCounter = 0;
            }
        }

    },
    degats: function () {
        if( this.touch == true){
            this.pv -= 10;
            this.touch = false;
        }
        if (this.pv < 0 ){
            this.pv = 0;
        }
        if(this.pv == 0){

            ctx.font = "20pt Pixeled";
            ctx.fillStyle = "white";
            ctx.fillText("Vous etes Mort", 75, 250);
        }
    },
    spriteAnimDeath: function () {

        if (this.pv == 0) {
            if(this.spriteIndexX%5){
                this.spriteIndexX = 0;
            }
            this.sprite = imgExplosion;
            this.spriteCounterDeath++;
            if (this.spriteCounterDeath == 4 ) {
                this.spriteIndexX += 50;
                if (this.spriteIndexX > 150) {
                    this.spriteIndexY += 50;
                    this.spriteIndexX = 0;
                }

                this.spriteCounterDeath = 0;
            }
        }
    },
    update: function () {

        this.move();
        this.shoot();
        this.degats();
        this.spriteAnim();
        this.spriteAnimDeath();
        ctx.drawImage(this.sprite,this.spriteIndexX,this.spriteIndexY,47,48,this.x, this.y,50,48);

        this.pvSprite();


    }
};


/* missile */

var missile = function (_x,_y,_ySpeed,_imgMissile) {

    const _missile = {
        id: this.id+1,
        x: _x,
        y: _y,
        ySpeed: _ySpeed,
        update: function () {
            this.y -= this.ySpeed;
            ctx.drawImage(_imgMissile,this.x, this.y, 8, 28);
        }
    };
missiles.push(_missile);
};


const missiles = [];

/* spacemonster */

var spacemonster = function (_x,_y,_id) {
    const _spacemonster = {
        x: _x,
        y: _y,
        id: _id,
        xSpeed: 3,
        dir: 1,
        sprite: imgSpaceMonster,
        kill: false,
        dirSwitch: false,
        spriteIndexX: 0,
        spriteIndexY: 0,
        spriteCounter: 0,
        shootCounter: Math.floor((Math.random() * 400) + 5 ),
        shoot: function () {
            if( this.shootCounter == 0){
                if ( noSound == false) {
                    laserSoundMonster.play();
                }
                if ( noSound == true) {
                    laserSoundMonster.stop();
                }
                missile(this.x + 25,this.y + 50,-7,imgMissileSpaceMonster);
                this.shootCounter = Math.floor((Math.random() * 400) + 5 );
            }
            this.shootCounter--;

            if (this.shootCounter < 0 ){
                this.shootCounter = 0;
            }
        },
        spriteAnim: function () {
            if (this.kill == true) {
                this.sprite = imgExplosion;
                this.spriteCounter++;
                if (this.spriteCounter == 4) {
                    this.spriteIndexX += 50;
                    if (this.spriteIndexX > 150) {
                        this.spriteIndexY += 50;
                        this.spriteIndexX = 0;
                        if(this.spriteIndexY > 150){
                            this.kill = false;
                        }
                    }

                    this.spriteCounter = 0;
                }
            }
        },
        move: function () {
            this.x = this.x + this.xSpeed * this.dir;
        },

        update: function () {
            this.shoot();
            this.spriteAnim();
            ctx.drawImage(this.sprite,this.spriteIndexX,this.spriteIndexY,50,50,this.x, this.y,50,50);
        }
    };
spacemonsters.push(_spacemonster);
};

const spacemonsters = [];


/*star*/
var star = function ( _width, _width2, _speed) {
    const _star = {
        x:  Math.floor((Math.random() * 500) + 1),
        y: -10,
        width: Math.floor((Math.random() * _width) + _width2 ),
        speed: _speed,
        move: function () {
            this.y = this.y + this.speed;
        },
        update: function () {
            this.move();
            ctx.fillStyle="white";
            ctx.fillRect(this.x,this.y,this.width,this.width);
        }
    };

    stars.push(_star);

};

const stars =[];


/* Score */

var score = {
    point: 0,
    ySpeed: 3,
    update: function () {
        ctx.font = "10pt Pixeled";
        ctx.fillStyle = "white";
        ctx.fillText("Score : " + this.point , 25, 60);
    }
};

var animScore = function (_x,_y) {
    const _animScore = {
        x : _x,
        y: _y,
        ySpeed: 1,
        animCounter: 50,
        anim: function () {
            if (this.animCounter > 0){
            this.y = this.y - this.ySpeed
            }
            this.animCounter --;
            if( this.animCounter <= 0 ){
                this.animCounter = 0;
                animscores.splice(0,1);
            }
        },
        update: function () {
            this.anim();
            ctx.font = "5pt Pixeled";
            ctx.fillStyle = "white";
            ctx.fillText("+10pts" , this.x, this.y);
        }
    }
    animscores.push(_animScore);
};

const animscores = [];
/* collision */

function collision(){
    for(var monster in spacemonsters){
        for( var missile in missiles) {
            if( missiles[missile].y< spacemonsters[monster].y + 50 && spacemonsters[monster].x + 50 > missiles[missile].x && missiles[missile].x> spacemonsters[monster].x && missiles[missile].ySpeed >0){

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
        if(missiles[missileMonster].y + 28 > spaceship.y && missiles[missileMonster].y + 28 < spaceship.y + 48 &&  missiles[missileMonster].x > spaceship.x && missiles[missileMonster].x + 8 < spaceship.x+47 && missiles[missileMonster].ySpeed <0){
            if ( noSound != true) {
                hit.play();
            }
            spaceship.touch = true;
            missiles.splice(missileMonster,1);
        }
    }
}

/* kill*/

function killStar(){
    for(var star in stars){
        if ( stars[star].y >= 500 ){
            stars.splice(star,1);
        }
    }
}

function killMissile(){
    for( var missile in missiles){
        if ( missiles[missile].y < 0 || missiles[missile].y > 500) {
            missiles.splice(missile, 1);
        }
    }
}

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
    star(1,2, 2);
    star(1,2, 3);
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

    console.log(noMusic);

}

create();


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

    if(key.keyCode === 88){
        console.log(missiles);
        console.log(spacemonsters);
        console.log(stars);
        console.log(animscores);
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


