class character
// Une classe dont hérite les joueurs et les monstres
// Elle contient les variables nécessaire au combat
{
// public
    currentHealth = 100;
    skills;
    timedEvent;
    type = "character";
// private
    #maxHealth = 100;
    #attack = 5;
    #defense = 5;
    #bReady = true;
    constructor(stat_HP, stat_Attack, stat_Defense)
    {
        this.#maxHealth = stat_HP;
        this.#attack = stat_Attack;
        this.#defense = stat_Defense;
        this.currentHealth = this.#maxHealth;
        this.#bReady = true;
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

    get bReady()
    {
        return this.#bReady;
    }


    // added
    damage(baseDamage)
    // Réduit les PV suite à une attaque
    {
        var damage = this.damageMitigation(baseDamage); // Réduction des dégâts

        this.currentHealth -= damage;

        this.currentHealth = clamp(0, this.#maxHealth, this.currentHealth); // Clamp la vie entre 0 & maxHP
    }

    damageMitigation(baseDamage)
    // Réduit les dégâts en fonction de la défense
    {
        return (baseDamage - this.#defense / 2);
    }

    heal(number)
    // Récupère des PV suite à un sort de soins
    {
        if (this.currentHealth > 0) // Ne soigne pas les personnages morts
        {
            this.currentHealth += number;

            this.currentHealth = clamp(0, this.#maxHealth, this.currentHealth); // Clamp la vie entre 0 & maxHP
        }
    }

    addSkills(skillsArray)
    // Ajoute les sorts au joueur
    {
        this.skills = skillsArray;
    }

    useSkill_i(target, i)
    // Utilise le sort numéro i sur la cible
    {
        if (this.#bReady && this.currentHealth > 0) // Lance le sort uniquement si le joueur ne lance pas déjà un sort, et qu'il est en vie
        {
            this.#bReady = false;
            this.skills[i].useSkill(this, target);

            this.timedEvent = myGame.time.delayedCall(this.skills[i].castTime * 1000, this.finish, [], this);
        }
    }

    finish()
    {
        this.#bReady = true;
    }
}
