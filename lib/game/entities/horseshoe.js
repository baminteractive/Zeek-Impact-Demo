ig.module(
	'game.entities.horseshoe'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHorseshoe = ig.Entity.extend({

	animSheeet: new ig.AnimationSheet( 'media/items/horseshoe.png'),

	size: {x: 20, y:20},
	speed: 100,

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [1], true );
		this.currentAnim = this.anims.idle;
		
		//Set Horsehoe to move at a constant speed w/ no velocity
		this.vel.x = this.speed;
	},

	update: function(){
		this.currentAnim.angle += .1;
	}

});

});