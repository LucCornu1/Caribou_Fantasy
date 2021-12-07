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

        this.load.image('back_image', 'assets/forest.png');
        this.load.image('fire_monsterBig', 'assets/Static/Side/FireHorse.png');
        this.load.image('ice_monsterBig', 'assets/Static/Side/Ice.png');
        this.load.image('dog_monsterBig', 'assets/Static/Side/Cerberus.png');
    }

    create ()
    {
        myGame = this;

        generateFloor();
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

    preload ()
    {
        this.load.spritesheet('fire_spit', 'assets/Fire_Effect/Explosion2_SpriteSheet.png', {frameWidth: 48, frameHeight: 48, endFrame: 17});
        this.load.spritesheet('fire_surge', 'assets/Fire_Effect/Explosion_SpriteSheet.png', {frameWidth: 64, frameHeight: 64, endFrame: 16}); // 64 * 64

        this.load.spritesheet('water_spike', 'assets/Water_Effect/WaterSpike01.png', {frameWidth: 64, frameHeight: 80, endFrame: 19});
        this.load.spritesheet('water_splash', 'assets/Water_Effect/WaterSplash02.png', {frameWidth: 66, frameHeight: 77, endFrame: 19});

        this.load.spritesheet('air_burst', 'assets/Wind_Effect/Air_Explosion.png', {frameWidth: 32, frameHeight: 32, endFrame: 19});
    }

    create ()
    {
        myGame = this;
        
        this.generateFX();
        this.initCombat();

        generateCombatControls();

        player_combat.beginPlay();
    }

    update ()
    {
        player_combat.play();
    }


    // added
    initCombat()
    {
        this.add.image(200, 100, 'back_image').setScale(1.3);

        player_combat = new combat([player1, player2, player3], this.prepareFigthers());
    }

    prepareFigthers()
    {
        var i = Phaser.Math.Between(0, monsteronomicon.getMaxId());

        return monsteronomicon.selectMonster(i);
    }

    generateFX()
    {
        myGame.anims.create({
            key: 'fire_surge',
            frames: myGame.anims.generateFrameNumbers('fire_surge', { start: 0, end: 16 }),
            frameRate: 16
            // DestroyOnComplete: true
        });

        myGame.anims.create({
            key: 'fire_spit',
            frames: myGame.anims.generateFrameNumbers('fire_spit', { start: 0, end: 17 }),
            frameRate: 16
            // DestroyOnComplete: true
        });

        myGame.anims.create({
            key: 'water_spike',
            frames: myGame.anims.generateFrameNumbers('water_spike', { start: 0, end: 19 }),
            frameRate: 16
            // DestroyOnComplete: true
        });

        myGame.anims.create({
            key: 'water_splash',
            frames: myGame.anims.generateFrameNumbers('water_splash', { start: 0, end: 19 }),
            frameRate: 16
            // DestroyOnComplete: true
        });

        myGame.anims.create({
            key: 'air_burst',
            frames: myGame.anims.generateFrameNumbers('air_burst', { start: 0, end: 11 }),
            frameRate: 16
            // DestroyOnComplete: true
        });
    }
}
