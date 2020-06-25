export class Punto{
    id: number
    titulo : string
    descripcion : string
    latitud : string 
    longitud : string
    tipo : string = '';

    constructor(id : number, titulo : string, descripcion : string, latitud : string, longitud : string){
        this.titulo = titulo;
        this.id = id;
        this.descripcion = descripcion;
        this.latitud = latitud;
        this.longitud = longitud;
       // this.tipo = tipo;
    }

    public determinarTipo() : void{
        
        this.tipo = 'coso';
    }

    toJSON() {
        return {
          id: this.id,
          titulo:  this.titulo,
          descripcion:   this.descripcion,
          latitud : this.latitud,
          longitud :this.longitud,
          tipo : this.tipo,
        };
      }
}