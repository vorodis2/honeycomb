

/*(function (global, factory) {
	typeof exports === 'object'/* && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.DCM = {})));  303890
}(this, (function (exports) { 'use strict';*/


import { TCont } from './TCont.js';
import { TVector } from './TVector.js';



var tStyle
export function TStyle () {	
	this.type="TStyle";	
	var self=this;
	tStyle=this;




	this.gBox =  new THREE.BoxBufferGeometry( 1, 1, 1 );	
	this.gCylinder =  new THREE.CylinderBufferGeometry( 1, 1, 1, 16, 1);
	this.gStrelka =  new THREE.CylinderBufferGeometry( 1, 0, 1, 16, 1);	



	this.wh=32;
	this._gage=1;
	this._color="#008CBA";
	this._color1="#666666";
	this._colorText="#ffffff";
	this._colorText1="#999999";
	this._fontSize = 16;
	this._fontFamily = "Arial";
	




  	this._bold=true;
  	this._italic=false;
	this._otstup = 2;
	this.font=new TFont(this);
	this.objMat={}
	this.getMat=function(color){		
		if(this.objMat[color]==undefined)this.objMat[color]=new THREE.MeshPhongMaterial({color:color})		
		return 	this.objMat[color];
	}

	this.mobile=false;
	
	this.array=[]
	this.add=function(comp){
		this.array.push(comp);
	}


	this.addFont=function(ng){
		this.font.ng=ng;
	}
}

Object.defineProperties(TStyle.prototype, {
    

})

export class TFont  {
	constructor(par) {

		this.par=par
		this.tv=new TVector();
		this._whText=200;
		this._whTextPlus=Math.round(this._whText+this._whText/8)
		this.tv._wh=40;
		this.ng=undefined;

		if(this.tv.bitmapData.width!=this._whTextPlus)this.tv.bitmapData.width=this._whTextPlus;			
		if(this.tv.bitmapData.height!=this._whTextPlus)this.tv.bitmapData.height=this._whTextPlus;

		this.object={}

		//ctx.font = "italic bold 200px Courier";
		var key
		this.setObj=function(_lebel){			
			key=""
			if(_lebel._italic==true) key+="italic "
			if(_lebel._bold==true) key+="bold "
			key+=this._whText+"px "+_lebel._fontFamily;
			if(this.object[key]==undefined)this.object[key]=new TFBlok(this, key);

			
			this.object[key].setObj(_lebel)
		}
	}
}
		
export class TFBlok  {
	constructor(par, key) {

		this.par=par;
		this.key=key;		
		this.arSimvol=[]
		var i,j,kolH,sah,mXX,mesh

		this.arrSN=[]
		this.arrSim=[]
		this.arrkol=[]
		this.setObj=function(_lebel){			
			for (i= _lebel.cont3d.children.length-1; i >=0; i--) {
				_lebel.cont3d.remove(_lebel.cont3d.children[i]);
			}
			kolH=0;


			this.arrSN=_lebel._text.split("\n");

			//"left";	 //center right		
			sah=0
			mXX=0;
			for (j = 0; j < this.arrSN.length; j++) {		
				this.arrSim[j]=[]
				this.arrkol[j]=0
				for (i = 0; i < this.arrSN[j].length; i++) {				
					if(this.arSimvol[this.arrSN[j][i]]==undefined){
						this.arSimvol[this.arrSN[j][i]]=new TFSimvol(this, this.arrSN[j][i])
					}
					mesh=this.arSimvol[this.arrSN[j][i]].getMesh(_lebel.material)
					_lebel.cont3d.add(mesh)
					this.arrSim[j].push(mesh);

					if(par.ng!=undefined)_lebel.cont3d.children[sah].position.y=-par._whText-(par._whText*j*1.1);
					else{
						_lebel.cont3d.children[sah].position.y=0-(par._whText*j*1.1);
					}
					if(i!=0){
						_lebel.cont3d.children[sah].position.x=_lebel.cont3d.children[sah-1].position.x+_lebel.cont3d.children[sah-1].w+this.par._whText/200;					
						_lebel._widthGeom=_lebel.cont3d.children[sah].position.x+_lebel.cont3d.children[sah].w;
						this.arrkol[j]=_lebel._widthGeom
					}else{
						_lebel.cont3d.children[sah].position.x=0;
						_lebel._widthGeom=0;
						this.arrkol[j]=_lebel.cont3d.children[sah].w
					}
					if(_lebel._widthGeom>mXX)mXX=_lebel._widthGeom
					sah++
					
				}
				
				
			}

			if(_lebel._textAlign!="left"){
				if(this.arrSN.length>=2){					
					for (j = 0; j < this.arrSN.length; j++) {
						kolH=0;
						if(_lebel._textAlign=="center")kolH=(mXX-this.arrkol[j])/2
						if(_lebel._textAlign=="right")kolH=(mXX-this.arrkol[j])							
						for (i = 0; i < this.arrSim[j].length; i++) {	
							this.arrSim[j][i].position.x+=kolH;
						}
					}					
				}
			}



			_lebel._widthGeom=mXX;
			_lebel._heightGeom=par._whText+(par._whText*(this.arrSN.length-1)*1.1);									
		}
		

	}
}

export class TFSimvol  {
	constructor(par, key) {

		this.par=par;
		this.key=key;
		this.array=[];
		

		var whText=this.par.par._whText;
		var whTextPlus=this.par.par._whTextPlus;
		



		if(par.par.ng==undefined){		
			var bmp=this.par.par.tv.bitmapData;
			var ctx=bmp.ctx;
			var tv=this.par.par.tv
		
			ctx.clearRect(0, 0, whTextPlus, whTextPlus);
			var s=whText+"px "+this.par.key;
			ctx.font = this.par.key;	
			ctx.fillText(key, 0, whText-whText/8);
			bmp.imgData = ctx.getImageData(0, 0, whTextPlus, whTextPlus);	
			tv.upDate();
			this.geometry=new TSGeometry(tv.points.arrayTriangle,tv.points.array,this.par.par.par._gage);
			if(key==" "){
        		
        		this.geometry.boundingBox.max.x=whText/2;
        		
        	}
		}else{
			
			this.geometry= new THREE.TextGeometry( key, {
				font: par.par.ng,
				size: whText,
				height: 1,
				curveSegments: 4,
				bevelThickness: 1,
				bevelSize: 1,
				bevelEnabled: true
			} );
			this.geometry.computeBoundingBox();
        	this.geometry.computeBoundingSphere();
        	if(key==" "){
        		
        		this.geometry.boundingBox.max.x=whText/2;
        		
        	}
        	

		}




		var i 
		this.getMesh=function(mat){			
			var m;
			for (i = 0; i < this.array.length; i++) {
				//
				
				if(this.array[i].parent==null){
					if(this.array[i].material.uuid!=mat.uuid)this.array[i].material=mat;
					return this.array[i]
				}
			}

			this.array.push(new THREE.Mesh(this.geometry, mat));			
			this.array[this.array.length-1].w=this.geometry.boundingBox.max.x;
			return this.array[this.array.length-1];
		}

		
	}
}

function TSGeometry(arr,arr2,gage) {
	THREE.BufferGeometry.call(this);

	this.arrPosition=[];
    var arrPositionAttribut;
    var d=gage;
    var k,i,j;
    var ar=arr;    
    var ar2=arr2;
	var o
    this.update = function () {
    
    	this.arrPosition=[];  
    	for (i = 0; i < ar.length; i++) {
    		k=ar[i].length;    		
    		for (j = 0; j < k; j+=6) {    			
	    		this.arrPosition.push(ar[i][j],-ar[i][j+1],d);
	    		this.arrPosition.push(ar[i][j+2],-ar[i][j+1+2],d);
	    		this.arrPosition.push(ar[i][j+4],-ar[i][j+1+4],d);

	    		this.arrPosition.push(ar[i][j],-ar[i][j+1],d);	    		
	    		this.arrPosition.push(ar[i][j+4],-ar[i][j+1+4],d);
				this.arrPosition.push(ar[i][j+2],-ar[i][j+1+2],d);


	    		this.arrPosition.push(ar[i][j+4],-ar[i][j+1+4],0);
				this.arrPosition.push(ar[i][j+2],-ar[i][j+1+2],0);
				this.arrPosition.push(ar[i][j],-ar[i][j+1],0);

				this.arrPosition.push(ar[i][j+4],-ar[i][j+1+4],0);				
				this.arrPosition.push(ar[i][j],-ar[i][j+1],0);
				this.arrPosition.push(ar[i][j+2],-ar[i][j+1+2],0);
	    	}
    	}
    	for (i = 0; i < ar2.length; i++) {
    		k=ar2[i].length-1;    		
    		for (j = 0; j < k; j++) {
    			this.arrPosition.push(ar2[i][j].x,	-ar2[i][j].y,	0);
    			this.arrPosition.push(ar2[i][j+1].x,	-ar2[i][j+1].y,	0);
    			this.arrPosition.push(ar2[i][j+1].x,	-ar2[i][j+1].y,	d);

    			this.arrPosition.push(ar2[i][j].x,	-ar2[i][j].y,	0);    			
    			this.arrPosition.push(ar2[i][j+1].x,	-ar2[i][j+1].y,	d);
				this.arrPosition.push(ar2[i][j+1].x,	-ar2[i][j+1].y,	0);



    			this.arrPosition.push(ar2[i][j].x,	-ar2[i][j].y,	0);    			
    			this.arrPosition.push(ar2[i][j+1].x,	-ar2[i][j+1].y,	d);
				this.arrPosition.push(ar2[i][j].x,	-ar2[i][j].y,	d);

				this.arrPosition.push(ar2[i][j].x,	-ar2[i][j].y,	0);    			
				this.arrPosition.push(ar2[i][j].x,	-ar2[i][j].y,	d);
				this.arrPosition.push(ar2[i][j+1].x,	-ar2[i][j+1].y,	d);

    		}
    	}
    	arrPositionAttribut = new Float32Array(this.arrPosition.length * 3);
        this.addAttribute('position', new THREE.BufferAttribute(arrPositionAttribut, 3));
       
       	k=this.arrPosition.length	
        for (var i = 0; i < k; i++) {
	        arrPositionAttribut[i] = this.arrPosition[i];// = arrPosition[i];
	    }
	    
	    this.attributes.position.needsUpdate = true;
	    this.computeVertexNormals();
	    this.computeBoundingBox();
        this.computeBoundingSphere();

    }

	this.serAA=function(a,a1){
		ar=a
		ar2=a1
		this.update();
	}
	

    this.update();
}
TSGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
TSGeometry.prototype.constructor = TSGeometry;	



export class TLabel extends TCont {
	constructor(tCont, _x, _y, _text) {
		super(tCont); 
		this.x=_x;
		this.y=_y;

		
		this._widthGeom=100
		this._heightGeom=100
		this._width=100;
		this._gage=tStyle._gage;
		this._colorText1=tStyle._colorText1;
		this._textAlign="left";	 //center right		
		this.material=tStyle.getMat(this._colorText1);

		
		this.cont3d=new THREE.Object3D();
		this.object3d.add(this.cont3d);
		this.geometry=undefined;
		this._text=_text||"";

	
		
		this._fontSize = tStyle._fontSize ;
  		this._fontFamily = tStyle._fontFamily;
  		this._bold=tStyle._bold;
  		this._italic=tStyle._italic;
  		var s=this._fontSize/tStyle.font._whText;  		
  		this.cont3d.scale.set(s,s,this._gage);



		this.drag=function(){			
			tStyle.font.setObj(this)
			this._width=this._widthGeom*this._fontSize/tStyle.font._whText;	

		}
		this.drag();


		this.dragColor=function(){
			for (var i = 0; i < this.cont3d.children.length; i++) {
				this.cont3d.children[i].material=this.material;
			}
		}
	}

	set width(value) {
		if(this._width!=value){
			this._width = value;			
		}		
	}	
	get width() { 
		var w=this._widthGeom*(this._fontSize/tStyle.font._whText)		
		return  w;
	}

	set height(value) {
		if(this._height!=value){
			this._height= value;			
		}		
	}	
	get height() { 
		var h=this._heightGeom*(this._fontSize/tStyle.font._whText)
		return  h;
	}


	set gage(value) {
		if(this._gage!=value){
			this._gage = value;
			var s=this._gage/tStyle.font._whText;  		
  			this.cont3d.scale.set(s,s,this._gage)
  			this._width=this._widthGeom * this._fontSize/tStyle.font._whText;
		}		
	}	
	get gage() { return  this._gage;}



	
	
	set fontSize(value) {
		if(this._fontSize!=value){
			this._fontSize = value;
			var s=this._fontSize/tStyle.font._whText;  		
  			this.cont3d.scale.set(s,s,this._gage)
  			this._width=this._widthGeom * this._fontSize/tStyle.font._whText;
		}		
	}	
	get fontSize() { return  this._fontSize;}



	set textAlign(value) {
		if(this._textAlign!=value){
			this._textAlign = value;								 		
  			this.drag();
		}		
	}	
	get textAlign() { return  this._textAlign;}	


	set fontFamily(value) {
		if(this._fontFamily!=value){
			this._fontFamily = value;
			var s=this._fontFamily; 						 		
  			this.drag();
		}		
	}	
	get fontFamily() { return  this._fontFamily;}


	set bold(value) {
		if(this._bold!=value){
			this._bold = value;
			var s=this._bold;  		
  			this.drag();
		}		
	}	
	get bold() { return  this._bold;}

	set italic(value) {
		if(this._italic!=value){
			this._italic = value;
			var s=this._italic;  		
  			this.drag();
		}		
	}	
	get italic() { return  this._italic;}	


	

	set text(value) {
		if(this._text!=value){
			this._text = value;
			this.drag();
		}		
	}	
	get text() { return  this._text;}	

	set colorText1(value) {
		if(this._colorText1!=value){
			this._colorText1 = value;
			this.material=tStyle.getMat(this._colorText1);
			this.dragColor();
		}		
	}	
	get colorText1() { return  this._colorText1;}
}










export class TArrow extends TCont {
	constructor(tCont, _x, _y) {
		super(tCont); 
		this.x=_x;
		this.y=_y;

		this._height=10;
		this._width=100;
		this.textScale=1;
		this.textPlus="";


		this._gage=tStyle._gage;
		this._color1=tStyle._color1;		
		this._otstup=tStyle._otstup;

		this.boolMat=false;
		this.material=tStyle.getMat(this._color1);
		
		this.a=[];
		this.a[0]=new THREE.Mesh(tStyle.gCylinder, this.material);//центр
		this.a[1]=new THREE.Mesh(tStyle.gCylinder, this.material);//право
		this.a[2]=new THREE.Mesh(tStyle.gCylinder, this.material);//лево	
		this.a[3]=new THREE.Mesh(tStyle.gStrelka, this.material);//право
		this.a[4]=new THREE.Mesh(tStyle.gStrelka, this.material);//лево

		for (var i = 0; i < this.a.length; i++) {
			this.object3d.add(this.a[i]);
			
		}

		this.a[0].rotation.z=Math.PI/2;
		this.a[3].rotation.z=-Math.PI/2;
		this.a[4].rotation.z=Math.PI/2;

		
		this.label = new TLabel(this,0,0,this._width+"");
		this.label.fontSize=10
		this.label.colorText1=this._color1
		//this.label.size=20

		var tp
		this.drag=function(){
			var g=this._gage/2
			var g2=g//this._gage
			this.a[0].scale.set(g, this._width-g*6,g);
			this.a[0].position.set(this._width/2, this._height,g2);

			this.a[1].scale.set(g, this._height+g,	g);
			this.a[1].position.set(0, (this._height+g)/2,g2);

			this.a[2].scale.set(g, this._height+g,	g);
			this.a[2].position.set(this._width, (this._height+g)/2,g2);

			this.a[3].scale.set(g*4, g*4,	g);
			this.a[3].position.set(g*2, this._height,g2);	

			this.a[4].scale.set(g*4, g*4,	g);
			this.a[4].position.set(this._width-g*2, this._height,g2);

			tp=Math.round(this._width*10)/10*this.textScale

			this.label.text=tp+this.textPlus;
			this.label.y=this._height;
		
			this.label.x=(this._width-this.label.width)/2;
			

		}
		this.drag();


		this.dragMat=function(){
		
			this.material=tStyle.getMat(this._color1);
			for (var i = 0; i < this.a.length; i++) {
				this.a[i].material=this.material;
			}
			
		}


	}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.drag()
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
			this.drag()
		}		
	}	
	get height() { return  this._height;}

	set gage(value) {
		if(this._gage!=value){
			this._gage = value;
			//this.label.gage= value;
			this.label.fontSize=this.label.gage*20;
			this.drag();
		}		
	}	
	get gage() { return  this._gage;}

	set color1(value) {
		if(this._color1!=value){
			this._color1 = value;
			
			this.label.colorText1 = value;
			this.dragMat()
		}		
	}	
	get color1() { return  this._color1;}
}



