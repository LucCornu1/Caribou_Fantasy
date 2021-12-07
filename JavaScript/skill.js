class skill
{
// public
    attackName = 'error_none';
    bReady = true;
    constructor(name, damage_multiplier, cast_time, effect_name)
    {
        this.attackName = name;
        this.dmgMultiplier = damage_multiplier;
        this.castTime = cast_time;
        this.effectName = effect_name;
    }


    // Functions
    useSkill(attacker, target)
    {
        // console.log(this.attackName + this.bReady);

        if (this.bReady)
        {
            this.bReady = false;

            this.effect = myGame.add.sprite(400, 450, this.effectName).setScale(2);
            this.effect.visible = false;

            myGame.time.delayedCall(this.castTime * 1000, this.castFinish, [attacker, target], this);
        }
    }

    castFinish(attacker, target)
    {
        this.bReady = true;

        if(attacker.type == "player")
        {
            this.effect.visible = true;
            this.effect.anims.play(this.effectName);

            this.effect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                this.effect.visible = false;
            }, this);
        }        
    }
}




class damageSkill extends skill
{
    constructor(name, damage_multiplier, cast_time, effect_name = 'error_none')
    {
        super(name, damage_multiplier, cast_time, effect_name);
    }

    useSkill(attacker, target)
    {
        super.useSkill(attacker, target);
    }

    castFinish(attacker, target)
    {
        this.bReady = true;

        if (attacker.currentHealth > 0)
        {
            super.castFinish(attacker, target);

            var currentDamage = this.dmgMultiplier * attacker.attack;
            target.damage(currentDamage);
        }
    }
}




class healSkill extends skill
{
    constructor(name, damage_multiplier, cast_time, effect_name = 'error_none')
    {
        super(name, damage_multiplier, cast_time, effect_name);
    }

    useSkill(attacker, target)
    {
        super.useSkill(attacker, target);
    }

    castFinish(attacker, target)
    {
        if (attacker.currentHealth > 0)
        {
            this.bReady = true;

            var currentHeal = this.dmgMultiplier * attacker.attack;
    
            target.forEach(player => {
                player.heal(currentHeal);
            });
        }
    }
}
