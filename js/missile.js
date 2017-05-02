
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


function killMissile(){
    for( var missile in missiles){
        if ( missiles[missile].y < 0 || missiles[missile].y > 500) {
            missiles.splice(missile, 1);
        }
    }
}
