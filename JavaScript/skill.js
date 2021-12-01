class skill
{
    // public
    attackName = 'error_none';
    bReady = true;
    effect;
    // private
    #dmgMultiplier = 1;
    constructor(name, damage_multiplier, effect_name)
    {
        this.attackName = name;
        this.#dmgMultiplier = damage_multiplier;

        this.effectName = effect_name;

        this.effect = myGame.add.sprite(400, 450, this.effectName).setScale(2);
        this.effect.visible = false;
    }


    // getters & setters
    get dmgMultiplier()
    {
        return this.#dmgMultiplier;
    }


    // Functions
    useSkill(attacker, target)
    {
        this.effect.visible = true;
        this.effect.anims.play(this.effectName);

        this.effect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.effect.visible = false;
            // console.log('Hallo');
        }, this);
    }
}




class damageSkill extends skill
{
    constructor(name, damage_multiplier, effect_name = 'error_none')
    {
        super(name, damage_multiplier, effect_name);
    }

    useSkill(attacker, target)
    {
        super.useSkill(attacker, target);

        var currentDamage = this.dmgMultiplier * attacker.attack;
        target.damage(currentDamage);
    }
}




class healSkill extends skill
{
    constructor(name, damage_multiplier, effect_name = 'error_none')
    {
        super(name, damage_multiplier, effect_name);
    }

    useSkill(attacker, target)
    {
        super.useSkill(attacker, target);

        var currentHeal = this.dmgMultiplier * attacker.attack;
        target.heal(currentHeal);
    }
}
