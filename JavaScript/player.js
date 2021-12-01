class player extends character
{
// public
	bIsWalking = false;
	direction;
	currentPos = [0, 0];
	targetPos = [0, 0];
// private
	#time;
	#i = 0;
	constructor(stat_HP, stat_Attack, stat_Defense)
	{
		super(stat_HP, stat_Attack, stat_Defense);

		this.player_ = myGame.physics.add.sprite(14, 16, 'hero');
   		// this.player_.setCollideWorldBounds(true);

		this.bIsWalking = false;
		this.direction = 'down';
		this.currentPos = [14, 16];
		this.targetPos = [14, 16];
		
		this.#time = 24;
		this.#i = 0;
	}

	// call in create
	beginPlay()
	{
		super.beginPlay();

		this.generateAnimation();
	}

	// call in update
	play()
	{
		super.play();

		this.movePlayer();
	}


	// added
	movePlayer()
	{
		if (this.bIsWalking)
		{
			this.walkAnimation();
			
			if (this.#i <= this.#time)
			{
				this.player_.x = this.currentPos[0] + (this.targetPos[0] - this.currentPos[0]) * this.#i / this.#time;
				this.player_.y = this.currentPos[1] + (this.targetPos[1] - this.currentPos[1]) * this.#i / this.#time;
				this.#i++;
			}else{
				this.#i = 0;
				this.bIsWalking = false;
			}
		}
		else{
			this.idleAnimation();
		}
	}

	generateAnimation()
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