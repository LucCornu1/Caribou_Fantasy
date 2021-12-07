class creature extends character
{
// public
    player_c;
    creatureName = 'error_noName';
// private
    #graphics;
    constructor(name = 'none', stat_HP, stat_Attack, stat_Defense)
    {
        super(stat_HP, stat_Attack, stat_Defense);

        if (name != 'none')
        {
            this.creatureName = name;
        }else{
            console.log('ERROR : the creature has no name');
        }

        this.type = "creature";
    }

    // call on create
    beginPlay()
    {
        super.beginPlay();

        this.player_c = myGame.add.image(400, 460, this.creatureName).setScale(0.5);

        // console.log('JA');

        this.#graphics = myGame.add.graphics();
    }

    // call on update
    play(playerArray)
    {
        super.play();

        this.#graphics.clear();
        this.#graphics.fillStyle(0x2d2d2d);
        this.#graphics.fillRect(300, 550, player_combat.ennemiCreature.maxHealth, 16);
        this.#graphics.fillStyle(0x2dff2d);
        this.#graphics.fillRect(300, 550, player_combat.ennemiCreature.currentHealth, 16);

        /*this.#graphics.fillStyle(0x00C7FF, 1);
        this.#graphics.slice(550, 450, 10, Phaser.Math.DegToRad(360), Phaser.Math.DegToRad(0), true);
        this.#graphics.fillPath();*/


        var nb_PlayersAlive = 0;

        playerArray.forEach(player => {
            if (player.currentHealth > 0)
            {
                nb_PlayersAlive++;
            }
        });

        if (this.currentHealth > 0 && nb_PlayersAlive > 0)
        {
            // console.log(this.currentHealth);
            var target = playerArray[Phaser.Math.Between(0, 2)];

            while (target.currentHealth <= 0)
            {
                target = playerArray[Phaser.Math.Between(0, 2)];
            }

            this.useSkill_i(target, Phaser.Math.Between(0, 1)); // Phaser.Math.beetween(0, 2)
        }else if (this.currentHealth <= 0) {
            // this.bDead = true;
            this.player_c.visible = false;
        }
    }
}
