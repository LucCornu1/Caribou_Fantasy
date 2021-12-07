class player extends character
// Hérite du character
{
// public
	bIsWalking = false;
	direction;
	currentPos = [0, 0];
	targetPos = [0, 0];
	playerNumber = 0;
// private
	#graphics;
	#time;
	#i = 0;
	constructor(stat_HP, stat_Attack, stat_Defense, number)
	{
		super(stat_HP, stat_Attack, stat_Defense);

		this.bIsWalking = false;
		this.direction = 'down';
		this.currentPos = [46, 48];
		this.targetPos = [46, 48];
		this.#time = 24;
		this.#i = 0;
		this.playerNumber = number;
		this.type = "player";
	}

	// call in create
	beginPlay()
	{
		super.beginPlay();
		this.#graphics = myGame.add.graphics();

		this.player_ = myGame.physics.add.sprite(46 + 290 * this.playerNumber, 48, 'hero'); // Base [14 , 16] (+32 = [46 , 48])
	}

	// call in create
	beginPlayWander()
	{
		this.generateAnimation();
		this.player_ = myGame.physics.add.sprite(this.currentPos[0], this.currentPos[1], 'hero'); // Base [14 , 16] (+32 = [46 , 48])
	}

	// call in update
	play()
	{
		super.play();

		this.movePlayer();
	}

	// call in update
	playCombat()
	{
		this.#graphics.clear();
        this.#graphics.fillStyle(0xff0000);
        this.#graphics.fillRect(80 + 290 * this.playerNumber, 32, this.maxHealth, 16);
        this.#graphics.fillStyle(0x2dff2d);
        this.#graphics.fillRect(80 + 290 * this.playerNumber, 32, this.currentHealth, 16); // Ajout de la barre de vie

		// console.log(this.bReady);
		if (!this.bReady)
		{
			// console.log("faux");
			this.#graphics.fillStyle(0x2d2d2d);
			this.#graphics.fillRect(80 + 290 * this.playerNumber, 64, 100, 16);
			this.#graphics.fillStyle(0x00F5FF);
			this.#graphics.fillRect(80 + 290 * this.playerNumber, 64, this.timedEvent.getProgress() * 100, 16); // Ajout de la barre de chargement pour du feedback si le joueur lance un sort
		}
	}


	// added
	movePlayer()
	// Bouge le joueur sur la prochaine case, avec la bonne animation
	{
		if (this.bIsWalking)
		{
			this.walkAnimation();
			
			if (this.#i <= this.#time) // Bouge le joueur petit à petit avec un 'Lerp' pour avoir un effet de transition
			{
				this.player_.x = this.currentPos[0] + (this.targetPos[0] - this.currentPos[0]) * this.#i / this.#time;
				this.player_.y = this.currentPos[1] + (this.targetPos[1] - this.currentPos[1]) * this.#i / this.#time;
				this.#i++;
			}else{ // A la fin du mouvement, le joueur à 1 chance sur 10 de tomber sur un combat
				this.#i = 0;
				this.bIsWalking = false;
				if (Phaser.Math.Between(0, 99) < 9 && nb_Victories < 3)
				{
					myGame.scene.start('combatScene');
				}
			}
		}
		else{
			this.idleAnimation();
		}
	}

	generateAnimation()
	// Génère les animations pour le joueur
	{
		myGame.anims.create({
			key: 'down',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 20, end: 23 }),
			frameRate: 6,
			repeat: -1
		});

		myGame.anims.create({
			key: 'up',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 25, end: 28 }),
			frameRate: 8,
			repeat: -1
		});

		myGame.anims.create({
			key: 'right',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 30, end: 33 }),
			frameRate: 8,
			repeat: -1
		});

		myGame.anims.create({
			key: 'left',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 35, end: 38 }),
			frameRate: 8,
			repeat: -1
		});

		myGame.anims.create({
			key: 'idleDown',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
			frameRate: 8,
		});

		myGame.anims.create({
			key: 'idleUp',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
			frameRate: 3,
		});

		myGame.anims.create({
			key: 'idleRight',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 10, end: 13 }),
			frameRate: 3,
		});

		myGame.anims.create({
			key: 'idleLeft',
			frames: myGame.anims.generateFrameNumbers('hero', { start: 15, end: 18 }),
			frameRate: 3,
		});
	}

	walkAnimation()
	// Utilise la bonne animation de marche en fonction de la direction
	{
		if (this.direction === 'left')
		{
			this.player_.anims.play('left', true);
		}
		else if (this.direction === 'right')
		{
			this.player_.anims.play('right', true);
		}
		else if (this.direction === 'up')
		{
			this.player_.anims.play('up', true);
		}
		else{
			this.player_.anims.play('down', true);
		}
	}

	idleAnimation()
	// Utilise la bonne animation d'attente en fonction de la direction
	{
		if (this.direction === 'left')
		{
			this.player_.anims.play('idleLeft', true);
		}
		else if (this.direction === 'right')
		{
			this.player_.anims.play('idleRight', true);
		}
		else if (this.direction === 'up')
		{
			this.player_.anims.play('idleUp', true);
		}
		else{
			this.player_.anims.play('idleDown', true);
		}
	}
}
