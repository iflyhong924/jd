// JavaScript Document

widgets={
//--------------左右切换图片----------------------------
'slide':function(id){
	var oDiv=document.getElementById(id);
	var leftBtn=oDiv.getElementsByTagName('span')[0];
	var rightBtn=oDiv.getElementsByTagName('span')[1];
	var ol=oDiv.getElementsByTagName('ol')[0]
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	
	for(var i=0;i<aLi.length;i++){
		var li=document.createElement('li');
		li.innerHTML=i+1;
		if(i==0)li.className='ac';
		ol.appendChild(li);	
	};
	var oBtn=ol.children;
	
	oUl.style.width=tools.getStyle(aLi[0],'width')*aLi.length+'px';
	var show_num=0;
	for(var i=0;i<oBtn.length;i++){	
		oBtn[i].index=i;
		oBtn[i].onclick=function(){
			for(var j=0;j<oBtn.length;j++){
					oBtn[j].className='';
				};
		this.className='ac';
		show_num=this.index
		tools.move(oUl,{'left':-show_num*tools.getStyle(aLi[0],'width')},1000);		
		};
	};

	rightBtn.onclick=function(){
		show_num++;	
		if(show_num>=oBtn.length-1){	
			show_num=oBtn.length-1;	
		};
		tools.move(oUl,{'left':-show_num*tools.getStyle(aLi[0],'width')},1000);
		for(var j=0;j<oBtn.length;j++){
			oBtn[j].className='';
		};
		
		oBtn[show_num].className="ac";
		
	};
	leftBtn.onclick=function(){
		show_num--;
		if(show_num<=0){
			show_num=0;	
		};
		tools.move(oUl,{'left':-show_num*tools.getStyle(aLi[0],'width')},1000);	
		for(var j=0;j<oBtn.length;j++){
			oBtn[j].className='';
		};
		
		oBtn[show_num].className="ac";
	};

},
//----------------------列表弹框-----------------------------------------------
'tab':function(id){
	var olist=document.getElementById(id);
	var oul=olist.getElementsByTagName('ul')[0];
	var oDiv=olist.getElementsByTagName('div')[0];
	var aLi=oul.children;
	var show_timer="";
	var out_timer="";
	var hide_timer="";
	
	//绑定事件
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover=function(){
			//延迟离开生效，使进入一个li时oDiv消失，清除延迟
			clearTimeout(out_timer);
			clearTimeout(hide_timer);
			//友好界面，mouseover延迟触发。
			show_timer=setTimeout(function(){
				oDiv.style.display="block";	
			},200);
			
		};	
		aLi[i].onmouseout=function(){
			//防止鼠标移出li时，进入li的延迟生效出现oDiv，清除进入li的延迟
			clearTimeout(show_timer);
			//防止鼠标移出li进入另一个li时，移出oDiv延迟生效oDiv消失，清除移出oDiv（oDiv消失）的延迟
			clearTimeout(hide_timer);
			out_timer=setTimeout(function(){//因为延迟进入，从一个li到另一个li会有时间差闪烁，所以延迟从li离开
				oDiv.style.display="none";	
			},100);
		};
		oDiv.onmouseover=function(){
			//防止鼠标移出oDiv或者li并进入另一个li时，鼠标移出 oDiv消失延迟生效，清除两个移出；
			clearTimeout(out_timer);
			clearTimeout(hide_timer);//当鼠标移入oDiv内容时候，相当于移出又移入，不清除oDiv移出的话，会延迟生效，导致oDiv消失（？？）
			this.style.display="block";	
		};
		oDiv.onmouseout=function(){//鼠标能进入oDiv时，li的延迟进入已经生效，而oDiv没有延迟进入，所以不用清除
			var self=this
			hide_timer=setTimeout(function(){
				self.style.display="none";	
			},50);	
		};		
	};	
},	
//---------------------------选项卡-------------------------------------	
'tab_change':function(floor_num){
	for(var k=0;k<floor_num.length;k++){
		(function(){
			var oDiv=document.getElementById(floor_num[k]);
			var oUl=oDiv.getElementsByTagName('ul')[0];	
			var aLi=oUl.children;
			for(var i=0;i<aLi.length;i++){
				aLi[i].onmouseover=function(){
					for(var j=0;j<aLi.length;j++){
						aLi[j].className='';	
					};	
					this.className='fixedborder';
				};	
			};
		})();
	};
},
//------------------------楼层展示---------------------------------
'floor_nav':function(floor_num){
	var ul=document.createElement('ul');
	for(var i=0;i<5;i++){
		var li=document.createElement('li');
		li.innerHTML='<a href="javascript:;">'+(i+1)+'F</a>';
		ul.appendChild(li);	
	};	
	document.body.appendChild(ul);
	var aLi=ul.getElementsByTagName('li');
	ul.className='floor_nav';
	ul.style.left=300+'px';
	
	var txt=[];
	window.onscroll=function(){
		var t=document.documentElement.scrollTop || document.body.scrollTop;
		if(t>1700 && t<5300){
			ul.style.display="block";
		}else{
			ul.style.display="none";	
		};	
		for(var i=0;i<floor_num.length;i++){
			//aLi[i].getElementsByTagName('a')[0].onclick=function(){alert(1)};
			(function(){
				var oDiv=document.getElementById(floor_num[i]);
				var oH=oDiv.getElementsByTagName('h2')[0];				
				txt.push(oH.innerHTML);
				if(t>2000+i*oDiv.offsetHeight){
					for(var j=0;j<5;j++){
						aLi[j].innerHTML='<a href="javascript:;">'+(j+1)+'F</a>';	
						aLi[j].style.background='';	
					};
					aLi[i].innerHTML='<a href="javascript:;">'+txt[i]+'F</a>';	
					aLi[i].getElementsByTagName('a')[0].style.color='#c81623';
					aLi[i].getElementsByTagName('a')[0].style.fontSize='12px';					
				};
			})();
			aLi[i].index=i;
			aLi[i].onmouseover=function(){
				for(var j=0;j<5;j++){
					aLi[j].style.background='';	
					aLi[j].innerHTML='<a href="javascript:;">'+(j+1)+'F</a>';	
					aLi[j].getElementsByTagName('a')[0].style.color='#000';
				};
				this.style.background='#c81623';
				this.innerHTML='<a href="javascript:;">'+txt[this.index]+'F</a>';	
				this.getElementsByTagName('a')[0].style.color='#fff';	
				//console.log(2)			 
			};
			
			
		};
	};

}
	
	
}