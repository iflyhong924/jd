// JavaScript Document


var hxsd_tools={
	//居中显示弹框
	"popShow":function (elm){
		elm.style.display="block";
		var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
		var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
		elm.style.left=l+'px';
		elm.style.top=t+'px';
	},
	
	
	//拖拽组建
	"drag":function(box,title){
		//当我传入1个参数box，拖拽box
		//当我传入2个参数，拖拽就在title
		var handle;
		title?handle=title:handle=box;
	//----------------------------------------
	//点击事件 title
		handle.onmousedown=function(ev){//按下时机  记录下鼠标的错位位置
			var oEv=ev || window.event;
			var disX=oEv.clientX-box.offsetLeft;//left方向
			var disY=oEv.clientY-box.offsetTop;// top 方向
		
			//鼠标移动的对象应该是document
			document.onmousemove=function(ev){//移动拖拽
				var oEv=ev || window.event;
				var l=oEv.clientX-disX;
				var t=oEv.clientY-disY;
				
				//判断屏幕范围
				if(l<0)l=0;
				if(t<0)t=0;
				if(l>document.documentElement.clientWidth-box.offsetWidth)l=document.documentElement.clientWidth-box.offsetWidth;
				if(t>document.documentElement.clientHeight-box.offsetHeight)t=document.documentElement.clientHeight-box.offsetHeight;
				
				//最后赋值
				box.style.left=l+'px';
				box.style.top=t+'px';
			};
			
			//释放鼠标move事件
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null;
				if(box.releaseCapture)	box.releaseCapture();//取消获捕
			}
			if(box.setCapture)	box.setCapture();//设置捕获
			return false;
		};
	},
	
	//获取样式表数据
	"getStyle":function (obj, name){
		var value=obj.currentStyle ? obj.currentStyle[name]:getComputedStyle(obj, false)[name];
		if(name=='opacity'){
			value=Math.round(parseFloat(value)*100);
		}
		else{
			value=parseInt(value);
		}
		return value;
	},
	
	//运动框架
	"hxsd_move":function (obj,moveMode,end,stopTime){
		//确定起点
		var start=hxsd_tools.getStyle(obj, moveMode);
		//确定距离 终点 end -start
		var dis=end-start;    //distance
		
		//时间分份
		var count=parseInt(stopTime/30);
		
		var n=0;//计数器
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			
			var a=1-n/count;//减速运动
			
			//步进长度  起点+ 距离/份数*n；
			var step_dis=start+dis*(1-a*a*a);
			
			if(moveMode=="opacity"){//判断透明度
				obj.style.opacity=step_dis/100;
				obj.style.filter='alpha(opacity:'+step_dis+')';  //ie
			
			}else{
				obj.style[moveMode]=step_dis+'px';
			
			}
			
			if(n==count){
				clearInterval(obj.timer);
			}	
		},30)
	},
	
	
	//----------------------------------------------------
	"subNav":function(id){
		var subNav=document.getElementById(id);
		var subNavLi=subNav.getElementsByTagName('li');
		
		for(var i=0; i<subNavLi.length; i++){
			subNavLi[i].onmouseover=function(){
				var subMenu=this.getElementsByTagName('div')[0];
				if(subMenu){
					subMenu.style.display="block";
				};
			};
			
			subNavLi[i].onmouseout=function(){
				var subMenu=this.getElementsByTagName('div')[0];
				if(subMenu){
					subMenu.style.display="none";//隐藏子菜单
				}
			};
		};
	},
	"TabControlA":function (id){
	var oBox=document.getElementById(id);
	var aBtn=oBox.getElementsByTagName('li');
	var aDiv=oBox.getElementsByTagName('span');
	
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function()
		{
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className='';	
				aDiv[i].className='';
			};		
			this.className='active';
			aDiv[this.index].className='show';
		};	
	};
	
	
	},
	"TabControlB":function (id){
	var oBox=document.getElementById(id);
	var aBtn=oBox.getElementsByTagName('li');
	var aDiv=oBox.getElementsByTagName('span');
	
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onmouseover=function()
		{
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className='';	
				aDiv[i].className='';
			};		
			this.className='active';
			aDiv[this.index].className='show';
		};	
	};
	
	
	},
	
	
	"zoom":function(id,ida){
		var smallBox=document.getElementById(id);
		var bigBox=document.getElementById(ida);
		var bigImg=bigBox.getElementsByTagName('img')[0];
		var oSpan=smallBox.getElementsByTagName('p')[0];
		
		
		document.onmousemove=function(ev){
			var oEv=ev||window.event;
			var l=oEv.clientX-400-smallBox.offsetLeft-oSpan.offsetWidth/2;	
			var t=oEv.clientY-400-smallBox.offsetTop-oSpan.offsetHeight/2;
			if(l<0)l=0;
			if(t<0)t=0;
			if(l>smallBox.offsetWidth-oSpan.offsetWidth)l=smallBox.offsetWidth-oSpan.offsetWidth;
			if(t>smallBox.offsetHeight-oSpan.offsetHeight)t=smallBox.offsetHeight-oSpan.offsetHeight;
			var h_l=smallBox.offsetWidth-oSpan.offsetWidth;
			var rate_l=l/h_l;
			var p_h=bigImg.offsetWidth-bigBox.offsetWidth;
			bigImg.style.left=-p_h *  rate_l +"px";
			
			var h_t=smallBox.offsetHeight-oSpan.offsetHeight;
			var rate_t=t/h_t;
			var p_h=bigImg.offsetHeight-bigBox.offsetHeight;
			bigImg.style.top=-p_h *  rate_t +"px";
			
			oSpan.style.left=l+'px';
			oSpan.style.top=t+'px';
		};
		smallBox.onmouseout=function(){
			oSpan.style.display="none";
			bigImg.style.display="none";
		};
		
		smallBox.onmousemove=function(){
			bigImg.style.display="block";
			oSpan.style.display="block";
			
		};
		
	},

	
	

};




