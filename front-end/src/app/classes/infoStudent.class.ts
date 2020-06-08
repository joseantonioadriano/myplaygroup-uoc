import CIntolerance from './intolerance.class';

export default class CInfoStudent {
    
    private id: number;
    private idTutor: number;
    private idGroup: number;
    private idSchool: number; 
    private nameTutor: string;
    private nameGroup: string;
    private nameSchool: string; 
    private intolerancesArray: CIntolerance[] = [];
    private age: number;
    private namePicture: string;

    constructor(id: number, idTutor: number, idGroup: number, idSchool: number, nameTutor: string, nameGroup: string, nameSchool: string, intolerances: CIntolerance[], age: number, namePicture: string) {
        this.id= id;
        this.idTutor= idTutor;
        this.idGroup= idGroup;
        this.idSchool= idSchool;
        this.nameTutor= nameTutor;
        this.nameGroup= nameGroup;
        this.nameSchool= nameSchool;
        (intolerances===null || intolerances===undefined) ? null : this.copyintolerances(intolerances);              
        this.age= age;
        this.namePicture= namePicture;
    }

    private copyintolerances(intolerances: CIntolerance[]){
        this.intolerancesArray= [];
        for(let i= 0; i< intolerances.length; i++){
            this.intolerancesArray.push(intolerances[i]);
        }
    }

    public getId(){
        return this.id;
    }

    public setId(id) {
        this.id= id;
    }

    public getNamePicture(){
        return this.namePicture;
    }

    public setNamePicture(namePicture) {
        this.namePicture= namePicture;
    }
        
    public getAge(){
        return this.age;
    }

    public setAge(age) {
        this.age= age;
    }

    public getIdTutor(){
        return this.idTutor;
    }

    public setIdTutor(idTutor) {
        this.idTutor= idTutor;
    }

    public getIdGroup(){
        return this.idGroup;
    }

    public setIdGroup(idGroup) {
        this.idGroup= idGroup;
    }

    public getIdSchool(){
        return this.idSchool;
    }

    public setIdSchool(idSchool) {
        this.idSchool= idSchool;
    }

    public getNameTutor() {
        return this.nameTutor;
    }

    public setNameTutor(nameTutor) {
        this.nameTutor= nameTutor;
    }

    public getNameGroup() {
        return this.nameGroup;
    }

    public setNameGroup(nameGroup) {
        this.nameGroup= nameGroup;
    }

    public getNameSchool() {
        return this.nameSchool;
    }

    public setNameSchool(nameSchool) {
        this.nameSchool= nameSchool;
    }

}