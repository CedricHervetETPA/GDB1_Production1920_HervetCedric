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


function preload(){
	this.load.image('background','assets/background.png');	
	this.load.image('gaz','assets/gaz.png');
	this.load.image('livre','assets/livre.png');
	this.load.image('livre2','assets/livre2.png');
	this.load.image('livre3','assets/livre3.png');
	this.load.spritesheet('perso','assets/player.png',{frameWidth: 50, frameHeight: 35});
}



function create(){
	this.add.image(400,350,'background');

	//livres
	platforms = this.physics.add.staticGroup();
	platforms.create(237,660,'livre').setScale(1).refreshBody();
	platforms.create(10,725,'livre2').setScale(1).refreshBody();
	platforms.create(733,700,'livre3').setScale(1).refreshBody();
	platforms.create(450,600,'livre2').setScale(1).refreshBody();
	platforms.create(975,550,'livre').setScale(1).refreshBody();
	platforms.create(1220,650,'livre3').setScale(1).refreshBody();

	//gaz
	gaz = this.physics.add.group();
    gaz = this.physics.add.sprite(-1100,300,'gaz');
    gaz.setVelocity(0, 0);
    gaz.setBounce(0);
    gaz.body.setGravityX(30);

    //personnage joueur
	player = this.physics.add.sprite(50,370,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	player.body.setGravityY(300);
	this.physics.add.collider(player,platforms);
	this.physics.add.overlap(player,gaz, hitGaz, null, this);
	
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
	
	gaz = this.physics.add.group();
}


function update(){
	//déplacement perso
	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-200);
		player.setFlipX(true);
	}else if(cursors.right.isDown){
		player.setVelocityX(200);
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

	if (player.x >= 1100){
			//this.scene.start("SceneFin");
			player.disableBody(true,true);
	}
}

function hitGaz(player,gaz){
	player.disableBody(true,true);
	//this.scene.start("GameOver");
	}


function victoire(player){
	if (player.x >= 720){
			//this.scene.start("SceneFin");
			player.disableBody(true,true);
	}
}
