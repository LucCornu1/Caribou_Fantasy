class creature extends character
// Hérite du character
{
// public
    player_c;
    creatureName = 'error_noName';
// private
    #graphics;
    constructor(name = 'none', stat_HP = 0, stat_Attack = 0, stat_Defense = 0)
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
        this.#graphics.fillRect(300, 550, player_combat.ennemiCreature.currentHealth, 16); // Ajout de la barre de vie

        var nb_PlayersAlive = 0;
        playerArray.forEach(player => { // Compte le nombre de personnage joueur encore en vie
            if (player.currentHealth > 0)
            {
                nb_PlayersAlive++;
            }
        });

        if (this.currentHealth > 0 && nb_PlayersAlive > 0) // S'il reste des personnages joueurs en vie, et que la créature est encore en vie
        {
            var target = playerArray[Phaser.Math.Between(0, 2)]; // Choisi une cible aléatoire

            while (target.currentHealth <= 0) // Choisir une cible en vie
            {
                target = playerArray[Phaser.Math.Between(0, 2)];
            }

            this.useSkill_i(target, Phaser.Math.Between(0, 1)); // Lance un sort aléatoire
        }else if (this.currentHealth <= 0) {
            // this.bDead = true;
            this.player_c.visible = false; // Rend la créature invisible lors de sa mort
        }
    }
}
