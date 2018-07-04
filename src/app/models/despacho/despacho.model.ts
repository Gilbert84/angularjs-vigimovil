export class Asignacion {
  public fechaHora: Date;
  public disponible: boolean = true;
  public operario: string;
  public vehiculo: string;
  public _id: string;

  constructor() {
    this.fechaHora = new Date();
    this.disponible = this.disponible;
    this.operario = this.operario;
    this.vehiculo = this.vehiculo;
    this._id = this._id;
  }
}

export class Pasajeros {
  public ingresosPuerta1: number = 0;
  public ingresosPuerta2: number = 0;
  public salidasPuerta1: number = 0;
  public salidasPuerta2: number = 0;
    constructor () {
      this.ingresosPuerta1 = this.ingresosPuerta1;
      this.ingresosPuerta2 = this.ingresosPuerta2;
      this.salidasPuerta1 = this.salidasPuerta1;
      this.salidasPuerta2 = this.salidasPuerta2;
    }
}

export class Estado {
  public mensaje: string = 'sin definir';
  public codigo: number = 0;
  constructor() {
    this.mensaje = this.mensaje;
    this.codigo = this.codigo;
  }
}

export class Viaje {
  public fechaHoraInicio?: Date;
  public fechaHoraFin?: Date;
  public pasajeros?: Pasajeros;
  public estado?: Estado;
  public asignacion?: string;
  public ruta?: string;
  public _id?: string;

  constructor() {
    this.fechaHoraInicio = this.fechaHoraInicio;
    this.fechaHoraFin = this.fechaHoraFin;
    this.pasajeros = new Pasajeros();
    this.estado = new Estado;
    this.asignacion = this.asignacion;
    this.ruta = this.ruta;
    this._id = this._id;


  }
}
