/*global ig:true, EntityHorseshoe:true, EntityPowerup:true*/

ig.module(
	'game.entities.powerup'
	)
.requires(
    'impact.entity',
    'impact.timer'
)
.defines(function () {

    EntityPowerup = ig.Entity.extend({

        type: ig.Entity.TYPE.B,

        checkAgainst: ig.Entity.TYPE.A, // Only collide against players
        
        collides: ig.Entity.COLLIDES.PASSIVE, // Do not cause a "bouncy" collision

        expirationTimer: null,

        expiration: 20,

        init: function (x, y, settings) {

            this.expirationTimer = new ig.Timer(this.expiration);

            this.zIndex = Math.floor(this.pos.y + this.size.y);

            this.parent(x, y, settings);
        },

        update: function() {

            // Remove the powerup after a certain period of time
            if(this.expirationTimer.delta() > 0) {

                this.kill();

            }
            
            this.parent();
        }

    });

});