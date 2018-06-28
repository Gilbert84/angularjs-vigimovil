export class Estado{

    public nombre: string='';
    public _id?: string;

    constructor (
        nombre: string,
        _id?: string
    ) {
        this.nombre=nombre;
        this._id=_id;

    }

}
