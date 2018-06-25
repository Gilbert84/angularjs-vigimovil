export class Dispositivo {

    constructor(
        public nombre?:string,
        public uuid?: string,
        public mac?:string,
        public imei?:string,
        public imsi?:string,
        public iccid?:string,
        public categoria?:string,
        public _id?:string,
        public activo?:boolean,
    ){}
}