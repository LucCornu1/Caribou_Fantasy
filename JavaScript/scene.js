class wanderScene extends Phaser.Scene
{
    constructor()
    {
        super('wanderScene');
    }

    preload()
    {
        this.load.image('map-tiles', 'assets/tilemaps/Serene_Village_32x32.png');
        this.load.spritesheet('hero', 'assets/characters/Character_1.png', { frameWidth: 24, frameHeight: 32 });

        /*this.load.spritesheet('fire_monster', 'assets/characters/Fire_Elemental_Sprite_Sheet.png', { frameWidth: 32, frameHeight: 32 }); // 32 * 32
        this.load.spritesheet('ice_monster', 'assets/characters/Ice_Elemental_Sprite_Sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('leaf_monster', 'assets/characters/Leaf_Elemental_Sprite_Sheet.png', { frameWidth: 32, frameHeight: 32 });*/

        this.load.spritesheet('fire_spit', 'assets/Fire_Effect/Explosion2_SpriteSheet.png', {frameWidth: 48, frameHeight: 48, endFrame: 17});
        this.load.spritesheet('fire_surge', 'assets/Fire_Effect/Explosion_SpriteSheet.png', {frameWidth: 64, frameHeight: 64, endFrame: 16}); // 64 * 64

        this.load.image('back_image', 'assets/forest.png');
        this.load.image('fire_monsterBig', 'assets/Static/Side/FireHorse.png');
    }

    create ()
    {
        myGame = this;

        generateFloor();

        player1 = new player();
        player1.beginPlay();

        generateControls();
    }

    update ()
    {
        player1.play();
    }
}


class combatScene extends Phaser.Scene
{
    constructor()
    {
        super('combatScene');
    }

    create ()
    {
        myGame = this;

        this.initCombat();

        generateFX();

        generateCombatControls();

        this.debug = this.add.graphics();
    }

    update ()
    {
        player_combat.play();

        this.debug.clear();

        // const size = 100;

        this.debug.fillStyle(0x2d2d2d);
        this.debug.fillRect(64, 64, player_combat.ennemiCreature.maxHealth * 2, 16);

        this.debug.fillStyle(0x2dff2d);
        this.debug.fillRect(64, 64, player_combat.ennemiCreature.currentHealth * 2, 16);
    }


    // added
    initCombat()
    {
        /*var ice_spit = new damageSkill('ice_spit', 1.5, 5);
        var frost = new damageSkill('frost', 2, 15);

        var water_spit = new damageSkill('water_spit', 1.2, 2);
        var heal = new healSkill('heal', 1.5, 8);*/

        this.add.image(200, 100, 'back_image').setScale(1.3);

        var fire_creature = new creature('fire_monsterBig', 52, 8, 2);

        var fire_spit = new damageSkill('fire_spit', 1.8, 10, 'fire_spit');
        var fire_surge = new damageSkill('fire_surge', 1.2, 4, 'fire_surge');

        
        fire_creature.addSkills([fire_spit, fire_surge]);

        player1.addSkills([fire_spit, fire_surge]);

        player_combat = new combat(player1, fire_creature);
        
        /*var ice_creature = new creature('ice_monster', 58, 4, 6, ice_spit, frost);
        var leaf_creature = new creature('leaf_monster', 62, 5, 5, water_spit, heal);*/
    }
}
