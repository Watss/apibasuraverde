import 'reflect-metadata';
import puntosJson from '../utils/puntos.json'
import * as express from "express";
import { interfaces, controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { GetAllPuntos } from "../context/Puntos/Application/getAllPuntos";
import { SaveAllPuntos } from "../context/Puntos/Application/saveAllPuntos";
import TYPES from '../utils/TYPES';
import { Punto } from '../context/Puntos/Domain/Punto';
//import { Punto } from "../context/Puntos/Domain/Punto";

@controller("/puntos")
export class PuntosController implements interfaces.Controller {
   
   
    protected getAllPuntos : GetAllPuntos;
    protected saveAllPuntos : SaveAllPuntos;

   constructor( @inject(TYPES.getAllPuntos) getPuntos: GetAllPuntos, @inject(TYPES.saveAllPuntos) savePuntos : SaveAllPuntos ) {
      this.getAllPuntos = getPuntos;
      this.saveAllPuntos = savePuntos;
   }

    @httpGet("/getAll")
    async getAll(req: express.Request, res: express.Response, next: express.NextFunction){
        //
        try { 
             res.status(200).send(await this.getAllPuntos.getAllPuntos());
        } catch (error) {
             res.status(500).send('f')
        }   
        
    }

    @httpGet("/saveAll")
    async saveAll(req: express.Request, res: express.Response, next: express.NextFunction){
        var listadoPuntos : Punto[] = [];
        var data = puntosJson;
       
        for (var clave in data) {
            if (data.hasOwnProperty(clave)) {
                var punto : Punto = new Punto(data[clave].id,data[clave].titulo, data[clave].descripcion, data[clave].latitud.toString() , data[clave].longitud.toString());
                console.log('punto ' +punto.titulo + ' Creado con Exito Tipo: ');
                listadoPuntos.push(punto);
              }
        }
        try {
            var respuesta = await this.saveAllPuntos.saveAllPuntos(listadoPuntos)
            res.status(200).send(respuesta);
        } catch (error) {
            res.status(500).send('f')
        }   
        
    } 
        
}