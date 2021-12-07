class combat
{
// public
    bStopTime = false;
    constructor(players, ennemi)
    {
        this.playerArray = players;
        this.ennemiCreature = ennemi;
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
    }
}
