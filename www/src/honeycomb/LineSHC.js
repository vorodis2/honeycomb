


import { TCurve } from './TCurve.js'; 



export class LineSHC  {
    constructor(par, fun) {
    	this.type="par";
    	var self=this;
        this.par=par;
        this.fun=fun;
        this.array=[];

        
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);


        this.clear=function(){  
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false;
            }
        }

        this.creat=function(comb,comb1,up,mat){  
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){
                    this.array[i].setCombS(comb,comb1,up,mat)
                    return this.array[i];
                }
            }
            let b=new LSHCBox(this, fun);            
            b.idArr=this.array.length;
            b.setCombS(comb,comb1,up,mat);
            this.array.push(b);

            return b;
        }


        this.setComb=function(comb){          
            
            this.clear()
            this.fun() 
            if(comb==null)return;
            
            if(comb.par.par.index!=-1)return;

            let a=comb.idArray.split(",");

            for (var i = 0; i < a.length; i++) {
                if(a[i]!="" && a[i]!="null"){
                    let c=this.par.getCombForId(a[i]);
                    if(c!=null){                        
                        this.creat(comb,c,100,comb.material1)
                    }
                }
            } 
            this.fun()           
        }
    }
/*
    set activObject(value) {
        if(this._activObject != value){        
            this._activObject = value;
            this.fun("activObject", value)
            if(this._activObject)this.hScane.setActiv(this._activObject);
            if(value==undefined)this.hScane.startAnimat(this.hScane.startVisi)
            trace("this._activObject===",this._activObject)
            
        }             
    }
    get activObject() { return  this._activObject;}*/

}  




export class LSHCBox  {
    constructor(par, fun) {
        this.type="LSHCBox";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.array=[];

        this._life=false

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);


        this.tCurve=new TCurve(this);


        var vect=new THREE.Vector3()
        var vect1=new THREE.Vector3()
 
/*
        this.ax=new THREE.AxesHelper(450);
        this.content3d.add(this.ax);

        this.ax1=new THREE.AxesHelper(150);
        this.content3d.add(this.ax1);*/



        this.setCombS=function(comb,comb1, up, mat){ 
            this.life=true;
            vect.x=comb.content3d.position.x+comb.par.content3d.position.x;
            vect.y=comb.content3d.position.y+comb.par.content3d.position.y+comb._height;
            vect.z=comb.content3d.position.z+comb.par.content3d.position.z; 
           // this.ax.position.copy(vect)



            vect1.x=comb1.content3d.position.x+comb1.par.content3d.position.x;
            vect1.y=comb1.content3d.position.y+comb1.par.content3d.position.y+comb1._height;
            vect1.z=comb1.content3d.position.z+comb1.par.content3d.position.z;
           // this.ax1.position.copy(vect1)


            this.tCurve.drag(vect,vect1, up, mat);
        } 
    }
    set life(value) {
        if(this._life != value){        
            this._life = value;
            if(this._life==true)this.par.content3d.add(this.content3d);
            else this.par.content3d.remove(this.content3d);            
        }             
    }
    get life() { return  this._life;}

} 
