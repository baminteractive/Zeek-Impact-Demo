ig.module(
	'game.entities.hay-bale'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityHayBale = ig.Entity.extend({
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 81, y:37},
		offset: {x: 3, y: 3},
		gravityFactor: 0,
		
		type: ig.Entity.TYPE.NONE,

		collides: ig.Entity.COLLIDES.FIXED,
		
		animSheet: new ig.AnimationSheet( 'media/objects/haybale.png', 87, 42 ),	
		
		init: function( x, y, settings ) {
			
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
		
		}

	});

});