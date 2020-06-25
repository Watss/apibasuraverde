import { injectable, inject } from "inversify";
import { PuntosRepository } from "../Domain/PuntosRepository";
import TYPES from "../../../utils/TYPES";

@injectable()
export class GetAllPuntos {

    private puntosRepository : PuntosRepository;

    constructor(@inject(TYPES.PuntosRepository) puntosRepository : PuntosRepository){
        this.puntosRepository = puntosRepository;
    }

    getAllPuntos () : Promise<any> {
        return this.puntosRepository.getAll(); 
    }
}