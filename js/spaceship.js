/**
 * Created by ValLabY on 02/05/2017.
 */
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
        } else if ( this.keyswitch == true && this.pv > 0) {
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

