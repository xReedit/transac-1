export class ClienteModel {
    constructor(
        public idcliente:number=null,
        public idorg:number=null,
        public idsede:number=null,
        public nombres:string=null,
        public dni:string=null,
        public telefono:string=null,
        public direccion:string=null,
        public estado:number=0
        
    ){

    }
}