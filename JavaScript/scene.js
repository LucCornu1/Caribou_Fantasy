class wanderScene extends Phaser.Scene // Scène principale en TopDown
{
    constructor()
    {
        super('wanderScene');
    }

    preload()
    // Prépare les assets utilisé dans le jeu
    {
        this.load.image('map-tiles', 'assets/tilemaps/Serene_Village_32x32.png');
        this.load.spritesheet('hero', 'assets/characters/Character_1.png', { frameWidth: 24, frameHeight: 32 });

        this.load.image('back_image', 'assets/forest.png');
        this.load.image('fire_monsterBig', 'assets/Static/Side/FireHorse.png');
        this.load.image('ice_monsterBig', 'assets/Static/Side/Ice.png');
        this.load.image('dog_monsterBig', 'assets/Static/Side/Cerberus.png');

        this.load.image('GameOver', 'assets/GameOver.jpg');

        this.load.spritesheet('fire_spit', 'assets/Fire_Effect/Explosion2_SpriteSheet.png', {frameWidth: 48, frameHeight: 48, endFrame: 17});
        this.load.spritesheet('fire_surge', 'assets/Fire_Effect/Explosion_SpriteSheet.png', {frameWidth: 64, frameHeight: 64, endFrame: 16}); // 64 * 64

        this.load.spritesheet('water_spike', 'assets/Water_Effect/WaterSpike01.png', {frameWidth: 64, frameHeight: 80, endFrame: 19});
        this.load.spritesheet('water_splash', 'assets/Water_Effect/WaterSplash02.png', {frameWidth: 66, frameHeight: 77, endFrame: 19});

        this.load.spritesheet('air_burst', 'assets/Wind_Effect/Air_Explosion.png', {frameWidth: 32, frameHeight: 32, endFrame: 19});

        this.load.audio('wanderSound', ['audio/04forest1.ogg']);
        this.load.audio('gameOver', ['audio/13gameover1V1NL.ogg']);
    }

    create ()
    {
        myGame = this;

        generateFloor();
        player1.beginPlayWander();

        generateControls();
    }

    update ()
    {
        player1.play();

        if (nb_Victories >= 3)
        {
            // console.log("GG");
        }
    }
}


class combatScene extends Phaser.Scene // Scène de combat
{
    constructor()
    {
        super('combatScene');
    }

    create ()
    {
        myGame = this;
        
        this.generateFX();
        this.initCombat();

        generateCombatControls();

        player_combat.beginPlay();

        Music = myGame.sound.add('wanderSound', {volume: 0.3}); // On ajoute de la musique pour le combat
        Music.loop = true;
        Music.play();
    }

    update ()
    {
        player_combat.play();
    }


    initCombat()
    // Prépare le combat & le décore
    {
        myGame.add.image(200, 100, 'back_image').setScale(1.3);

        player_combat = new combat([player1, player2, player3], this.prepareMonster());
    }

    prepareMonster()
    // Sélectionne un monstre encore disponible, c'est à dire un monstre qui n'a pas été vaincu
    {
        var i = Phaser.Math.Between(0, monsteronomicon.getMaxId());

        while (monsteronomicon.selectMonster(i).currentHealth <= 0)
        {
            i = Phaser.Math.Between(0, monsteronomicon.getMaxId());
        }

        return monsteronomicon.selectMonster(i);
    }

    generateFX()
    // Génère les animations pour les sorts
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


class gameOver extends Phaser.Scene // Scène de GameOver
{
    constructor()
    {
        super('gameOver');
    }

    create ()
    {
        myGame = this;
        
        myGame.input.keyboard.on('keydown-A', function (event){ // Le joueur peut relancer plus tôt s'il désire

            this.reloadGame();
        });
        myGame.input.keyboard.on('keydown-R', function (event){ // Le joueur peut relancer plus tôt s'il désire

            this.reloadGame();
        });

        myGame.add.image(150, 100, 'GameOver').setOrigin(0, 0); // Ajoute l'image de fond pour le combat

        Music = myGame.sound.add('gameOver', {volume: 0.3});
        Music.loop = false;
        Music.play();

        myGame.time.delayedCall(5000, this.reloadGame, [], this); // Au bout de 5 secondes, relance le jeu
    }

    update ()
    {
        // None
    }

    reloadGame()
    // Relance le jeu
    {
        location.reload();
    }
    
}