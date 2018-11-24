export class UsuarioModel {
    constructor(
        public idusuario: number = null,
        public idorg: number = null,
        public idsede: number = 0,
        public nombres: string = '',
        public usuario: string = '',
        public password: string = '',
        public estado: number = 0
    ) {

    }
}
