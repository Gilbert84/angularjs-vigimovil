export class Asignacion {
  public fechaHora: Date;
  public disponible: boolean = false;
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

export class Viaje {
  public fechaHoraInicio?: Date;
  public fechaHoraFin?: Date;
  public pasajeros?: Object;
  public estado?: Object;
  public asigancion?: string;
  public ruta?: string;
  public _id?: string;

  constructor() {}
}
