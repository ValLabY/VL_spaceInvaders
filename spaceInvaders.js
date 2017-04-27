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

        if(this.shootSwitch == true && this.shootCounter == 0){
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
            ctx.font = "50pt Calibri,Geneva,Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Vous etes Mort", 50, 150);
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

/* collision */

function collision(){
    for(var monster in spacemonsters){
        for( var missile in missiles) {
            if( missiles[missile].y< spacemonsters[monster].y + 50 && spacemonsters[monster].x + 50 > missiles[missile].x && missiles[missile].x> spacemonsters[monster].x && missiles[missile].ySpeed >0){

                spacemonsters[monster].kill = true;
                missiles.splice(missile, 1);

            }

        }
        if (spacemonsters[monster].spriteIndexY >= 100) {
            spacemonsters.splice(monster, 1);

        }
    }

    for( var missileMonster in missiles ){
        if(missiles[missileMonster].y + 28 > spaceship.y && missiles[missileMonster].y + 28 < spaceship.y + 48 &&  missiles[missileMonster].x > spaceship.x && missiles[missileMonster].x + 8 < spaceship.x+47 && missiles[missileMonster].ySpeed <0){
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

function create(){
    update();
    var t = 0;
    for(i= 25; i<= 500; i += 100){
        spacemonster(i, 100,t);
        spacemonster(i, 150,t + 4);

        t++;
    }



}

function update(){
    var date = new Date();
    console.log(date.toLocaleTimeString());
    setTimeout(update, 16);
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle="#070048";
    ctx.fillRect(0,0,500,500);
    collision();
    star(1,2, 2);
    star(1,2, 3);
    star(1,2,6);
    killStar();
    stars.map(function (_star) {
        _star.update();
    });


    spacemonsters.map(function (_spacemonster) {
        _spacemonster.update();
    });
    spaceship.update();

    missiles.map(function (_missile) {
        _missile.update();
    });
    killMissile();



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
        spaceship.touch = true;
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

    if(key.keyCode === 88){
        spaceship.touch = false;
    }
};


