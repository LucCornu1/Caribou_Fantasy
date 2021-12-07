class bestiaire
{
// public
    monstersArray = [];
    constructor(monsters = [])
    {
        this.monstersArray = monsters;
    }

    createMonster(name, health, attack, defense, skill0, skill1)
    {
        var newCreature = new creature(name, health, attack, defense);

        newCreature.addSkills([skill0, skill1]);

        this.monstersArray.push(newCreature);
    }

    deleteMonster(name)
    {
        this.monstersArray.forEach(creature => {
            if (creature.creatureName == name)
            {
                this.monstersArray.splice(this.monstersArray.indexOf(creature), 1);
            }
        });     
    }

    selectMonster(id)
    {
        return this.monstersArray[id];
    }

    selectMonsterByName(name)
    {
        this.monstersArray.forEach(creature => {
            if (creature.creatureName == name)
            {
                return creature;
            }
        });
    }

    getMaxId()
    {
        return this.monstersArray.length - 1;
    }
}




/*class spellbook
{
    // public
    spellsArray = [];
    constructor(spells = [])
    {
        this.spellsArray = spells;
    }

    createDamageSpell(name, damage_multiplier, cast_time, effect_name = 'error_none')
    {
        var newSpell = new damageSkill(name, damage_multiplier, cast_time, effect_name);

        this.spellsArray.push(newSpell);
    }

    createHealSpell(name, damage_multiplier, cast_time, effect_name = 'error_none')
    {
        var newSpell = new healSkill(name, damage_multiplier, cast_time, effect_name);

        this.spellsArray.push(newSpell);
    }

    deleteSpell(name)
    {
        this.spellsArray.forEach(spell => {
            if (spell.attackName == name)
            {
                this.spellsArray.splice(this.spellsArray.indexOf(spell), 1);
            }
        });     
    }

    selectSpell(id)
    {
        return this.spellsArray[id];
    }

    selectSpellByName(name)
    {
        var i = 0;
        this.spellsArray.forEach(spell => {
            if (spell.attackName == name)
            {
                return this.spellsArray[i];
            }else{
                i++
            }
        });
    }

    getMaxId()
    {
        return this.spellsArray.length - 1;
    }
}*/