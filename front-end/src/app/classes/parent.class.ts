export default class CParent {
    
    private id: number;
    private name: String;
    private surname: String;
    private type: number;
    private idSchool: number;

    constructor(id: number, name: string, surname: string, type: number, idSchool: number) {
        this.id= id;
        this.name= name;
        this.surname= surname;
        this.type= type;
        this.idSchool= idSchool;
    }

    public getId(){
        return this.id;
    }

    public getIdSchool(){
        return this.idSchool;
    }

    public getType(){
        return this.type;
    }

    public getName() {
        return this.name;
    }

    public getSurname() {
        return this.surname;
    }

    public setId(id) {
        this.id= id;
    }

    public setIdSchool(idSchool) {
        this.idSchool= idSchool;
    }

    public setType(type) {
        this.type= type;
    }

    public setName(name) {
        this.name= name;
    }

    public setSurname(surname) {
        this.surname= surname;
    }

}