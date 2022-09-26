import { createContext, useState } from 'react';
import UtilitiesShared from '../../shared/utilities/UtilitiesShared';
import ClientsController from '../../lib/js/modules/ClientsController';

const clientsController = new ClientsController();

const ControllerProvider = ({ children }) => {

   
    //Definimos el state para los clientes
    const [clients,setClients] = useState(0);

    

    const isFirstTime = (pAttr) => {
        if (typeof pAttr === 'number') {
            return true
        }
        return false
    }

    // Obtiene listado de clientes.
    // Si el listado ya esta inicializado devuelve el listado, sino consulta a firebase.
    const getClients = async () => {
        if (isFirstTime(clients)) {
            let xClients = await clientsController.getClients();
            setClients(xClients);
            return xClients;
        }
        return clients;
    }

      // aqyu se especifican los metodos a exportar para ser usados por los hijos del contexto.
      const METHODS = {
        getClients,
    }


    return (
        <AppContext.Provider value={METHODS}>
            {children}
        </AppContext.Provider>
    );
}

export default ControllerProvider;
export const AppContext = createContext();