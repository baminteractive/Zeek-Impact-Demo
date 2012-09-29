/*global ig:true, MyGame:true, LevelMain:true, EntityHud:true*/

ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.sound',

	'game.entities.player',
	'game.levels.main',
	'game.levels.final',
	'game.entities.hud',
	'game.plugins.random',
	
	'impact.debug.debug'
)
.defines(function(){

	MyGame = ig.Game.extend({

	gravity: 850,

	player: null,

	// Create this sound here so that Impact automatically loads it
	level_music: new ig.Sound( "media/sounds/chip_loop2.*", false),

	update: function() {

		// Move the screen to follow the player
		this.moveCamera();

		// Update all entities and backgroundMaps
		this.parent();

	},

	// The function centers the current player on the screen
	// once it has passed half the screen's width of the beginning of the level
	// and is not within half the screen's width of the end of the level
	// This locks the beginning and end of the level, so you cannot view beyond the
	// beginning/end of the level.
	moveCamera: function() {
		
		if( this.player ) {

			var levelWidth = ig.game.collisionMap.width * ig.game.collisionMap.tilesize;

			// If the player is on the far left side of the screen
			if(this.player.pos.x - ig.system.width/2 < 0) {

				this.screen.x = 0;

			} else if( (this.player.pos.x - ig.system.width/2) > (levelWidth - ig.system.width) ) {

				this.screen.x = levelWidth - ig.system.width;

			} else {

				this.screen.x = this.player.pos.x - ig.system.width/2;

			}

			this.screen.y = 0;

		}

	},

	init: function() {

		// Initialize your game here; bind keys etc.

		// Bind the keys that will be used during the game
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.Z, 'jump' );
		ig.input.bind( ig.KEY.X, 'melee' );
		ig.input.bind( ig.KEY.C, 'shoot' );

		this.loadLevel(LevelMain);

		this.spawnEntity(EntityHud, 0,0,{});

		// Add looping background music
		ig.music.add( this.level_music, 'level_music' );
        ig.music.loop = true;

        this.level_music.play();

        // Find and save an instance of the player so we can
        // refer to it later

        // Grab an instance of the first player Entity
        this.player = this.getEntitiesByType( EntityPlayer )[0];

	}

});


// Start the Game with 60fps, a resolution of 800x600,
// scaled up by a factor of 1
ig.main( '#canvas', MyGame, 60, 800, 450, 1 );

});
