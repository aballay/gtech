import { getFirestore, collection, query, where, getDocs, deleteDoc, getDoc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { appfb } from "../fb"

export default class FirebaseService {
    constructor(idCollection) {
        //define y crea el servicio
        // Initialize Firebase
        this.app = appfb;
        //instancia la base de datos
        this.db = getFirestore(appfb);

        this.COLLECTION_NAME = idCollection;
    }
    // Añade un documento a la coleccion con un id predefindo.
    async addDocumentWithId(pDocument, pIdDocument) {
        return await setDoc(doc(this.db, this.COLLECTION_NAME, pIdDocument), pDocument);
    }
    // Añade un documento a la coleccion con un id automatico generado por firebase.
    // Retorna el id del elemento.
    async addDocument(pDocument) {
        const docSnap = await addDoc(collection(this.db, this.COLLECTION_NAME), pDocument);
        return docSnap.id
    }

    // Elimina un documento de la coleccion a traves de su id.
    async deleteDocument(pIdDocument) {
        try {
            const quert = await deleteDoc(doc(this.db, this.COLLECTION_NAME, pIdDocument));
        } catch (bError) {
            console.error(bError);
            return new Error("No se ha podido eliminar el componente en firebase")
        }
    }


    async getAllDocumentsCollection(){
        try {
            const q = query(collection(getFirestore(appfb), this.COLLECTION_NAME));
            return await getDocs(q);

        } catch (bError) {
            console.error(bError);
            return new Error("Error al recuperar la coleccion de firebase.")
        }
    }


    async updateDocumentFields( pIdDocument, pFields) {
        const docRef = doc(this.db, this.COLLECTION_NAME, pIdDocument);
        await updateDoc(docRef, pFields)
    }
    //////// 
    // Actualiza le estado de un componente.
    //
    async updateComponentState( pIdDocument, pState) {
        const docRef = doc(this.db,this.COLLECTION_NAME, pIdDocument);
        await updateDoc(docRef, {
            state: pState
        })
    }
    async updateComponentBranch(pIdDocument,pBranch){
        const docRef = doc(this.db, this.COLLECTION_NAME, pIdDocument);
        await updateDoc(docRef, {
            branch: pBranch
        })
    }
    // Actualiza el campo de un documento de una coleccion dada, utiliza
    async updateAddComponentToClient( pIdDocument, pFieldData) {
        // Create an initial document to update.
        const docRef = doc(this.db, this.COLLECTION_NAME, pIdDocument);
        // Atomically add a new region to the "regions" array field.
        await updateDoc(docRef, {
            componentsRegister: arrayUnion(pFieldData)
        });
    }

    // Obtiene la referncia de un documento dentro de una coleccion
    getDocumentReference( pIdDocument) {
        return doc(this.db, this.COLLECTION_NAME, pIdDocument);
    }
    // Añade un documento a la coleccion con un id predefindo.
    async addDocumentPredefinedId( pDocument, pIdDocument) {
        return await setDoc(doc(this.db, this.COLLECTION_NAME, pIdDocument), pDocument);
    }
    // Añade un documento a la coleccion con un id automatico generado por firebase.
    // Retorna el id del elemento.
    
    //Retorna true o false dependiendo si existe el documento.
    async existDocument( pIdDocument) {
        const docRef = doc(this.db, this.COLLECTION_NAME, pIdDocument);
        const mDoc = await getDoc(docRef);

        return (mDoc.exists() ? true : false);

    }
    // Obtiene un documento de una coleccion especifica a traves de su id.
    async getDocument( pIdDocument) {
        const docRef = doc(this.db, this.COLLECTION_NAME, pIdDocument);
        return await getDoc(docRef);
    }
    // Obtiene los datos de toda la coleccion.
    async getCollection() {
        try {
            const q = query(collection(getFirestore(appfb), this.COLLECTION_NAME));
            return await getDocs(q);

        } catch (bError) {
            return new Error("Fallo la conexion con el servidor.", bError)
        }
    }

    async getDocsQuery( pFieldString, pField) {
        // Create a reference to the cities collection
        const q = query(collection(this.db, this.COLLECTION_NAME), where(pField, "==", pFieldString));

        return await getDocs(q);

    }
    async getDocsQueryOperator( pField,pFieldValue,pOperator) {
        // Create a reference to the cities collection
        const q = query(collection(this.db, this.COLLECTION_NAME), where(pField, pOperator,pFieldValue));
        return await getDocs(q);

    }

   // pIdCollection,pIdDocument,pBranch
   // Actualiza los componentes al modificar una sucursal.
    async getDocsQueryAndModifiedField(pNameField,pValueField,pNewValueField){
        const q = query(collection(this.db,this.COLLECTION_NAME), where(pNameField, "==",pValueField))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            await this.updateComponentBranch(this.COLLECTION_NAME,doc.id,pNewValueField)
          });
    }



}