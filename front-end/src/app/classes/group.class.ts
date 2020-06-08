export default class CGroup {
    
    private id: number;
    private name: String;
    private idSchool: number;
    private idTutor: number;

    constructor(id: number, name: string, idSchool: number, idTutor: number) {
        this.id= id;
        this.name= name;
        this.idSchool= idSchool;
        this.idTutor= idTutor;
    }

    public getId(){
        return this.id;
    }

    public getIdSchool(){
        return this.idSchool;
    }

    public getIdTutor(){
        return this.idTutor;
    }

    public getName() {
        return this.name;
    }

    public setId(id) {
        this.id= id;
    }

    public setName(name) {
        this.name= name;
    }

    public setIdSchool(idSchool) {
        this.idSchool= idSchool;
    }

    public setIdTutor(idTutor) {
        this.idTutor= idTutor;
    }

}