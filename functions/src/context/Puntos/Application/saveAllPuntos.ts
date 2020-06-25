import { PuntosRepository } from "../Domain/PuntosRepository";
import { inject, injectable } from "inversify";
import { Punto } from "../Domain/Punto";
import TYPES from "../../../utils/TYPES";
@injectable()
export class SaveAllPuntos {
    
    private puntosRepository : PuntosRepository
    
    constructor(@inject(TYPES.PuntosRepository) puntosRepository : PuntosRepository){
        this.puntosRepository = puntosRepository;
    }

    saveAllPuntos(listado: Punto[]) : Promise<any> {
       console.log(listado);
       listado.forEach( (punto) => punto.determinarTipo );
       console.log(listado);
       return this.puntosRepository.saveAll(listado);
    }
}