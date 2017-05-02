/**
 * Created by ValLabY on 02/05/2017.
 */

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

function killStar(){

    for(var star in stars){

        if ( stars[star].y >= 500 ){
            stars.splice(star,1);
        }

    }
}