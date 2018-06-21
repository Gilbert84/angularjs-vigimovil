

export class TipoMarcador{

    public _id:number;
    public nombre:string='marcador';
    public img:string='';


    constructor(
        _id?:number,
        nombre?:string,
        img?:string
    ){

        this._id=_id;
        this.nombre=nombre || this.nombre;
        this.img=img;

    }
}

export class Marcador {



    public lat:number;
    public lng:number;
    public direccion:string;
    public codigo:string;
    public arrastable:boolean=true;//arrastable
    public tipo:TipoMarcador;
    public nombre?:string='marcador';
    public descripcion?:string ='Sin descipcion';
    public _id?:string;


    constructor(
        lat:number,
        lng:number,
        direccion:string,
        codigo:string,
        _id?:string
    ){
        this.lat=lat;
        this.lng=lng
        this.direccion=direccion;
        this.codigo=codigo;
        this.nombre=this.nombre;
        this.descripcion=this.descripcion;
        this.arrastable=true;
        this.tipo=new TipoMarcador();
        this._id=_id;
    }
}


export class Origen {

    public coords=[];
    
    constructor(coords){
        this.coords = coords;
    }
}

export class Destino {

    public coords = [];
    
    constructor(coords){
        this.coords = coords;
    }
}


export class Ruta {

    public origen:Origen;
    public destino:Destino;
    public puntosRef: any = [];
    public visible:boolean;
    public puntosControl:any = [];
    public _id?:string;
    public nombre?:string='';
    public codigo?:string=''


    constructor(origen:Origen,destino:Destino){
        this.origen = new Origen(origen);
        this.destino = new Destino(destino);
        this.puntosRef=this.puntosRef;
        this.puntosControl=this.puntosControl;
        this.visible=this.visible=true;
        this._id=this._id;
        this.nombre=this.nombre;
        this.codigo=this.codigo;

    }
}