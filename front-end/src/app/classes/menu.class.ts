export default class CMenu {
    
    private id: number;
    private name: String;
    private idBreakfast: number;
    private idStarter: number;
    private idMain: number;
    private idDessert: number;
    private idSnack: number;
    private idSchool: number;

    constructor(id: number, name: string, idBreakfast: number, idStarter: number, idMain: number, idDessert: number, idSnack: number, idSchool: number) {
        this.id= id;
        this.name= name;
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

    public getId(){
        return this.id;
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

}