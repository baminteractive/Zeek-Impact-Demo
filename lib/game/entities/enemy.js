ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity',
	'game.plugins.random'
)
.defines(function(){

	EntityEnemy = ig.Entity.extend({
		
		size: {x: 75, y:64},
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		offset: {x: 10, y: 40},
		health: 10,

		// Movement
		speed: {x:80, y:0},
		maxVel: {x: 200, y: 0},
		friction: {x: 300, y: 0},
		
		// Collisions
		type: ig.Entity.TYPE.B, // Enemy Group
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		// Animation Sheet
		animSheet: new ig.AnimationSheet( 'media/enemies/GruntSheet.png', 115, 115 ),	
		
		random:null,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Enemy
		flip: false,
		_canMove: true, // Can the enemy move yet?

		idleTimer: new ig.Timer(),
		idleOnPatrol: true, // Should the entity go idle while patrolling?

		// Patrolling variables
		patrolRadius: 120, // radius a character should patrol from a given spot

		idleRange: {
			min:1,
			max:3
		}, // Idle time in seconds

		spawnPoint: {
			x: 0,
			y: 0
		},

		init: function( x, y, settings ) {

			// console.log('init');

			this.random = new ig.Random();

			this.parent( x, y, settings );
			
			// Set spawn point
			this.spawnPoint = this.pos;

			// Set enemy off in direction
			this.vel.x = this.accel.x * -1;

			// Add the animations
			this.addAnim( 'walk', .14, [5,6,7,8,9] );
			this.addAnim( 'attack', .05, [14,15,16] );
			this.addAnim( 'idle', 1, [0] ); // Only update once per frame since it's idle

			// Set a default for the patrol radius
			this._currentPatrolRadius = this.random.range(this.patrolRadius.min, this.patrolRadius.max);

		},

		idleMe: function() {

			// Generate a random amount of time to pause
			var pause = this.random.range(this.idleRange.min,this.idleRange.max); // Pause up to 4 seconds

			// Stop ebtity from moving
			this.vel.x = 0;

			// Entity cannot move
			this._canMove = false;

			// Set the timer to pause
			this.idleTimer.set(pause);

		},

		// Checks to see if a user is within in the patrol radius and should idle
		patrolCheck: function() {

			// Using the absolute value since distance may be negative
			if( Math.floor(Math.abs(this.pos.x - this.spawnPoint.x)) > this._currentPatrolRadius && this._canMove) {

				// Switch direction
				this.flip = !this.flip;

				// If pausing is enabled then try to idle
				if( this.idleOnPatrol && this.idleTimer.delta() > 0 ) {

					this.idleMe();

				}

			}

			// If idle is enabled and the timer is up the entity can move
			if(this.idleOnPatrol && this.idleTimer.delta() > 0) {

				this._canMove = true;

			}

		},

		update: function() {

			// Check partolling radius
			this.patrolCheck();

			// Move the entity if they can
			if( this._canMove ){

				// Swap the x direction based
				var xDir = this.flip ? -1 : 1;
				this.vel.x = this.speed.x * xDir;

				// Flip animation sheet based on direction
				this.currentAnim.flip.x = this.flip;

			}

			// Determine walk cycle based on speed
			if( this.vel.x !== 0 ) {

				this.currentAnim = this.anims.walk;

			} else {

				this.currentAnim = this.anims.idle;

			}
			
			// move!
			this.parent();
		},

		handleMovementTrace: function(res){

			this.parent(res);

			// collision with a wall? return!
			if( res.collision.x ) {
				this.flip = !this.flip;
			}

		},

		collideWith: function( other, axis ) {

			// Check for collisions with FIXED entities on the 'x' axi
			if(other.collides === ig.Entity.COLLIDES.FIXED && axis === 'x') {
				this.flip = !this.flip
			}

			if(other instanceof EntityPlayer) {

				// Kill entity if you jump on its head
				if( axis == 'y' ) {

		            this.kill();

            		other.score += 1000;

        		} else {

        			// Entity damages player if touching
		 			other.receiveDamage( 5, this );

		 			// Bounce back
		            if ( other.pos.x > this.pos.x ) {

		                // Player on the right -> move back right
		                other.vel.x = 200; 

		            } else {

		                // Player on the left -> move back left
		                other.vel.x = -200; 

		            }


        		}

			}

            this.parent( other, axis );

		}

	});

});