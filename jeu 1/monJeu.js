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
var score = 0;
var platforms;
var player;
var cursors; 
var scoreText;
var hand;
var jump = 2;
var nJump = 1;
var hp;
var nHP = 1;


function preload(){
	this.load.image('background','assets/background.jpg');	
	this.load.image('sol','assets/platform.png');
	this.load.image('main','assets/main.png');
	this.load.image('montre','assets/montre.png');
	this.load.spritesheet('perso','assets/player.png',{frameWidth: 50, frameHeight: 35});
}



function create(){
	this.add.image(600,300,'background');

	//bras
	platforms = this.physics.add.staticGroup();
	platforms.create(50,668,'sol').setScale(3).refreshBody();
	platforms.create(1620,668,'sol').setScale(3).refreshBody();
	platforms.create(650,690,'sol').setScale(2).refreshBody();

	//montre
	platforms.create(150,650,'montre').setScale(1).refreshBody();

	//main
	mainEnnemi = this.physics.add.group();
    mainEnnemi = this.physics.add.sprite(640,10,'main');
    mainEnnemi.setVelocity(0, 0);
    mainEnnemi.setBounce(0);
    mainEnnemi.body.setGravityY(30);
    this.physics.add.collider(mainEnnemi,platforms,hitMontre, null, this);

    //personnage joueur
	player = this.physics.add.sprite(50,570,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	player.body.setGravityY(300);
	this.physics.add.collider(player,platforms);
	this.physics.add.collider(player,mainEnnemi,hitMain, null, this);
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
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
	
	mainEnnemi = this.physics.add.group();

}


function update(){
	//déplacement perso
	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
	}else if(cursors.right.isDown){
		player.setVelocityX(300);
		player.anims.play('left', true);
		player.setFlipX(false);
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
	
	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-330);
	}
	if(cursors.up.isDown && player.body.touching.down){
		jump = 2;
	}

	if ((nJump==1) && jump>0 && cursors.up.isDown){
		jump --;
		nJump=0;
		if (jump == 1) {
		player.setVelocityY(-280);
			if (player.body.velocity.y<0) {
				player.anims.play('left',true);
			}
		}

		if (jump == 0) {
		player.setVelocityY(-280);
			if (player.body.velocity.y<0) {
				player.anims.play('left',true);
			}
		}
	}

	if (cursors.up.isUp) {
		nJump=1;
	}
	
}

function hitMain(player,mainEnnemi){
	player.disableBody(true,true);
	//this.scene.start("GameOver");
	}

function hitMontre(mainEnnemi,platforms){
	player.disableBody(true,true);
	//this.scene.start(Scene2);
	}