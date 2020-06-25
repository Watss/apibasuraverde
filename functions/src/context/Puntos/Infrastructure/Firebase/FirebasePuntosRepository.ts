import { PuntosRepository } from "../../Domain/PuntosRepository";
import { injectable } from "inversify";
import { Punto } from "../../Domain/Punto";
import admin from "firebase-admin";

@injectable()
export class FirebasePuntosRepository implements PuntosRepository{
    

    
    async getAll(): Promise<any> {
        const db = admin.firestore()
        const docs = await db.collection('/puntos').orderBy('id','asc').get()
       
        const listadoPuntos : Punto[] = [];
        docs.forEach(
          (doc) => {
            var data = doc.data();
            var puntoRecogido = new Punto(
                data.id,data.titulo,data.descripcion,data.latitud,data.longitud
            )
            listadoPuntos.push(puntoRecogido);
          }
        );
        
       

        return listadoPuntos;
    }
    async saveAll(listadoPuntos: Punto[]): Promise<any> {
         listadoPuntos.forEach(  (asdPunto) =>   this.savePunto (asdPunto) )
        return "coso";
    }

    async savePunto(punto : Punto) : Promise<any> {
        const db = admin.firestore();
        var savePunto = db.collection("puntos").add(punto.toJSON())
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        console.log(savePunto)  

        return savePunto;
    }
    
}