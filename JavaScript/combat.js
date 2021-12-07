class combat
{
// public
    bStopTime = false;
    nb_PlayersAlive = 0;
    constructor(players, ennemi)
    {
        this.playerArray = players;
        this.ennemiCreature = ennemi;
        this.nb_PlayersAlive = 0;
    }

    // call on create
    beginPlay()
    {
        this.playerArray.forEach(player => {
            player.beginPlay();
        });
        this.ennemiCreature.beginPlay();
    }

    // call on udpate
    play()
    {
        this.playerArray.forEach(player => {
            player.playCombat();
        });
        this.ennemiCreature.play(this.playerArray);

        this.nb_PlayersAlive = 0;

        this.playerArray.forEach(player => {
            if (player.currentHealth > 0)
            {
                this.nb_PlayersAlive++;
            }
        });

        if (this.ennemiCreature.currentHealth <= 0)
        {
            myGame.scene.start('wanderScene');
        }
        else if (this.nb_PlayersAlive <= 0)
        {
            myGame.scene.start('gameOver');
        }
    }
}
