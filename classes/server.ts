import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server{
    private static _instance:Server;

    public app:express.Application;
    public port:number;

    /**
     * @param io es el servdor de sockets, tiene el conocimiento de quien está conectado
     */
    public io:socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){
        console.log('Escuchando conexione -Scokets');
        this.io.on('connection',cliente =>{
            
            //Conectar cliente
            socket.conectarCliente(cliente);    

            //Mensajes
            socket.mensaje(cliente, this.io)
            //Desconectar
            socket.desconectar(cliente);
            
            //Configurar usuario
            socket.configurarUsuario(cliente, this.io);
        })
    }

    start(){
        this.httpServer.listen(this.port);
        console.log(`Iniciando en el pruerto ${this.port}`);
    }
}