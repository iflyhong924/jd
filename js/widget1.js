// JavaScript Document

var hxsd_widget={
	//modal模态组件
"modal_layer":function (){
	var modal=document.createElement('div');
	modal.id="black_modal";
	modal.className="modal";
	document.body.appendChild(modal);
},


//错误提示组件
"popBox_error":function (text,delayTime){
	var t=delayTime || 2000;
	var errDiv=document.createElement('div');
	var timer=null;
	errDiv.className="popBox_error";
	errDiv.innerHTML=text;
	document.body.appendChild(errDiv);
	hxsd_tools.popShow(errDiv);
	
	function delay_del(){
		document.body.removeChild(errDiv);	
	};
	timer=setTimeout(function(){
		delay_del();
	},t);
	errDiv.onmouseover=function(){
		clearTimeout(timer);
	};
	errDiv.onmouseout=function(){
		delay_del()
	}
},

//登录框
"logon_box":function (){
	//创建模态层
	hxsd_widget.modal_layer();
	var modal=document.getElementById('black_modal');
	
	//创建弹框
	var oDiv=document.createElement('div');
	oDiv.id="logon_box";
	oDiv.className="popBox popBox_logon";
	
	var html='<h4>用户登录</h4>'+
	'<a id="closeBtn" href="javascript:;">×</a>'+
	'<p><label>用户名：<input type="text"></label></p>'+
	'<p><label>密　码：<input type="password"></label></p>'+
	'<p><button class="logonBtn" type="button">登录</button></p>';
	
	//oDiv内部插入其他元素
	oDiv.innerHTML=html;
	
	document.body.appendChild(oDiv);//插入到页面
	
	var closeBtn=document.getElementById('closeBtn');
	var title=oDiv.getElementsByTagName('h4')[0];
	var input=document.getElementsByTagName('input');
	
	input[0].onmousedown=function(ev){//输入框阻止冒泡，可以输入文字
		var oEv=ev ||window.event;
		oEv.cancelBubble=true;
	};
	input[1].onmousedown=function(ev){//输入框阻止冒泡，可以输入文字
		var oEv=ev ||window.event;
		oEv.cancelBubble=true;
	}
	
	modal.style.display="block";//显示模态层
	
	hxsd_tools.popShow(oDiv);//居中显示
	hxsd_tools.drag(oDiv,title);//可以拖拽
	
	//关闭弹框
	closeBtn.onclick=function(){
		document.body.removeChild(modal);
		document.body.removeChild(oDiv);
	};
},
	
	
	//轮播图
	"lxh_move":function(id,num){
		
		var slide=document.getElementById(id);
		var ol=slide.getElementsByTagName('ol')[0];//a数字按钮
		var oUl=slide.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var prevBtn=slide.children[0];
		var nextBtn=slide.children[1];
		for(var i=0;i<aLi.length;i++){
			var li=document.createElement('li');
			if(i==0) li.className="ac";
			if(num) li.innerHTML=i+1;
			ol.appendChild(li)
			
		};
		
		var show_num=0;//当前图片的索引
		var numBtn=ol.children;
		
		//点击数字按钮 滚动图片
		//数字按钮切换
		var li_w=hxsd_tools.getStyle(aLi[0], 'width')//取li的宽度
		
		oUl.style.width=li_w*aLi.length+'px';
		
		
		for(var i=0; i<numBtn.length; i++){
			numBtn[i].index=i;//发牌照
			
			numBtn[i].onclick=function(){
				for(var j=0; j<numBtn.length; j++){
					numBtn[j].className='';
				};
				this.className='ac';
				
				show_num=this.index;
				
				//图片移动
				hxsd_tools.hxsd_move(oUl,'left',-li_w*show_num,500);
			};
		};
	
		//左右按钮滚动图片
		//左滚
		nextBtn.onclick=function(){
			show_num++;
			if(show_num>aLi.length-1) show_num=0;
			hxsd_tools.hxsd_move(oUl,'left',-li_w*show_num,500);
			
			for(var j=0; j<numBtn.length; j++){
				numBtn[j].className='';
			};
			
			numBtn[show_num].className='ac';
			
			
		};
		
		
		prevBtn.onclick=function(){
			show_num--;
			if(show_num<0) show_num=aLi.length-1;
			hxsd_tools.hxsd_move(oUl,'left',-li_w*show_num,500);
			
			for(var j=0; j<numBtn.length; j++){
				numBtn[j].className='';
			};
			
			numBtn[show_num].className='ac';
			
			
		};
	
		
	},



}







