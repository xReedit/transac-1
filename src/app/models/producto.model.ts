export class ProductoModel {
    constructor(
        public idproducto:number=null,
        public idorg:number=null,
        public idsede:number=null,
        public idcategoria:number=null,
        public idmarca:number=null,        
        public descripcion:string=null,        
        public precio1:string=null,
        public precio2:string=null,
        public glosa:string=null,
        public estado:number=0
        
    ){

    }
}