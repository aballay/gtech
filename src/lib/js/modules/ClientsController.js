import ServiceClient from "../../../services/collections/ServiceClient";
import HelperControllers from "./HelperControllers";

export default class ClientsController {
    constructor() {
        this.serviceClients = new ServiceClient();
    }

    async getClients(){
        return await this.serviceClients.getClients()
    }

}