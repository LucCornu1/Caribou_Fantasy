class creature extends character
{
    // public
    player_c;
    creatureName = 'error_noName';
    // bDead = false;
    constructor(name = 'none', stat_HP, stat_Attack, stat_Defense)
    {
        super(stat_HP, stat_Attack, stat_Defense);

        if (name != 'none')
        {
            this.player_c = myGame.add.image(400, 460, name).setScale(0.5);
            this.creatureName = name;
        }else{
            console.log('ERROR : the creature has no name');
        }

        // generateAnims('fire_monster', [8, 13, 16, 23, 24, 29, 30, 37]);
    }

    // call on create
    beginPlay()
    {
        super.beginPlay();

        // none
    }

    // call on update
    play()
    {
        super.play();

        if (this.currentHealth > 0)
        {

        }else{
            // this.bDead = true;
            this.player_c.visible = false;
        }
    }


    // added
    /*generateAnims(numArray)
    {
        myGame.anims.create({
			key: 'idle'+this.creatureName,
			frames: myGame.anims.generateFrameNumbers(this.creatureName, { start: numArray[0], end: numArray[1] }),
			frameRate: 10,
			repeat: -1
		});

		myGame.anims.create({
			key: 'attack'+this.creatureName,
			frames: myGame.anims.generateFrameNumbers(this.creatureName, { start: numArray[2], end: numArray[3] }),
			frameRate: 10,
			repeat: -1
		});

		myGame.anims.create({
			key: 'damage'+this.creatureName,
			frames: myGame.anims.generateFrameNumbers(this.creatureName, { start: numArray[4], end: numArray[5] }),
			frameRate: 10,
			repeat: -1
		});

		myGame.anims.create({
			key: 'death'+this.creatureName,
			frames: myGame.anims.generateFrameNumbers(this.creatureName, { start: numArray[6], end: numArray[7] }),
			frameRate: 10,
			repeat: 0
		});
    }*/

    /*idleAnimation()
    {
        this.player_c.anims.play('idle'+this.creatureName, true);
    }

    attackAnimation()
    {
        this.player_c.anims.play('attack'+this.creatureName, true);
    }

    damageAnimation()
    {
        this.player_c.anims.play('damage'+this.creatureName, true);
    }

    deathAnimation()
    {
        this.player_c.anims.play('death'+this.creatureName);
    }*/

}
