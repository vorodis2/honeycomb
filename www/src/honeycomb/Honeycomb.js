

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';


import { TStyle, TLabel } from './t3d/TStyle.js'; 

export class Honeycomb  {
    constructor(textLink, fun) {
    	this.type="Honeycomb";
    	var self=this;

        this.fun=fun;
        this._activObject=undefined;
        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';

         
         
        this.mobile=false;
        this.isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {

                let r = navigator.userAgent.match(/iPhone|iPad|iPod/i);
                if(r==null ){
                    if(navigator.userAgent.match(/Mac OS/i)!=null){
                        if(window.matchMedia("(any-pointer:coarse)").matches==true){
                            r="Mac Заебали менять апи";
                        }
                    }
                }
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (self.isMobile.Android() || self.isMobile.BlackBerry() || self.isMobile.iOS() || self.isMobile.Opera() || self.isMobile.Windows());
            }
        };
        if(this.isMobile.any()!=null)this.mobile=true;





        var content3d = new THREE.Object3D();
        var visi3D = new MVisi3D(this.div, null, this.mobile, true, true, true, false);       
        visi3D.yes3d = true;        
        visi3D.groupObject.add(content3d);
        content3d.rotation.x=-Math.PI/2; 
        this.visi3D=visi3D;

        //хрень принемашка ресурсов и настроек камеры для 
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"null","rotZ":2.73,"radius":7008,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"null","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"null","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":16,"far":47175,"minZum":0,"maxZum":10942,"zume":2500,"minRotationX":3.14,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":true,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'

        var scene=JSON.parse(o)
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (scene[this.sceneSB.array[i].name] === undefined) {
                scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(scene[this.sceneSB.array[i].name]);
        }

        //this.visi3D.zume=this.par.objectBase.settings.zume

        
   

        window.tStyle=new TStyle();

        var hScane=new HScane(this);
        content3d.add(hScane.content3d);
        this.hScane=hScane;
        
        var loader = new THREE.FontLoader();
        loader.load( textLink, function ( font ) {
            tStyle.addFont(font);           
            self.fun("complit");         
        })





/*
        var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
        var material = new THREE.MeshBasicMaterial( {color: 0x777777} );
        var c3d = new THREE.Mesh( new THREE.BoxBufferGeometry( 10, 10, 10 ));
        content3d.add( c3d );*/

        this.out = function (e) {    

        }


        this.over = function (e) {    

        }

        this.down = function (e) { 

            if(e && e.target && e.target.hron){
                self.activObject = e.target.hron;
                return
            }

            self.activObject=undefined;
            
        }


        this.visi3D.addEvent("out", this.out);        
        this.visi3D.addEvent("over", this.over);
        this.visi3D.addEvent("down", this.down);

        


        this.setApi=function(s,p,p1){
            if(s=="creatHoney") return hScane.creatHoney();
            return null;
        } 




        this.upDate=function(){
            visi3D.upDate();
            TWEEN.update();
        }   


        this.sizeWindow=function(w,h){
            visi3D.sizeWindow(0,0,w,h);
        }

        this.getObj=function(){
            var o={};
            o.hScane=hScane.getObj()
            return o;
        }

        this.setObj=function(o){           
            hScane.setObj(o.hScane);
        }

        this.render=function(){
            visi3D.intRend=1;
        }
    }

    set activObject(value) {
        if(this._activObject != value){        
            this._activObject = value;
            this.fun("activObject", value)
            
        }             
    }
    get activObject() { return  this._activObject;}








}  


export class HScane  {
    constructor(par) {
        this.type="HScane";
        var self=this;
        this.par=par
        this._color="#ffffff";
        this._height=10;
        this._radius=300;
        this._startVisi ="null";       

        this.content3d = new THREE.Object3D();

        this.geometry = new THREE.CylinderBufferGeometry( 1, 1, 1, 6 );


        var arrayHoney=[];

        this.sob=function(s,p){

        }

        this.creatH=function(){
            for (var i = 0; i < arrayHoney.length; i++) {
                if(arrayHoney[i].life==false){
                    arrayHoney[i].life=true;
                    return arrayHoney[i];
                }
            }
            let honey=new Honey(this,arrayHoney.length,this.sob);
            arrayHoney.push(honey);
            this.render();
            return honey;
        }


        //создаюм новыю гексу
        this.creatHoney=function(){
            this.render()
            return this.creatH();
        }


        /**
         * Получение точки от угла и длинны
         * @param {number} length - длинна вектора.
         * @param {number} angle - угол в радианах
         * @return {Point} от угла и длины получаем вектор точки
         */
        this.getVector = function (length, angle, point) {
            if (point == undefined) var point = new THREE.Vector2(0, 0);
            if (length < 0) angle += Math.PI;
            point.x = Math.abs(length) * Math.cos(angle);
            point.y = Math.abs(length) * Math.sin(angle);
            return point;
        };


        //trace("this.getVector ",this.getVector(1,(Math.PI*2)/6).y*2)

        this.tween = new TWEEN.Tween(par.visi3D); 

        this.startAnimat=function(s,t){
            if(!t)t=500;
            if(!s)return
            if(s=="null")return 
            let s1=''
            for (var i = 0; i < s.length; i++) {                
                if(s[i]=="|")s1+='"';
                else s1+=s[i];
            }
            
            let o =JSON.parse(s1);
            trace("++++++++",o)
            this.tween.to(o, t).start();
        }




        this.getObj=function(){
            var o={}
            o.startVisi=this.startVisi
            o.array=[];
            for (var i = 0; i < arrayHoney.length; i++) {
                if(arrayHoney[i].life==true){
                    o.array.push(arrayHoney[i].getObj())
                }
            }
            return o;
        }

        this.setObj=function(o){            
            if(o.array==undefined)return;
            for (var i = 0; i < arrayHoney.length; i++) {
                arrayHoney[i].life=false;
            }

            for (var i = 0; i < o.array.length; i++) {
                let obj=this.creatH();
                obj.setObj(o.array[i]);                
            } 
            trace(">>>>",o.startVisi)
            if(o.startVisi)this.startVisi=o.startVisi;


            this.render();   
        }

        this.render=function(){
            self.par.render()
        }



    }

    set startVisi(value) {
        if(this._startVisi != value){        
            this._startVisi = value;
            this.startAnimat(value)    
           
        }             
    }
    get startVisi() { return  this._startVisi;}
}


export class Honey  {
    constructor(par,idArr,fun ) {
        this.type="Honey";
        var self=this;
        this.par=par;
        this.idArr=idArr;
        this.fun=fun;

        this.array=[];

        this._life=true;
        this._color=par._color;
        this._height=par._height;
        this._radius=par._radius;
        this._x=0;
        this._y=0;
        this._z=0;
        this._rotation=0;

        this._text="";
        this._colorText="#ffffff";
        this._fontSize=16;

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);


        this.comb=new Comb(this,this.content3d);//основная сота
        this.comb.mesh.hron=this;
        this.par.par.visi3D.addChildMouse(this.comb.mesh);


        this.comb1=new Comb(this,this.content3d);//тень
        this.comb1.alpha=0.1;
        this.comb1.height=0.01;
        this.comb1.radius=this._radius;

        for (var i = 0; i < 7; i++) {
            this.array.push(new Comb(this, this.content3d));
            this.array[i].idArr=i;
            if(i==0){
                this.array[i].vector=new THREE.Vector2()
            }else{
                this.array[i].vector=this.par.getVector(1,(Math.PI*2)/6*i)
            }
            this.array[i].mesh.hron=this.array[i];
            this.par.par.visi3D.addChildMouse(this.array[i].mesh);
            this.array[i].draw();
        }


        this.draw=function(){
            this.comb.height=this._height;
            this.comb.radius=this._radius;
            this.comb1.radius=this._radius;

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].radius= this._radius/3;
                this.array[i].content3d.position.y=this._height
            }
            this.render()
        }


        this.getObj=function(){
            var o={}
            o.x=this.x;
            o.y=this.y;
            o.z=this.z;
            o.rotation=this.rotation;
            o.radius=this.radius;
            o.color=this.color;
            o.height=this.height;
            o.array=[];
            for (var i = 0; i < 7; i++) {
                o.array[i]=this.array[i].getObj()
            }

            o.text=this.text;
            o.colorText=this.colorText;
            o.fontSize=this.fontSize;
            

            return o;
        }

        this.setObj=function(o){   
            this.radius=o.radius;
            this.color=o.color;
            this.height=o.height;
            this.rotation=o.rotation;
            this.x=o.x;
            this.y=o.y;
            this.z=o.z;        


            if(o.text){
                this.text=o.text;
                this.colorText=o.colorText;
                this.fontSize=o.fontSize; 
            }


            for (var i = 0; i < 7; i++) {
                this.array[i].setObj(o.array[i]);
            }
            this.draw();  



            this.render();   
        }




        this.render=function(){
            this.par.render()
        }

        this.draw();
    }

    set life(value) {
        if(this._life != value){        
            this._life = value;
            this.content3d.visible=value;
            if(value){
                this.par.par.visi3D.addChildMouse(this.comb.mesh);
                for (var i = 0; i < 7; i++) this.par.par.visi3D.addChildMouse(this.array[i].mesh);
            }else{
                this.par.par.visi3D.removeChildMouse(this.comb.mesh);
                for (var i = 0; i < 7; i++) this.par.par.visi3D.removeChildMouse(this.array[i].mesh);
            }
        }             
    }
    get life() { return  this._life;}

    set x(value) {
        if(this._x != value){        
            this._x = value;
            this.content3d.position.x=value;

            
            this.render()
        }             
    }
    get x() { return  this._x;}

    set y(value) {
        if(this._y != value){        
            this._y = value;
            this.content3d.position.y=value;
            this.render()
        }             
    }
    get y() { return  this._y;}

    set z(value) {
        if(this._z != value){        
            this._z = value;
            this.content3d.position.z=value;
            this.render()
        }             
    }
    get z() { return  this._z;}
     


    set height(value) {
        if(this._height != value){        
            this._height = value;
            this.draw();
        }             
    }
    get height() { return  this._height;}

    set radius(value) {
        if(this._radius != value){        
            this._radius = value;
            this.draw();
        }             
    }
    get radius() { return  this._radius;}


    



    set rotation(value) {
        if(this._rotation != value){        
            this._rotation = value;
            this.content3d.rotation.y=value;
            this.render()
        }             
    }
    get rotation() { return  this._rotation;} 

    set color(value) {
        if(this._color != value){        
            this._color = value;
            this.comb.color = value;
            this.comb1.color = value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].color=value;
            }
            this.render()
        }             
    }
    get color() { return  this._color;} 

    set text(value) {
        if(this._text != value){        
            this._text = value;

            this.comb.tLabel.text=value;
            this.comb.draw();
            this.draw();
            this.render(); 
        }             
    }
    get text() { return  this._text;}


    set colorText(value) {
        if(this._colorText != value){        
            this._colorText = value;
            this.comb.tLabel.colorText1=this._colorText;
            this.comb.draw();
            this.render();
        }             
    }
    get colorText() { return  this._colorText;}    

    set fontSize(value) {
        if(this._fontSize != value){        
            this._fontSize = value;
            this.comb.tLabel.fontSize=this._fontSize;
            this.comb.draw();
            this.draw();
            this.render();
        }             
    }
    get fontSize() { return  this._fontSize;} 

}


export class Comb  {
    constructor(par, c3d) {
        this.type="Comb";
        var self=this;
        this.par=par;
        this.idArr=-1;
        this._height=par._height/3;
        this._radius=par._radius;
        this._color=par._color;
        this._colorText="#ffffff";
        this._visible = true;
        this._alpha=1;
        this._fontSize=16;

        this._center=true;

        this._text="";
        var sr=0.2
        this._rA=(Math.random()*sr*2-sr);
        this.material=new THREE.MeshPhongMaterial({color:this._color})
        this.material.color.r+=this._rA;
        this.material.color.g+=this._rA;
        this.material.color.b+=this._rA;





        this.content3d = new THREE.Object3D();        
        this.par.content3d.add(this.content3d);

        this.c3dt = new THREE.Object3D();        
        this.content3d.add(this.c3dt);

        this.vector=null;

        this.mesh=new THREE.Mesh(this.par.par.geometry,this.material);
        this.content3d.add(this.mesh);


        this.tLabel = new TLabel(this.c3dt, 0,0,this._text);        
        this.tLabel.object3d.rotation.x=-Math.PI/2;
        this.tLabel.colorText1=this._colorText;
        this.tLabel.textAlign="center";
        //this.mesh

        this.mesh.castShadow = true;       

        var v={x: 0.5000000000000001, y: 0.8660254037844386}
        this.draw=function(){
            this.mesh.scale.y=this._height;
            
            this.mesh.position.y=this._height/2;

            this.mesh.scale.x=this._radius;
            this.mesh.scale.z=this._radius;
            

            if(this.vector){
                this.content3d.position.x=this.vector.x*this._radius*1.7320508075688772;
                this.content3d.position.z=this.vector.y*this._radius*1.7320508075688772;                
            }
            
            if(this.idArr!=-1){
                this.c3dt.position.y=this._height;
                this.c3dt.rotation.y=-Math.PI/6;
                this.tLabel.x=-this.tLabel.width/2;
                if(this._center==true){
                    this.tLabel.object3d.position.z=-this.tLabel.height/2;                    
                }else{
                    this.tLabel.object3d.position.z=this._radius*0.85-this.tLabel.height-this._fontSize/2;
                }
            }else{
                this.tLabel.object3d.rotation.x=0//-Math.PI/2;                
                this.c3dt.rotation.y=Math.PI/6;

                this.c3dt.position.y=this._height/2;
                this.c3dt.position.x=this._radius;

                this.c3dt.position.x=v.x*this._radius*0.87;
                this.c3dt.position.z=v.y*this._radius*0.87;

                this.tLabel.x=-this.tLabel.width/2;
               
                this.tLabel.y=this.tLabel.height/2;
            }


            this.render()

        }
        this.render=function(){
            if(self.par.render)self.par.render()
        }


        this.getObj=function(){
            var o={}
            o.height=this.height;
            o.visible=this.visible;
            o.text=this.text;
            o.colorText=this.colorText;
            o.fontSize=this.fontSize;
            return o;
        }

        this.setObj=function(o){   
            this.height=o.height;
            if(o.visible==undefined)o.visible=true;
            this.visible=o.visible;
            if(o.text==undefined)o.text="";
            this.text=o.text;

            if(o.colorText==undefined)o.colorText=this.colorText;
            this.colorText=o.colorText;

            if(o.fontSize==undefined)o.fontSize=this.fontSize;
            this.fontSize=o.fontSize;

            this.draw();    
            this.render();   
        }       
    }

    set visible(value) {
        if(this._visible != value){        
            this._visible = value;
            this.content3d.visible=value;
            this.render();  
        }             
    }
    get visible() {        
        return  this._visible;
    }

    set text(value) {
        if(this._text != value){        
            this._text = value;
            this.tLabel.text=value;
            this.draw();
            this.render(); 
        }             
    }
    get text() { return  this._text;}


    set alpha(value) {
        if(this._alpha != value){        
            this._alpha = value;
            if(this._alpha==1){
                this.material.transparent=false;
                this.material.opacity=1;
            }else{
                this.material.transparent=true;
                this.material.opacity=this._alpha;
            }
            this.render(); 
        }             
    }
    get alpha() { return  this._alpha;}



    set height(value) {
        if(this._height != value){        
            this._height = value;
            this.draw();
        }             
    }
    get height() { return  this._height;}

    set radius(value) {
        if(this._radius != value){        
            this._radius = value;
            this.draw();
        }             
    }
    get radius() { return  this._radius;}

    set rA(value) {
        if(this._rA != value){        
            this._rA = value;
            this.material.color=new THREE.Color(this._color);
            this.material.color.r+=this._rA;
            this.material.color.g+=this._rA;
            this.material.color.b+=this._rA;            
            
            this.render()
        }             
    }
    get rA() { return  this._rA;} 



    set color(value) {
        if(this._color != value){        
            this._color = value;
            this.material.color=new THREE.Color(this._color);
            this.material.color.r+=this._rA;
            this.material.color.g+=this._rA;
            this.material.color.b+=this._rA;
            this.render();
        }             
    }
    get color() { return  this._color;} 


    set colorText(value) {
        if(this._colorText != value){        
            this._colorText = value;
            this.tLabel.colorText1=this._colorText;
            this.render();
        }             
    }
    get colorText() { return  this._colorText;}    

    set fontSize(value) {
        if(this._fontSize != value){        
            this._fontSize = value;
            this.tLabel.fontSize=this._fontSize;
            this.draw();
            this.render();
        }             
    }
    get fontSize() { return  this._fontSize;} 


    set center(value) {
        if(this._center != value){        
            this._center = value;           
            this.draw();
            this.render();
        }             
    }
    get center() { return  this._center;} 
    


}




