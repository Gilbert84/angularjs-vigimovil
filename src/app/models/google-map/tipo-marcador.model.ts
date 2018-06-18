export class TipoMarcador {

    public nombre: string='marcador';
    public img?: string;
    public _id?: string;

    constructor (
        nombre: string,
        img?: string,
        _id?: string
    ) {
        this.nombre=nombre;
        this.img=img;
        this._id=_id;

    }

}
