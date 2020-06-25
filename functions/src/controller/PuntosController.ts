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
            return this.getAllPuntos.getAllPuntos(); 
        } catch (error) {
            return [];
        }   
        
    }

    @httpGet("/saveAll")
    async saveAll(req: express.Request, res: express.Response, next: express.NextFunction){
       var listadoPuntos : Punto[] = []; 
        try {
            return this.saveAllPuntos.saveAllPuntos(listadoPuntos)
        } catch (error) {
            return [];
        }   
        
    } 
        
}