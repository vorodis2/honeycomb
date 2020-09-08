


//Ьфеуматические вычеаления 
//управелния линеей


export class TCurve  {
    constructor(par) {         
        this.type="TCurve";
        this.par=par;
        var self=this;

        const ARC_SEGMENTS=20
        var curve = new THREE.CatmullRomCurve3( );

        for (let i = 0; i < ARC_SEGMENTS; i++) {      
            curve.points[i]=new THREE.Vector3(0,0,0);           
        }         
        var geometry = new THREE.BufferGeometry().setFromPoints( curve.points );
        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );         
        var curveObject = new THREE.Line( geometry, material );

        this.par.content3d.add(curveObject);

        this.drag=function(point,point1,up,mat){
            trace(mat)
            curveObject.material.color=mat.color
            curveObject.material.transparent=true
            curveObject.material.opacity=0.5

            var position = geometry.attributes.position;
            let kolPoint=1/(ARC_SEGMENTS-1);
            let p,p1;        
            for (let i = 0; i < ARC_SEGMENTS; i++) {
                p=getPros3d(point, point1,kolPoint*i);
                p1=Math.sin((i/(ARC_SEGMENTS-1))*Math.PI)
                position.setXYZ( i, p.x,p.y+up*p1,p.z );
            }
            position.needsUpdate = true;
        }

        function getPros3d(p,p1,pros){
            var v=new THREE.Vector3(0,0,0);
            v.x=p.x*pros+p1.x*(1-pros);
            v.y=p.y*pros+p1.y*(1-pros);
            v.z=p.z*pros+p1.z*(1-pros);
            return v;
        }
    }
}




