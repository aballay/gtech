export default class UtilitiesShared{

    // Keys para el tipo de dataTable a renderizar.
    static TYPES_DATA_TABLES_KEY = {
        CLIENT:"client",
        COMPONENTS:"components"
    }

    //Tabs de componentes
    static TYPES_COMPONENTS = {
        IN_REPAIRED: "0",
        DELIVERED: "1",
    }

    //Columnas para type client
    static COLUMNS_CLIENTS = [
        { title: "Id", data: 'id' },
        { title: "Apellido", data: 'surname' },
        { title: "Nombre", data: 'name' },
        { title: "Celular", data: 'phone' },
        { title: "Direccion", data: 'adress' },
        { title: "DNI", data: "dni" },
        { title: "Email", data: 'email' },
        { title: "Notas", data: 'notes' },
      ]

    //Altura de tabla clientes
    static HEIGHT_DATA_TABLE_CLIENTS = 350;

    static serializeToDataTable = (pList) => {
            let newArray = []
            pList.map((client) => {
                client.id = client.dni
                newArray.push(client)
            })
            return newArray;
    }

    //Obtiene los tipos de dataTable
    // static getDataTableKeys(){
    //     return this.TYPES_DATA_TABLES_KEY;
    // }

    // //Obtiene los tipos de componentes.
    // static getTypesComponents(){
    //     return this.TYPES_COMPONENTS;
    // }

    // static getDataTableClientsHeight(){
    //     return this.HEIGHT_DATA_TABLE_CLIENTS;
    // }

    // static getColumnsClients(){
    //     return this.COLUMNS_CLIENTS;
    // }
}   