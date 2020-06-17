import { Usuario } from "./usuario";

export class UsuariosLista{
    private lista:Usuario[]=[];

    constructor(){}

    //Agregar el usuairo
    public agregar(usuario:Usuario): Usuario{
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('====Actualizando Usuario=====');
        console.log(this.lista);
    }

    //Obtener lista
    public getLista(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find(usuario =>  usuario.id === id)
    }

    //Obtener usuairo en unsa sala en particular
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario => usuario.sala === sala)
    }

    //Borrar usuario
    public borrarUsusario(id:string){
        const tempUsuairo = this.getUsuario(id);
        this.lista = this.lista.filter( usuario =>usuario.id !== id);
        return tempUsuairo;
    }
}