export default class CTeacher {
    
    private id: number;
    private name: String;
    private surname: String;
    private idSchool: number;

    constructor(id: number, name: string, surname: string, idSchool: number) {
        this.id= id;
        this.name= name;
        this.surname= surname;
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

    public getSurname() {
        return this.surname;
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

    public setSurname(surname) {
        this.surname= surname;
    }

}