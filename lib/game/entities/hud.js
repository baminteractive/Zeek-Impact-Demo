ig.module(
	'game.entities.hud'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHud = ig.Entity.extend({
	
	
	size: {x:800,y:450},
	gravityFactor: 0,
	healthAmountPerContainer: 10,
	collides: ig.Entity.COLLIDES.NEVER,	
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	
	
	update: function() {
		this.pos.x = ig.game.screen.x;
		this.pos.y = ig.game.screen.y;
		this.parent();
	},

	drawHealth: function() {
		//Draw life hearts

		//Draw Whole Hearts
		var player = ig.game.getEntityByName("zeek");
		var hearts = player.health/this.healthAmountPerContainer;
		var numWholeHearts = Math.floor(hearts);
		for(var i=0; i < numWholeHearts; i++) {
			ig.game.hudHeartFull.draw(15+(ig.game.hudHeartFull.width+10)*i,15);
		}

		//Draw a half heart if needed
		if(hearts % 1) {
			ig.game.hudHeartHalf.draw(15+(ig.game.hudHeartFull.width+10)*numWholeHearts,15);
		}
	},

	draw: function() {
		//Draw life hearts
		this.drawHealth();

		//Draw primary and secondary weapon boxes



		this.parent();
	}
});

});