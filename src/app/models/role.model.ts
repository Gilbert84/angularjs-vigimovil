export class Role {

    public nombre: string='';
    public _id?: string;

    constructor (
        nombre: string,
        img?: string,
        _id?: string
    ) {
        this.nombre=nombre;
        this._id=_id;

    }

}
