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
	lifeIndicatorPosition:{x:15,y:15},
	weaponIndicatorPosition:{x:675,y:10},
	scoreIndicatorPosition:{x:400,y:20},

	player:null,

	// Load images for the HUD
	hudHeartFull: new ig.Image('media/hud/heartFull.png'),
	hudHeartHalf: new ig.Image('media/hud/heartHalf.png'),
	weaponIndicatorBox: new ig.Image('media/hud/weaponBox.png'),
	itemSprite: new ig.Image('media/hud/itemSprite.png'),
	font: new ig.Font( 'media/fonts/helvetica_12_black.png' ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.player = ig.game.getEntityByName("zeek");
	},
	
	
	update: function() {
		this.pos.x = ig.game.screen.x;
		this.pos.y = ig.game.screen.y;
		this.parent();
	},

	drawHealth: function() {
		//Draw life hearts

		//Draw Whole Hearts
		var hearts = this.player.health/this.healthAmountPerContainer;
		var numWholeHearts = Math.floor(hearts);
		for(var i=0; i < numWholeHearts; i++) {
			this.hudHeartFull.draw(this.lifeIndicatorPosition.x+(this.hudHeartFull.width+10)*i,this.lifeIndicatorPosition.y);
		}

		//Draw a half heart if needed
		if(hearts % 1) {
			this.hudHeartHalf.draw(15+(this.hudHeartFull.width+10)*numWholeHearts,15);
		}
	},

	drawWeaponIndicators: function() {
		//Primary Weapon Indicator
		this.weaponIndicatorBox.draw(this.weaponIndicatorPosition.x,this.weaponIndicatorPosition.y);
		if(this.player.hasPitchfork) {
			this.itemSprite.drawTile(this.weaponIndicatorPosition.x,this.weaponIndicatorPosition.y,0,50);
		}
		this.font.draw( "x", this.weaponIndicatorPosition.x + 12, this.weaponIndicatorPosition.y + 1, ig.Font.ALIGN.RIGHT );
		
		//Secondary Weapon Indicator
		this.weaponIndicatorBox.draw(this.weaponIndicatorPosition.x + this.weaponIndicatorBox.width + 15,this.weaponIndicatorPosition.y);
		if(this.player.hasHorseshoe) {
			this.itemSprite.drawTile(this.weaponIndicatorPosition.x + this.weaponIndicatorBox.width + 15,this.weaponIndicatorPosition.y, 1, 50);
		}
		this.font.draw( "c", this.weaponIndicatorPosition.x + this.weaponIndicatorBox.width + 15 + 12, this.weaponIndicatorPosition.y + 1, ig.Font.ALIGN.RIGHT );
	},

	drawScore: function() {
		this.font.draw( 'Score: '+this.player.score, this.scoreIndicatorPosition.x, this.scoreIndicatorPosition.y, ig.Font.ALIGN.CENTER );
	},

	draw: function() {
		//Draw life hearts
		this.drawHealth();

		//Draw primary and secondary weapon boxes
		this.drawWeaponIndicators();

		//Draw score
		this.drawScore();


		this.parent();
	}
});

});