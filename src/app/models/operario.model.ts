export class Operario {

    constructor(
        public nombre?: string,
        public alias?:string,
        public password?:string,
        public identificacion?:number,
        public disponible?:boolean,
        public img?: string,
        public usuario?: string,
        public empresa?: string,
        public _id?: string
    ) { }
}
