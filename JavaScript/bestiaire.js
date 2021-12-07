class bestiaire
// Un bestiaire qui stock les monstres
{
// public
    monstersArray = [];
    constructor(monsters = [])
    {
        this.monstersArray = monsters;
    }

    createMonster(name, health, attack, defense, skill0, skill1)
    // Créer un monstre et le stock
    {
        var newCreature = new creature(name, health, attack, defense);

        newCreature.addSkills([skill0, skill1]);

        this.monstersArray.push(newCreature);
    }

    deleteMonster(name)
    // Supprime un monstre de la liste
    {
        this.monstersArray.forEach(creature => {
            if (creature.creatureName == name)
            {
                this.monstersArray.splice(this.monstersArray.indexOf(creature), 1);
            }
        });     
    }

    selectMonster(id)
    // Sélectionne un monstre selon un ID
    {
        return this.monstersArray[id];
    }

    selectMonsterByName(name)
    // Sélectionne un monstre selon un nom
    {
        this.monstersArray.forEach(creature => {
            if (creature.creatureName == name)
            {
                return creature;
            }
        });
    }

    getMaxId()
    // Retourne l'ID maximale de la liste de bestiaire
    {
        return this.monstersArray.length - 1;
    }
}
