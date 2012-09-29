ig.module(
	'game.entities.blood'
)
.requires(
	'impact.entity',
	'game.entities.particle'
)
.defines(function(){

EntityBlood = ig.Entity.extend({
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 170, 66, 0.7)',
	
	size: {x: 50, y: 10},
	duration: 10,
	count: 200,
	
	durationTimer: null,
	nextEmit: null,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.durationTimer = new ig.Timer();
		this.nextEmit = new ig.Timer();

        this.durationTimer.set( this.duration );
		this.nextEmit.set( 0 );
	},	
	
	update: function(){
         this.pos.x = ig.game.player.pos.x;
         this.pos.y = ig.game.player.pos.y + 70;

		if( this.durationTimer.delta() < 0 && this.nextEmit.delta() >= 0 ) {
			this.nextEmit.set( this.duration / this.count );
			
			var x = Math.random().map( 0,1, this.pos.x, this.pos.x+this.size.x );
			var y = Math.random().map( 0,1, this.pos.y, this.pos.y+this.size.y );
			ig.game.spawnEntity( EntityDebrisParticle, x, y );
		}
	}
});



/*
The particles to spawn by the EntityBodyParts. See particle.js for more details.
*/

EntityDebrisParticle = EntityParticle.extend({
	lifetime: 10,
	fadetime: 1,
	bounciness: 0.5,
	vel: {x: 60, y: 20},
    friction: {x:40, y: 0},
	
	animSheet: new ig.AnimationSheet( 'media/effects/blood.png', 8, 8 ),
		
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 5, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] );		
		this.parent( x, y, settings );
	}
});

});