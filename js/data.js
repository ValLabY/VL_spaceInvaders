/**
 * Created by valen on 02/05/2017.
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

