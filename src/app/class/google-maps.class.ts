

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

    public origen:Marcador;
    
    constructor(origen:Marcador){
        this.origen = new Marcador(origen.lat,origen.lng,origen.direccion,origen.codigo);
    }
}

export class Destino {

    public destino:Marcador;
    
    constructor(destino:Marcador){
        this.destino = new Marcador(destino.lat,destino.lng,destino.direccion,destino.codigo);
    }
}


export class Ruta {

    public origen:Origen;
    public destino:Destino;

    constructor(origen:Marcador,destino:Marcador){
        this.origen = new Origen(origen);
        this.destino = new Destino(destino);
    }
}