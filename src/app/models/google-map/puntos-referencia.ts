
interface DatosLocation {
    lat:number;
    lng:number;
}

interface DatosPuntosReferencia {
    location: DatosLocation;
    stopover: boolean;
}

class Location {
    lat:number;
    lng:number;

    constructor(datosLocation?:DatosLocation){
        this.lat = datosLocation && datosLocation.lat || 6.123456
        this.lng = datosLocation && datosLocation.lng || -75.123456
    }
}

export class PuntosReferencia {
    
    location: Location;
    stopover: boolean;

    constructor( puntosReferencia:PuntosReferencia){
        this.location = puntosReferencia && puntosReferencia.location || new Location();
        this.stopover = puntosReferencia && puntosReferencia.stopover || false;
    }
}