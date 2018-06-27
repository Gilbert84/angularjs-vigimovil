export class Asignacion {
    public fechaHora?: Date;
    public disponible?: boolean;
    public operario?:string;
    public vehiculo?:string;
    public _id?: string;
  
    constructor() {



    }
}

export class Viaje {
    public fechaHoraInicio?: Date;
    public fechaHoraFin?: Date;
    public pasajeros?: Object;
    public estado?: Object;
    public asigancion?: string;
    public ruta?: string;
    public _id?: string;

  
    constructor() {



    }
}
  