/*global ig:true*/

ig.module(
	'game.entities.elevator'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityElevator = ig.Entity.extend({
		
		// The item's (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 75, y:34},
		offset: {x: 6, y: 5},
		gravityFactor: 0,

		startingYPos:null,
		movingVel:75,
		maxRange:200,
		elevatorDelayCounter:0,
		elevatorDelayCounterThreshold:20,
		isOccupied:false,
		
		type: ig.Entity.TYPE.NONE,

		collides: ig.Entity.COLLIDES.FIXED,
		
		animSheet: new ig.AnimationSheet( 'media/objects/elevator.png', 87, 42 ),
		
		init: function( x, y, settings ) {
			
			this.parent( x, y, settings );

			this.startingYPos = y;
			this.maxVel.y = 100;
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
		
		},

		update: function() {
			if(this.isOccupied) {
				if(this.pos.y > this.startingYPos - this.maxRange) {
					this.vel.y = this.movingVel*-1;
				} else {
					this.vel.y = 0;
				}
				this.elevatorDelayCounter = 0;
			} else {
				if(this.elevatorDelayCounter >= this.elevatorDelayCounterThreshold) {
					if(this.pos.y < this.startingYPos) {
						this.vel.y = this.movingVel;
					} else {
						this.vel.y = 0;
					}
				} else {
					this.elevatorDelayCounter++;
				}
			}
			this.isOccupied = false;
			this.parent();
		},

		collideWith: function(other, axis) {
			if(other.type == ig.Entity.TYPE.A) {
				if(other.pos.y > this.pos.y) {
					other.receiveDamage( other.health, this );
					other.collides = ig.Entity.COLLIDES.NEVER;
				}
				if(axis == "y") {
					this.isOccupied = true;
				}
			}
			this.parent(other,axis);
		}

	});

});