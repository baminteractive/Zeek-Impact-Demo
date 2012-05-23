ig.module(
	'game.entities.horseshoe-powerup'
	)
.requires(
    'game.entities.powerup'
)
.defines(function () {

    EntityHorseshoePowerup = EntityPowerup.extend({

    	size: { x: 20, y: 18 },
    
        animSheet: new ig.AnimationSheet('media/items/horseshoe.png', 20, 18),

        expiration: 30, // seconds

        init: function( x, y, settings ) {

            this.addAnim( 'idle', 1, [0] );

        	this.parent( x, y, settings );

        },

        update: function() {

        	this.currentAnim = this.anims.idle;

        	this.parent();

        },

    	check: function( other ) {

            // Only watch for collisions with the player
    		if(other instanceof EntityPlayer) {

                // Toggle the property of the player
    			other.hasHorseshoe = true;

                // Remove the horseshoe from the game on collision
    			this.kill();

    		}

    		this.parent( other );

    	}

    });

});