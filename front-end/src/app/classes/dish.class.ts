export default class CDish {
    
    private id: number;
    private name: String;
    private idSchool: number;

    constructor(id: number, name: string, idSchool: number) {
        this.id= id;
        this.name= name;
        this.idSchool= idSchool;
    }

    public getId(){
        return this.id;
    }
    
    public getIdSchool(){
        return this.idSchool;
    }

    public getName() {
        return this.name;
    }

    public setId(id) {
        this.id= id;
    }

    public setIdSchool(idSchool) {
        this.idSchool= idSchool;
    }

    public setName(name) {
        this.name= name;
    }

}