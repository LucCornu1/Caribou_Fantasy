class combat
{
    // public
    bStopTime = false;
    constructor(players, ennemi)
    {
        this.playerArray = players;
        this.ennemiCreature = ennemi;
    }

    beginPlay()
    {
        // none
    }

    // play on tick
    play()
    {
        this.ennemiCreature.play();
    }

}



function clampLoop(min, max, number)
{
    if (number < min)
    {
        number = max;
    }
    else if (number > max) {
        number = min
    }

    return number;
}