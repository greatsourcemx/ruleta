
export class Usuario {
    constructor (
        public Id: number = 0,
        public Nombre: string = '',
        public NombreUsuario: string = '',
        public Password: string = '',
        public Token: string = '',
        public RolId: number = 0
    ) { }
}
