export class TipoMarcador {
  public _id: number;
  public nombre: string = 'marcador';
  public img: string = '';

  constructor(_id?: number, nombre?: string, img?: string) {
    this._id = _id;
    this.nombre = nombre || this.nombre;
    this.img = img || this.img;
  }
}

export class Marcador {
  public lat: number;
  public lng: number;
  public direccion: string;
  public codigo: string;
  public arrastable: boolean = true; //arrastable
  public tipo: TipoMarcador;
  public nombre?: string = 'marcador';
  public descripcion?: string = 'Sin descipcion';
  public _id?: string;

  constructor(lat: number, lng: number, direccion: string, codigo: string) {
    this.lat = lat;
    this.lng = lng;
    this.direccion = direccion;
    this.codigo = codigo;
    this.nombre = this.nombre;
    this.descripcion = this.descripcion;
    this.arrastable = true;
    this.tipo = new TipoMarcador();
    this._id = this._id;
  }
}

export class Ruta {
  public origen: Marcador;
  public destino: Marcador;
  public puntosRef: any = [];
  public visible: boolean;
  public puntosControl: any = [];
  public _id?: string;
  public nombre: string = '';
  public codigo?: string = '';
  public distancia?:Object = {};
  public duraccion?:Object = {};
  public pasos?: any = [];

  constructor(origen: Marcador, destino: Marcador) {
    this.origen = new Marcador(
      origen.lat,
      origen.lng,
      origen.direccion,
      origen.codigo
    );
    this.destino = new Marcador(
      destino.lat,
      destino.lng,
      destino.direccion,
      destino.codigo
    );
    this.puntosRef = this.puntosRef;
    this.puntosControl = this.puntosControl;
    this.visible = this.visible = false;
    this._id = this._id;
    this.nombre = this.nombre;
    this.codigo = this.codigo;
    this.distancia = this.distancia;
    this.duraccion = this.duraccion;
    this.pasos = this.pasos;
  }
}
