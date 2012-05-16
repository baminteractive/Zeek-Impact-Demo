ig.module( 
	'game.main' 
)
.requires(
	'impact.game',

	'game.entities.player',
	'game.levels.level1',
	'game.levels.simpleLevel',
	'game.entities.hud',
	'game.plugins.random',
	
	'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 850,

	init: function() {

		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.Z, 'jump' );
		ig.input.bind( ig.KEY.X, 'melee' );
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

			if(player.pos.x - ig.system.width/2 < 0) {

				this.screen.x = 0;

			} else if(player.pos.x - ig.system.width/2 > ig.game.collisionMap.width*ig.game.collisionMap.tilesize - ig.system.width) {

				this.screen.x = ig.game.collisionMap.width*ig.game.collisionMap.tilesize - ig.system.width;

			} else {

				this.screen.x = player.pos.x - ig.system.width/2;

			}

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
