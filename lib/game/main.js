ig.module( 
	'game.main' 
)
.requires(
	'impact.game',

	'game.entities.player',
	'game.levels.level1',
	'game.levels.simpleLevel',
	'game.plugins.random',
	'impact.debug.debug'
	'game.entities.hud'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 850,

	// Load images for the HUD
	hudHeartFull: new ig.Image('media/hud/heartFull.png'),
	hudHeartHalf: new ig.Image('media/hud/heartHalf.png'),


	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );

		// Initialize your game here; bind keys etc.
		//this.loadLevel(LevelLevel1);
		this.loadLevel(LevelSimpleLevel);

		this.spawnEntity(EntityHud, 0,0,{});


	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = 0;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
	}
});


// Start the Game with 60fps, a resolution of 800x600, scaled
// up by a factor of 1
ig.main( '#canvas', MyGame, 60, 800, 450, 1 );

});
