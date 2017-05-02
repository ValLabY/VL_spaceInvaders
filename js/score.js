/**
 * Created by ValLabY on 02/05/2017.
 */

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
    };
    animscores.push(_animScore);
};

const animscores = [];