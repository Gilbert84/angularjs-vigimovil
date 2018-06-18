
export interface TipoMarcadorRef {
    nombre?:string;
    _id?:string;
    img?:string;
}

export interface MarcadorRef {//MarketGoogleMaps
    lat:number;
    lng:number;
    arrastable:boolean;//arrastable
    tipo:TipoMarcadorRef;
    nombre?:string;
    titulo? : string;
    descripcion?:string;
}