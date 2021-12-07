class skill
// La classe pour les sorts à lancer par les characters
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
    // Incante le sort avec les statistiques de son lanceur
    {
        if (this.bReady)
        {
            this.bReady = false;

            this.effect = myGame.add.sprite(400, 450, this.effectName).setScale(2); // Place l'effet du sort sur l'écran
            this.effect.visible = false;

            myGame.time.delayedCall(this.castTime * 1000, this.castFinish, [attacker, target], this); // Après le temps d'incatation, lance le sort
        }
    }

    castFinish(attacker, target)
    // Après le temps d'incantation, lance le sort
    {
        this.bReady = true;

        if(attacker.type == "player") // Affiche l'animation seulement si c'est un joueur qui lance le sort
        {
            this.effect.visible = true;
            this.effect.anims.play(this.effectName);

            this.effect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () { // Remet l'effet invisible après avoir terminé son effet
                this.effect.visible = false;
            }, this);
        }        
    }
}




class damageSkill extends skill
// Hérite de la classe Skill
// Sort qui inflige des dégâts
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
// Hérite de la classe Skill
// Sort qui restaure des points de vie
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
    
            target.forEach(player => { // Lance la guérison sur toutes les cibles
                player.heal(currentHeal);
            });
        }
    }
}
