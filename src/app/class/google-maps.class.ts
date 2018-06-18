

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
    public arrastable:boolean=true;//arrastable
    public tipo:TipoMarcador;
    public nombre?:string='marcador';
    public titulo? : string ='Sin titulo';
    public descripcion?:string ='Sin descipcion';


    constructor(
        lat:number,
        lng:number,
        direccion:string
    ){
        this.lat=lat;
        this.lng=lng
        this.direccion=direccion;
        this.nombre=this.nombre;
        this.titulo=this.titulo;
        this.descripcion=this.descripcion;
        this.arrastable=true;
        this.tipo=new TipoMarcador();
    }
}