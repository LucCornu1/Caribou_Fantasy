class combat
// Classe qui gère le combat
{
// public
    nb_PlayersAlive = 0;
    constructor(players, ennemi)
    {
        this.playerArray = players;
        this.ennemiCreature = ennemi;
        this.nb_PlayersAlive = 0;
        this.bOver = false;
    }

    // call on create
    beginPlay()
    {
        this.bOver = false;
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
        this.playerArray.forEach(player => { // Compte le nombre de personnage joueur encore en vie
            if (player.currentHealth > 0)
            {
                this.nb_PlayersAlive++;
            }
        });

        if (this.ennemiCreature.currentHealth <= 0) // Si l'ennemi est encore en vie
        {
            this.bOver = true; // On signale que le combat est terminé

            if (this.playerArray[0].bReady && this.playerArray[1].bReady && this.playerArray[2].bReady) // On attends que tout le monde ait fini de lancer ses sorts pour éviter les bugs
            {
                Music.stop(); // Arrête la musique
                nb_Victories++;

                if (nb_Victories >=3)
                {
                    // None
                }else{
                    myGame.scene.start('wanderScene'); // Retourne à la scène principale
                }
            }
        }
        else if (this.nb_PlayersAlive <= 0) // Si tous les joueurs sont morts
        {
            Music.stop();
            myGame.scene.start('gameOver'); // Lance l'écran de GameOver
        }else{
            this.bOver = false;
        }
    }
}
