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

	// Load images for the HUD
	hudHeartFull: new ig.Image('media/hud/heartFull.png'),
	hudHeartHalf: new ig.Image('media/hud/heartHalf.png'),
	weaponIndicatorBox: new ig.Image('media/hud/weaponBox.png'),
	itemSprites: new ig.Image('media/hud/itemSprite.png'),
	
	
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
			this.hudHeartFull.draw(15+(this.hudHeartFull.width+10)*i,15);
		}

		//Draw a half heart if needed
		if(hearts % 1) {
			this.hudHeartHalf.draw(15+(this.hudHeartFull.width+10)*numWholeHearts,15);
		}
	},

	drawWeaponIndicators: function() {
		//Primary Weapon Indicator
		this.weaponIndicatorBox.draw(ig.system.width - this.weaponIndicatorBox.width*2 - 30,15);

		
		//Secondary Weapon Indicator
		this.weaponIndicatorBox.draw(ig.system.width - this.weaponIndicatorBox.width - 15,15);
	},

	draw: function() {
		//Draw life hearts
		this.drawHealth();

		//Draw primary and secondary weapon boxes
		this.drawWeaponIndicators();


		this.parent();
	}
});

});