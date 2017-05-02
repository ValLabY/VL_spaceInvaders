/**
 * Created by ValLabY on 02/05/2017.
 */
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
        update: function () {
            this.shoot();
            this.spriteAnim();
            ctx.drawImage(this.sprite,this.spriteIndexX,this.spriteIndexY,50,50,this.x, this.y,50,50);
        }
    };
    spacemonsters.push(_spacemonster);
};

const spacemonsters = [];

