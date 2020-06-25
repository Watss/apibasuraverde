  
import "reflect-metadata";
import { Container } from 'inversify';
import * as functions from 'firebase-functions';
//import * as express from 'express';
import * as bodyParser from "body-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import './controller/PuntosController';
import * as admin from 'firebase-admin';
import TYPES from './utils/TYPES';
import { FirebasePuntosRepository } from "./context/Puntos/Infrastructure/Firebase/FirebasePuntosRepository";
import { GetAllPuntos } from "./context/Puntos/Application/getAllPuntos";
import { SaveAllPuntos } from "./context/Puntos/Application/saveAllPuntos";
import { PuntosRepository } from "./context/Puntos/Domain/PuntosRepository";

admin.initializeApp(functions.config().firebase)



const DIcontainer = new Container();
DIcontainer.bind<PuntosRepository>(TYPES.PuntosRepository).to(FirebasePuntosRepository);
DIcontainer.bind<GetAllPuntos>(TYPES.getAllPuntos).to(GetAllPuntos);
DIcontainer.bind<SaveAllPuntos>(TYPES.saveAllPuntos).to(SaveAllPuntos);
let server = new InversifyExpressServer(DIcontainer, null, { rootPath: "/v1" });


//DIcontainer.bind<getAllPatient>(TYPES.getAllPatient).to(getAllPatient);

//Config firebase admin


// Init server

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let appServer = server.build();

export const api = functions.https.onRequest(appServer);