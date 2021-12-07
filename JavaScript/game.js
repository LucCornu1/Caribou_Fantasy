// Variables
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [wanderScene, combatScene, gameOver]
};




var game = new Phaser.Game(config);

var myGame;
var layer;
var player1, player2, player3;

player1 = new player(100, 5, 5, 0);
player2 = new player(100, 5, 5, 1);
player3 = new player(100, 5, 5, 2);

var player_combat;


var monsteronomicon = new bestiaire();


var fire_spit;
var fire_surge;

var fire_hoof;
var fire_horn;

var fire_bite;
var fire_claw;

var water_spike;
var water_splash;

var ice_spike;
var frost_spear;

var air_burst;
var healing;

generateMagic();

player1.addSkills([fire_spit, fire_surge]);
player2.addSkills([water_spike, water_splash]);
player3.addSkills([air_burst, healing]);

monsteronomicon.createMonster('fire_monsterBig', 200, 8, 2, fire_hoof, fire_horn);
monsteronomicon.createMonster('ice_monsterBig', 400, 3, 7, ice_spike, frost_spear);
monsteronomicon.createMonster('dog_monsterBig', 250, 5, 4, fire_bite, fire_claw);




// Functions
function generateFloor()
{
	// Load a map from a 2D array of tile indices
    /*var BaseMaps = [ // 18*32 * 45*32 / 18*45 = 810
      [  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15,  16,  17,  18 ],
      [  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37 ],
      [  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,  52,  53,  54,  55,  56 ],
      [  57,  58,  59,  60,  61,  62,  63,  64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75 ],
      [  76,  77,  78,  79,  80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,  91,  92,  93,  94 ],
      [  95,  96,  97,  98,  99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113 ],
      [ 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132 ],
      [ 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151 ],
      [ 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170 ],
      [ 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189 ],
      [ 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208 ]
    ]*/

	var level = [
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,  43,  65,  64,  65,  64,  65,  64,  65,  66,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,  24,  27,  26,  27,  26,  27,  26,  27,  28,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  62,  48,  60,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  15,  17,  18,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  73,  74,  75,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,  92,  93,  94,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[  3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3, 111, 112, 113,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3,   3 ],
    	[118, 119, 120, 118, 119, 120, 118, 119, 120, 118, 119, 130, 131, 132, 118, 119, 120, 118, 119, 120, 118, 119, 120, 118, 119 ],
    	[ 31,  31,  31,  31,  31,  31,  31 ,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31,  31]	
    ]

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    var map = myGame.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
    var tiles = map.addTilesetImage('map-tiles');
	layer = map.createLayer(0, tiles, 0, 0);
}

function generateControls()
{
	// Right
	myGame.input.keyboard.on('keydown-D', function (event) {

		if (!player1.bIsWalking)
		{
			var tile = layer.getTileAtWorldXY(player1.player_.x + 32, player1.player_.y, true);

			player1.direction = 'right';
	
			if (tile.index === 2 || (tile.index >= 118 && tile.index <= 120))
			{
				//  Blocked, we can't move
			}
			else
			{
				player1.bIsWalking = true;
				player1.currentPos = [player1.player_.x, player1.player_.y];
				player1.targetPos = [player1.player_.x + 32, player1.player_.y];
			}
		}
	});

	// Left
	myGame.input.keyboard.on('keydown-Q', function (event) {

		if (!player1.bIsWalking)
		{
			var tile = layer.getTileAtWorldXY(player1.player_.x - 32, player1.player_.y, true);

			player1.direction = 'left';

			if (tile.index === 2 || (tile.index >= 118 && tile.index <= 120))
			{
				//  Blocked, we can't move
			}
			else
			{
				player1.bIsWalking = true;
				player1.currentPos = [player1.player_.x, player1.player_.y];
				player1.targetPos = [player1.player_.x - 32, player1.player_.y];
			}
		}
	});

	// Up
	myGame.input.keyboard.on('keydown-Z', function (event) {

		if (!player1.bIsWalking)
		{
			var tile = layer.getTileAtWorldXY(player1.player_.x, player1.player_.y - 32, true);

			player1.direction = 'up';
	
			if (tile.index === 2 || (tile.index >= 118 && tile.index <= 120))
			{
				//  Blocked, we can't move
			}
			else
			{
				player1.bIsWalking = true;
				player1.currentPos = [player1.player_.x, player1.player_.y];
				player1.targetPos = [player1.player_.x, player1.player_.y - 32];
			}
		}
	});

	// Down
	myGame.input.keyboard.on('keydown-S', function (event){

		if (!player1.bIsWalking)
		{
			var tile = layer.getTileAtWorldXY(player1.player_.x, player1.player_.y + 32, true);

			player1.direction = 'down';
	
			if (tile.index === 31 || (tile.index >= 118 && tile.index <= 120))
			{
				//  Blocked, we can't move
			}
			else
			{
				player1.bIsWalking = true;
				player1.currentPos = [player1.player_.x, player1.player_.y];
				player1.targetPos = [player1.player_.x, player1.player_.y + 32];
			}
		}
	});

	// combat
	myGame.input.keyboard.on('keydown-E', function (event){

		// myGame.scene.start('combatScene');
	});
}

function generateCombatControls()
{
    // P1 Attack 1
	myGame.input.keyboard.on('keydown-W', function (event) {

		player_combat.playerArray[0].useSkill_i(player_combat.ennemiCreature, 0);
	});

    // P1 Attack 2
	myGame.input.keyboard.on('keydown-X', function (event) {

		player_combat.playerArray[0].useSkill_i(player_combat.ennemiCreature, 1);
	});

	// P2 Attack 1
	myGame.input.keyboard.on('keydown-C', function (event) {

		player_combat.playerArray[1].useSkill_i(player_combat.ennemiCreature, 0);
	});

    // P2 Attack 2
	myGame.input.keyboard.on('keydown-V', function (event) {

		player_combat.playerArray[1].useSkill_i(player_combat.ennemiCreature, 1);
	});

	// P3 Attack 1
	myGame.input.keyboard.on('keydown-B', function (event) {

		player_combat.playerArray[2].useSkill_i(player_combat.ennemiCreature, 0);
	});

    // P3 Attack 2
	myGame.input.keyboard.on('keydown-N', function (event) {

		player_combat.playerArray[2].useSkill_i(player_combat.playerArray, 1);
	});
}

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

function clampLoop(min, max, number)
{
    if (number < min)
    {
        number = max;
    }
    else if (number > max) {
        number = min
    }

    return number;
}

function generateMagic()
{
	fire_spit = new damageSkill('fire_spit', 5, 4, 'fire_spit');
	fire_surge = new damageSkill('fire_surge', 1.5, 2, 'fire_surge');

	fire_hoof = new damageSkill('fire_hoof', 5, 4, 'fire_spit');
	fire_horn = new damageSkill('fire_horn', 5, 4, 'fire_spit');

	fire_bite = new damageSkill('fire_bite', 5, 4, 'fire_spit');
	fire_claw = new damageSkill('fire_claw', 1.5, 2, 'fire_spit');

	water_spike = new damageSkill('water_spike', 5, 4, 'water_spike');
	water_splash = new damageSkill('water_splash', 1.5, 2, 'water_splash');

	ice_spike = new damageSkill('ice_spike', 5, 4, 'water_spike');
	frost_spear = new damageSkill('frost_spear', 5, 4, 'water_spike');

	air_burst = new damageSkill('air_burst', 1.5, 1.5, 'air_burst');
	healing = new healSkill('healing', 5, 5, 'healing');
}
