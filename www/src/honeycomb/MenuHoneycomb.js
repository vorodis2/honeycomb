
import { Honeycomb} from './Honeycomb.js';


export class MenuHoneycomb  {
    constructor(fun) {    	
		this.type="MenuHoneycomb";		
		var self=this;
		this.fun=fun;

		window.dcmParam = new DCM();//интерфейс

	    this.dCont=new DCont(document.body);	

	    var array=[];
	    array.push(new MStart(this, 0));	
	    array.push(new MHoney(this, 1));
	    array.push(new MComb(this, 2));	


	    this.object

	    this.setObject=function(object){
	    	this.object=object;
	    	let p=0;	    
	    	for (var i = array.length - 1; i >= 0; i--) {
	    		if(array[i].testObj)if(array[i].testObj(object)==true){	    		
	    			p=i;
	    			break;
	    		}	    			
	    	}	    	
	    	this.openMenu(p);
	    }

	    this.openMenu=function(p){
			for (var i = 0; i < array.length; i++) {				
	    		if(i==p)array[i].dCont.visible = true;
	    		else array[i].dCont.visible = false;
	    	}
	    	if(array[p].setObject)array[p].setObject(this.object)
	    } 
	    this.openMenu(0);

		this.setApi=function(s,p,p1){
			if(s=="activObject"){
				this.setObject(p);
			}
	    } 

	    this.setObj=function(o){	    	
	    	let s=JSON.stringify(o);
	        array[0].textArea.value=s;
            
        }

        var honeyTest;
        this.test2=function(str){
        	var wind=new DWindow(this.dCont, 300, 200,"тест второй сцены и событий");
    		wind.width=400;
    		wind.height=400;
    		//this.w.dragBool=false;
    		//this.w.hasMinimizeButton=false;
    		var textArae=new DTextArea(wind.content,2,wind.height-204,"",function(){

    		})
    		textArae.width=wind.width-4
    		textArae.height=200

    		honeyTest=new Honeycomb('resources/font/helvetiker_bold.typeface.json',function(s,p,p1){    			
    			if(s=="complit"){    				
    				let o=JSON.parse(str);
					honeyTest.setObj(o);

					honeyTest.sizeWindow(wind.width, wind.height-204);
    			}
    			textArae.text=s+" "+p+"\n"+textArae.text;
    		});
    		
    		wind.content.div.appendChild(honeyTest.div); //приатачиваем див там 3д и соты
        }

        this.upDate=function(){
        	if(honeyTest){
        		honeyTest.upDate()
        	}
        }


	    this.sizeWindow=function(w,h){
	    	for (var i = array.length - 1; i >= 0; i--) {
	    		if(array[i].sizeWindow)array[i].sizeWindow(w,h);
	    	}
	    }
	}
} 


export class MStart  {
    constructor(par, idArr) {
    	this.type="MStart";
		var self=this;
		this.par=par
		this.idArr=idArr

		this.dCont=new DCont(par.dCont);	

		this.w=new DWindow(this.dCont, 2, 2,"настройки");
    	this.w.width=200;
    	this.w.dragBool=false;
    	this.w.hasMinimizeButton=false;

    	let y=2;

    	var b = new DButton(this.w.content, 2, y, "creatHoney",function(){
	        self.par.fun("creatHoney");
	    })
	    b.width=this.w.width-4;
    	y+=34;

    	b = new DButton(this.w.content, 2, y, "get",function(){
	        self.par.fun("getObj");	        
	    });
	    b.width=(this.w.width-6)/2;

	    b = new DButton(this.w.content, (this.w.width-6)/2+4, y, "set",function(){
	        let o=JSON.parse(self.textArea.value);
	        self.par.fun("setObj",o);
	    })
	    b.width=(this.w.width-6)/2;
	    y+=34;

	    var bGetScane = new DButton(this.w.content, (this.w.width-2)-b.height, y, "<",function(){
	        /*let o=JSON.parse(textArea.value);
	        self.par.fun("setObj",o);*/
	        if(this.text=="<"){
	        	let visi3D=self.par.fun("returnVisi3D");
	        	let s=JSON.stringify(visi3D.getObj());
	        	let s1=s.replace(/"/gi,'|');	        	
	        	self.object.startVisi=s1;
	        	self.input.value=self.object.startVisi;
	        	this.text="x";
	        	return
	        }
	        if(this.text=="x"){
	        	self.object.startVisi="null";
	        	self.input.value="null";
	        	this.text="<";
	        }
	    })
	    bGetScane.width=bGetScane.height;

	    this.input=new DInput(this.w.content, 2, y, "null",function(){
	        
	    });
	    this.input.width=-6+bGetScane.x;    

	    y+=34;


	    this.textArea=new DTextArea(this.w.content, 2, y, "null",function(){
	        
	    });
	    this.textArea.width=this.w.width-4;
	    this.textArea.height=100;
	    y+=this.textArea.height+2;

	    var rot = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.time=this.value
	    }, "time", 0, 2000)
	    rot.width=this.w.width-6;
	    rot.okrug=1;	    
    	y+=50;


	    this.setObject=function(object){	    	
	    	this.object=self.par.fun("returnScane");

	    	self.input.value=self.object.startVisi;	    	
	    	if(self.input.value == "null"){
	    		bGetScane.text="<"
	    	}else{
	    		bGetScane.text="x"
	    	}
	    	self.par.fun("index",-1);
	    	rot.value=this.object.time;
	    }




    	this.w.height=y+34;
    }
}


export class MHoney  {
    constructor(par, idArr) {
    	this.type="MHoney";
		var self=this;
		this.par=par
		this.idArr=idArr

		this.dCont=new DCont(par.dCont);	

		this.w=new DWindow(this.dCont, 2, 2,"Honey");
    	this.w.width=200;
    	this.w.dragBool=false;
    	this.w.hasMinimizeButton=false;

    	let y=2;

    	let ww=26.3;
    	for (var i = 0; i < 7; i++) {
    		let bb=new DButton(this.w.content, 2+(ww+2)*i, y,i+"",function(){
    			par.setObject(self.object.array[this.idArr])
    		})
    		bb.width=ww
    		bb.idArr=i
    	}
    	y+=34;
    	/*var rot = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.rotation=this.value*Math.PI/180
	    }, "rotation", -180, 180)
	    rot.width=this.w.width-6;
	    rot.okrug=1;
    	y+=50;*/


    	var rot = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.rotation=this.value*Math.PI/180
	    }, "rotation", -180, 180)
	    rot.width=this.w.width-6;
	    rot.okrug=1;
    	y+=50;

    	var rot1 = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.height=this.value;
	    }, "height", 1, 100)
	    rot1.width=this.w.width-6;
	    rot1.okrug=1;
    	y+=50;

    	var rot2 = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.radius=this.value;
	    }, "radius", 1, 500)
	    rot2.width=this.w.width-6;
	    rot2.okrug=1;
    	y+=50;

    	var color = new DColor(this.w.content, 2, y,"#ffffff",function(){
	        self.object.color=this.value;
	    });
	    color.width=this.w.width-4;	   
    	y+=34;






    	this.drag=function(){    	
    		self.object.x=self.ar[0].value*1;
    		self.object.y=self.ar[1].value*1;
    		self.object.z=self.ar[2].value*1;
    	}


    	let hh=32;
    	let w=this.w.width/3-6;
    	this.ar=[];
    	for (var i = 0; i < 3; i++) {
	    	this.ar[i]=new DInput(this.w.content,2+i*(w+4), y," ",this.drag);
	        this.ar[i].height=hh;
	        this.ar[i].idArr=i;
	        this.ar[i].ttt="position";
	        this.ar[i].width=w;  
	        this.ar[i].fontSize=12;   
	        this.ar[i].setNum(1); 
	        this.ar[i].timeFun=1;
	    }
	    y+=34;	


	    var textArea = new DTextArea(this.w.content, 2, y,"null",function(){
	        self.object.text=this.value;
	    })
    	textArea.width=this.w.width-6;
    	textArea.height=48;
    	textArea.timeFun=1;
    	y+=50;



    	var color1 = new DColor(this.w.content, 2, y,"#ffffff",function(){
	        self.object.colorText=this.value;
	    });
	    color1.width=this.w.width-4;	   
    	y+=34;

		var rot3 = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.fontSize=this.value;
	    }, "fontSize", 1, 100)
	    rot3.width=this.w.width-6;
	    rot3.okrug=1;
    	y+=50;	


    	var bGetScane = new DButton(this.w.content, (this.w.width-2)-32, y, "<",function(){
	       
	        if(this.text=="<"){
	        	let visi3D=self.par.fun("returnVisi3D");
	        	let s=JSON.stringify(visi3D.getObj());
	        	let s1=s.replace(/"/gi,'|');	        	
	        	self.object.startVisi=s1;
	        	self.input.value=self.object.startVisi;
	        	this.text="x";
	        	return
	        }
	        if(this.text=="x"){
	        	self.object.startVisi="null";
	        	self.input.value="null";
	        	this.text="<";
	        }
	    })
	    bGetScane.width=bGetScane.height;

	    this.input=new DInput(this.w.content, 2, y, "null",function(){
	        
	    });
	    this.input.width=-6+bGetScane.x;    

	    y+=34;/**/




    	this.object;
	    this.setObject=function(object){
	    	this.object=object; 
	    	rot.value=self.object.rotation/Math.PI/180;
	    	rot1.value=self.object.height;	
	    	rot2.value=self.object.radius;    	
	    	color.value=self.object.color;

	    	this.ar[0].value=self.object.x;
	    	this.ar[1].value=self.object.y;
	    	this.ar[2].value=self.object.z;


	    	textArea.value=self.object.text;
	    	color1.value=self.object.colorText;
	    	rot3.value=self.object.fontSize;

	    	self.par.fun("index",self.object.idArr);
	    	

	    }

    	this.w.height=y+34;


    	this.testObj=function(o){    		
    		if(o && o.type && o.type=="Honey")return true;
    		return false;
    	}
    }
}



export class MComb  {
    constructor(par, idArr) {
    	this.type="MComb";
		var self=this;
		this.par=par
		this.idArr=idArr

		this.dCont=new DCont(par.dCont);	

		this.w=new DWindow(this.dCont, 2, 2,"Comb");
    	this.w.width=200;
    	this.w.dragBool=false;
    	this.w.hasMinimizeButton=false;

    	let y=2;

		var check = new DCheckBox(this.w.content, 2, y,"visible",function(){
	        self.object.visible=this.value;
	    })
	    y+=28;

    	var rot = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.alpha=this.value
	    }, "alpha", 0, 1)
	    rot.width=this.w.width-6;	    
    	y+=50;


    	

    	var rot1 = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.height=this.value;
	    }, "height", 1, 100)
	    rot1.width=this.w.width-6;
	    rot1.okrug=1;
    	y+=50;

    	var rot2 = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.rA=this.value;
	    }, "rA", -1, 1);
	    rot2.width=this.w.width-6;	    
    	y+=50;


    	var textArea = new DTextArea(this.w.content, 2, y,"null",function(){
	        self.object.text=this.value;
	    })
    	textArea.width=this.w.width-6;
    	textArea.height=48;
    	textArea.timeFun=1;
    	y+=50;

    	var color = new DColor(this.w.content, 2, y,"#ffffff",function(){
	        self.object.colorText=this.value;
	    });
	    color.width=this.w.width-4;	   
    	y+=34;

		var rot3 = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.fontSize=this.value;
	    }, "fontSize", 1, 100)
	    rot3.width=this.w.width-6;
	    rot3.okrug=1;
    	y+=50;

    	var check1 = new DCheckBox(this.w.content, 2, y,"center",function(){
	        self.object.center=this.value;
	    })
	    y+=28;

	    var check2 = new DCheckBox(this.w.content, 2, y,"boolAM",function(){
	        self.object.boolAM=this.value;
	    })
	    y+=28;

	    var check3 = new DCheckBox(this.w.content, 2, y,"visiActiv (not save)",function(){
	        self.object.visiActiv=this.value;
	    })
	    y+=28;	

    	this.object;
	    this.setObject=function(object){
	    	this.object=object;
	    	rot.value=self.object.alpha; 
	    	rot1.value=self.object.height;
	    	rot2.value=self.object.rA;		
	    	check.value=self.object.visible;
	    	
	    	textArea.value=	self.object.text;
	    	color.value=self.object.colorText;
	    	rot3.value=self.object.fontSize;

	    	check1.value=self.object.center;
	    	check2.value=self.object.boolAM;	    	
	    	check3.value=self.object.visiActiv;
	    }

    	this.w.height=y+34;


    	this.testObj=function(o){    		
    		if(o && o.type && o.type=="Comb")return true;
    		return false;
    	}
    }
}



