import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar  = (cliente:Socket)=>{

    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsusario(cliente.id);
    })

}
//Escuchar mensajes
export const mensaje = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje', (payload:{de:string, cuerpo:string})=>{
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
        /**Emitimos a todos los clientes conectados */
    });
}

//
/**
 * Confgurar usuario 
 * @param cliente es el cliente que mandamos en la conexión
 * @param io es el socket global
 */
export const configurarUsuario = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload:{nombre:string}, callback:Function)=>{

    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
       
    callback({
        ok:true,
        mensaje: `Usuario ${payload.nombre}, configurado`
    })
    });
}

