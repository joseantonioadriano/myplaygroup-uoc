export default class CAssignment {
    
    private idStudent: number;
    private idBreakfast: number;
    private idStarter: number;
    private idMain: number;
    private idDessert: number;
    private idSnack: number;
    private idSchool: number;
    private idGroup: number;

    constructor(idGroup: number, idStudent: number, idBreakfast: number, idStarter: number, idMain: number, idDessert: number, idSnack: number, idSchool: number) {
        this.idGroup= idGroup;
        this.idStudent= idStudent;
        this.idBreakfast= idBreakfast;
        this.idStarter= idStarter;
        this.idMain= idMain;
        this.idDessert= idDessert;
        this.idSnack= idSnack;       
        this.idSchool= idSchool; 
    }

    public getIdBreakfast(){
        return this.idBreakfast;
    }

    public setIdBreakfast(idBreakfast){
        this.idBreakfast= idBreakfast;
    }

    public getIdGroup(){
        return this.idGroup;
    }

    public setIdGroup(idGroup){
        this.idGroup= idGroup;
    }

    public getIdStudent(){
        return this.idStudent;
    }

    public setIdStudent(idStudent){
        this.idStudent= idStudent;
    }

    public getIdStarter(){
        return this.idStarter;
    }

    public setIdStarter(idStarter){
        this.idStarter= idStarter;
    }

    public getIdMain(){
        return this.idMain;
    }

    public setIdMain(idMain){
        this.idMain= idMain;
    }

    public getIdDessert(){
        return this.idDessert;
    }

    public getIdSchool(){
        return this.idSchool;
    }

    public setIdDessert(idDessert){
        this.idDessert= idDessert;
    }

    public setIdSchool(idSchool){
        this.idSchool= idSchool;
    }

    public getIdSnack(){
        return this.idSnack;
    }

    public setIdSnack(idSnack){
        this.idSnack= idSnack;
    }

}