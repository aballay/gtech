import IServices from "../IServices";

const ID_COLLECTION_KEY = "Clients";

export default class ServiceClient extends IServices{

    constructor(){
        super(ID_COLLECTION_KEY);
    }

    //Agregar cliente a coleccion de clientes en firebase
    // params : Objeto de tipo Client
    addClient(pClientObject){
        try{
            this.addDocument(pClientObject);
        }catch(err){
            console.error(err);
            throw new Error("Error al cargar al cliente en ServiceClient",err)
        }
    }

    //Obtener listado de clientes 
    async getClients(){
        return await this.getCollection()
    }

}