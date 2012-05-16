package com.amish.enemies {
	import com.adamatomic.flixel.data.FlxAnim;
	import com.adamatomic.flixel.FlxArray;
	import com.adamatomic.flixel.FlxG;
	import com.adamatomic.flixel.FlxSprite;
	import com.adamatomic.flixel.FlxSpriteSheet;
	
	public class Grunt extends FlxSpriteSheet{
		
		[Embed (source = '../../../../lib/GruntSheet.png')] private var ImgEnemy:Class;
		
		private var _move_speed:int = 400;
        private var _max_health:int = 10;
        private var _hurt_counter:Number = 0;
		private var _can_move:Boolean = true;
		private var _last_move:Number = 0;
        private var _can_jump:Boolean = true;
        private var _last_jump:Number = 0;
		private var _can_lunge:Boolean = true;
		private var _last_lunge:Number = 2;
        private var _player:FlxSprite;
		
		public function Grunt( X:Number, Y:Number, ThePlayer:FlxSprite ) {
			super( ImgEnemy, X, Y, true, true, 115, 115 );
			
            _player = ThePlayer;
			
			health = 1;
			
			// Max speeds
            maxVelocity.x = 30;
            maxVelocity.y = 200;
			
             //Gravity
            acceleration.y = 1200;
            //Friction
            drag.x = 300;
			
			//Bounding box tweaks
            width = 75;
            height = 64;
            offset.x = 10;
            offset.y = 40;
            addAnimation("normal", [8,9,10,11], 10);
            //addAnimation("jump", [2]);
            addAnimation("attack", [14,15,16],10);
			addAnimation("stopped", [0]);
            //addAnimation("hurt", [2,7],10);
            //addAnimation("dead", [7, 7, 7], 5);
			
			addAnimationCallback(animCallBack);
			
		}
		
		private function animCallBack( anim:String, frameNumber:uint, frameIndex:uint):void {
			
			switch(anim) {
				case "normal":
					//_last_move = 2;
					break;
			}
			
		}
		
		override public function update():void {
			if( dead ){
                if(finished) exists = false;
                else
                    super.update();
                return;
            }
			
            if ( _hurt_counter > 0 ) {
                _hurt_counter -= FlxG.elapsed*3;
            }
			
			if ( _player.x < x && _player.x > x - 100 && _player.dead == false ) {
				facing = false;
                play("attack");
				
				if (_last_lunge > 0) {
					_last_lunge -= FlxG.elapsed;
				} else {
					var lungeDelay:Number = Math.random() * 2;;
					_last_lunge = lungeDelay;
					
					x = _player.x + 30;
					
					//lunge();
				}
				
			} else if (_player.x > x && _player.x < x + 100 && _player.dead == false) {
				facing = true;
				play("attack");
            } else {
				if ( facing == true && _can_move == true ) velocity.x += _move_speed * FlxG.elapsed;
				else if( _can_move == true ) velocity.x -= _move_speed * FlxG.elapsed;	
				
				if (_last_move > 0) {
					_last_move -= FlxG.elapsed;
				} else {
					var moveDelay:Number = Math.random() * 3;
					_last_move = moveDelay;
					_can_move = moveToggle();
					
				}
				
				if (_hurt_counter > 0) {
					play("hurt");
				} else {
					
					if (velocity.y != 0) {
						play("jump");
					} else {
						if (velocity.x == 0) {
							play("stopped");
						} else {
						   play("normal");
						}
					}
				}
			}
			
            super.update();
		}
		
		private function lunge():void {
			trace(":: Lunge ::")
		}
		
		private function moveToggle():Boolean {
			if (_can_move == true) _can_move = false;
			else _can_move = true;
			
			return _can_move;
		}
		
		override public function hitWall():Boolean {
			if (facing == true) facing = false;
			else facing = true;
			return super.hitWall();
		}
		
		override public function hitFloor():Boolean {
            _can_jump = true;
            return super.hitFloor();
        }
		
		override public function hurt(Damage:Number):void {
            _hurt_counter = 1;
            return super.hurt(Damage);
        }
		
		override public function kill():void {
            if (dead)
                return;
            FlxG.score += 10;
            super.kill();
        }
		
		public function reset(X:Number, Y:Number):void {
            x = X;
            y = Y;
            dead = false;
            exists = true;
            visible = true;
            play("normal");
        }
	}

}