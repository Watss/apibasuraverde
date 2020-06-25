import { Punto } from "./Punto";


export interface PuntosRepository{

    getAll() : Promise<any>;
    
    saveAll(listadoPuntos : Punto[] ) : Promise<any>;

}