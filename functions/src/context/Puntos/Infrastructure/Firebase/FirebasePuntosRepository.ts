import { PuntosRepository } from "../../Domain/PuntosRepository";
import { injectable } from "inversify";
import { Punto } from "../../Domain/Punto";
import admin from "firebase-admin";

@injectable()
export class FirebasePuntosRepository implements PuntosRepository{
    

    
    getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async saveAll(listadoPuntos: Punto[]): Promise<any> {
        await  listadoPuntos.forEach( async (Punto) =>  await this.savePunto (Punto) )
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

        return true;
    }
    
}