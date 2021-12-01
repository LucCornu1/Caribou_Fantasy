class character
{
    // public
    currentHealth = 100;
    skills;
    // private
    #maxHealth = 100;
    #attack = 5;
    #defense = 5;
    constructor(stat_HP, stat_Attack, stat_Defense)
    {
        this.#maxHealth = stat_HP;
        this.#attack = stat_Attack;
        this.#defense = stat_Defense;

        this.currentHealth = this.#maxHealth;
    }

    // call on create
    beginPlay()
    {
        // none
    }

    // call on update
    play()
    {
        // none
    }


    // getters & setters
    get maxHealth()
    {
        return this.#maxHealth;
    }

    set maxHealth(number)
    {
        this.#maxHealth = number;
    }

    get attack()
    {
        return this.#attack;
    }

    set attack(number)
    {
        this.#attack = number;
    }

    get defense()
    {
        return this.#defense
    }

    set defense(number)
    {
        this.#defense = number;
    }


    // added
    damage(baseDamage)
    {
        var damage = this.damageMitigation(baseDamage);

        this.currentHealth -= damage;

        this.currentHealth = clamp(0, this.#maxHealth, this.currentHealth);
    }

    damageMitigation(baseDamage)
    {
        return (baseDamage - this.#defense / 2);
    }

    heal(number)
    {
        this.currentHealth += number;

        this.currentHealth = clamp(0, this.#maxHealth, this.currentHealth);
    }

    addSkills(skillsArray)
    {
        /*var max = skillsArray.length;

        for (i = 0; i < max; i++)
        {
            this.skills[i] = skillsArray[i];
        }*/

        this.skills = skillsArray;

        // console.log(skillsArray);
    }

    useSkill_i(target, i)
    {
        /*console.log(this);
        console.log(target);
        console.log(i);*/

        this.skills[i].useSkill(this, target);
    }
}




// function
function clamp(min, max, number)
{
    if (number < min)
    {
        number = min;
    }
    else if (number > max) {
        number = max;
    }

    return number;
}