const C_CLIENT_SCORE = {
    data: [1,2,3,4,5],
    defectValue : 3
};

export  class Client {
    constructor(surnames,names,dni,adress,notes,phone,email,dateUp,lastUpdate,score) {
        this.surname=surnames;
        this.name=names;
        this.dni=dni;
        this.adress=adress;
        this.notes=notes;
        this.phone=phone;
        this.email=email;
        this.dateUp= dateUp;
        this.lastUpdate= lastUpdate;
        this.score = score;
        
    }

    static getScoreData(){
        return C_CLIENT_SCORE;
    }
    
}
