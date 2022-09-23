import FirebaseService from './ServiceController';


export default class IServices {
    

    constructor(idCollection){
        this.service = new FirebaseService(idCollection);
        this.listCollection = [];
        this.ID_COLLECTION = idCollection;
    }

   

    async addDocument(pDocument){
        try{
            let response =  await this.service.addDocument(pDocument);
            return response;

        }catch(bError){
            throw new Error("Error al agregar el documento en la colección : ", this.ID_COLLECTION);
        }
    }

    async deleteDocument(pDocumentId){
        try{
            await this.service.deleteDocument(pDocumentId);
        }catch(bError){
            console.Error(bError);
            throw new Error("Error al eliminar el componente de la coleccion: ", this.ID_COLLECTION);

        }
    }

    // Obtiene los documentos de firebase y los guarda en memoria
    async #getDocsFirebase(){
        let firebaseResponse =  await this.service.getAllDocumentsCollection();
        return this.convertResponse(firebaseResponse);
    }

    // Obtiene los componentes de firebase siempre y cuando en no haya cargados componentes en memoria
    async getCollection(){
        try{
            return await this.#getDocsFirebase();
           
        }catch(bError){
            console.error(bError);
            throw new Error("Error al obtener los documentos de la colección", this.ID_COLLECTION);
        }
    }

    async getComponent(pIdDocument){
        try{
            return await this.service.getDocument(pIdDocument);

        }catch(bError){
            console.error(bError);
        console.log("Consulta a firebase")
            throw new Error("Error al obtener el documento de la colección:",this.ID_COLLECTION);
        }
    }

    async updateComponent(pIdDocument,pFields){
        try{
            await this.service.updateDocumentFields(pIdDocument,pFields)
        }catch(bError)
        {
            console.error(bError);
            throw new Error("Error al actualizar el documento de la coleccion: ",this.ID_COLLECTION)
        }

    }

    //Convierte coleccion de firestore a lista con objetos.
    convertResponse(cFirestoreData) {
        try{
            let clientData = new Object();
            let listClients = [];
            cFirestoreData.forEach((doc) => {
                clientData = doc.data();
                clientData.id = doc.id;
                listClients.push(clientData)
            });
            return listClients;
        }catch(bError){
            console.error(bError);
            throw new Error("Error al convertir la respuesta  de collecion firebase a un listado");
        }
        
    }
}