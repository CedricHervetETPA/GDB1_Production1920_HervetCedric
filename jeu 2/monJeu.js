var config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var platforms;
var player;
var cursors; 
var hand;
var jump = 2;
var nJump = 1;
var zoneTap;
var clicks = 0;

function preload(){
	this.load.image('background','assets/background.png');	
	this.load.image('araignee','assets/araignee.png');
	this.load.image('bouton','assets/bouton.png');
	this.load.spritesheet('perso','assets/player.png',{frameWidth: 50, frameHeight: 35});
}



function create(){
	this.add.image(400,320,'background');
    zoneTap = this.add.image(150,615,'bouton').setInteractive().setScrollFactor(0, 0);
    zoneTap.on('pointerdown',() => {
              clicks ++;
            })

	//araignee
	araignee = this.physics.add.group();
    araignee = this.physics.add.sprite(100,100,'araignee');
    araignee.setVelocity(0, 0);
    araignee.setBounce(0);
    araignee.body.setGravityX(7);
    araignee.body.setGravityY(3);

    //personnage joueur
	player = this.physics.add.sprite(1100,566,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	player.body.setGravityY(0);
	this.physics.add.overlap(player,araignee, hitaraignee, null, this);
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: [{key: 'perso', frame:4}],
		frameRate: 20
	});
	
	araignee = this.physics.add.group();

	
}


function update(){
	if(clicks>=55){
		player.disableBody(true,true);
		//this.scene.start("Scene3");
	}
}

function hitaraignee(player,araignee){
	player.disableBody(true,true);
	}

