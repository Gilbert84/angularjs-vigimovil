export class Vehiculo {

    constructor(
        public _id?: string,
        public placa?: string,
        public modelo?:string,
        public categoria?:string,
        public capacidad?:string,
        public img?: string,
        public usuario?: string,
        public empresa?: string,
        public dispositivo?:string
    ) { }
}