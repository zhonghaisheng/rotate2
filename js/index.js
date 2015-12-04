define(function(require, exports) {
	//抽奖程序
	var prize = function(){
		var currentCount = 0,num = 3;
		var lottery={
			index:-1,	//当前转动到哪个位置，起点位置
			count:0,	//总共有多少个位置
			timer:0,	//setTimeout的ID，用clearTimeout清除
			speed:20,	//初始转动速度
			times:0,	//转动次数
			cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
			prize:-1,	//中奖位置
			init:function(id){
				if ($("#"+id).find(".lottery-unit").length>0) {
					$lottery = $("#"+id);
					$units = $lottery.find(".lottery-unit");
					this.obj = $lottery;
					this.count = $units.length;
					$lottery.find(".lottery-unit-"+this.index).addClass("active");
				};
			},
			roll:function(){
				var index = this.index;
				var count = this.count;
				var lottery = this.obj;
				$(lottery).find(".lottery-unit-"+index).removeClass("active");
				index += 1;
				if (index>count-1) {
					index = 0;
				};
				$(lottery).find(".lottery-unit-"+index).addClass("active");
				this.index=index;
				if(this.index == this.prize){
					currentCount++;
					if(currentCount == 2){
						num--;
						alert("恭喜你获得"+$('#lottery .lottery-unit-'+this.prize+' .item_text').text());
						currentCount = 0;
						$('#lottery table .tip_text').text('剩余抽奖券：'+num+'张');
						if(num == 0){
							$('#lottery table .tip_text').text('抽奖机会已用完');
						}
					}
				}
				return false;
			},
			stop:function(index){
				this.prize=index;
				return false;
			}
		};

		function roll(){
			lottery.times += 1;
			lottery.roll();
			if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
				clearTimeout(lottery.timer);
				lottery.prize=-1;
				lottery.times=0;
				click=false;
			}else{
				if (lottery.times<lottery.cycle) {
					lottery.speed -= 10;
				}else if(lottery.times==lottery.cycle) {
					//console.log(s_index);
					lottery.prize = s_index;//设置中奖位置		
				}else{
					if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
						lottery.speed += 110;
					}else{
						lottery.speed += 20;
					}
				}
				if (lottery.speed<40) {
					lottery.speed=40;
				};
				//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
				lottery.timer = setTimeout(roll,lottery.speed);
			}
			return false;
		}

		var click=false;
		var s_index = 0;
		window.onload=function(){
			lottery.init('lottery');
			$("#lottery a").click(function(){
				if(num == 0){
					alert('抽奖机会已用完');
					return;
				}
				if (click) {
					return false;
				}else{
					lottery.speed=100;
					s_index = Math.random()*(lottery.count)|0;//设置抽中奖品下标
					roll();
					click=true;
					return false;
				}
			});
		};
	}
	
	exports.init = function() {
		prize();
	}
})