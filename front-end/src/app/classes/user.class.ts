import CStudent from './student.class';
import CSchool from './school.class';
import CInfoStudent from './infoStudent.class';

export default class CUser {
    
    private id: number;
    private username: string;
    private password: string;
    private name: string = '';
    private surname: string = '';
    private idType: number;
    private favouriteLang: number;
    private activated: boolean;
    private lastConnection: Date;
    private idSchool: number;
    private nameSchool: string;
    private studentsArray: CStudent [] = [];
    private schoolsArray: CSchool [] = [];
    private infoStudentArray: CInfoStudent [] = [];

    constructor(id: number, username: string, password: string, name: string, surname: string, idType: number, activated: boolean, lastConnection: Date, students: CStudent[], schools: CSchool[], favouriteLang: number, idSchool: number, nameSchool: string, infoStudents: CInfoStudent[]) {
        this.id= id;
        this.username= username;
        this.name= name;
        this.surname= surname;
        this.password= password;
        this.idType= idType;
        this.activated= activated;
        this.lastConnection= lastConnection;  
        this.favouriteLang= favouriteLang;
        this.idSchool= idSchool;
        this.nameSchool= nameSchool;
        (students===null || students===undefined) ? null : this.copyStudents(students);
        (schools===null || schools===undefined) ? null : this.copySchools(schools);              
        (infoStudents===null || infoStudents===undefined) ? null : this.copyInfoStudents(infoStudents);              
    }

    private copyInfoStudents(infoStudents: CInfoStudent[]){
        this.infoStudentArray= [];
        for(let i= 0; i< infoStudents.length; i++){
            this.infoStudentArray.push(infoStudents[i]);
        }
    }

    private copyStudents(students: CStudent []){        
        this.studentsArray= [];
        for(let i= 0; i< students.length; i++){
            this.studentsArray.push(students[i]);
        }
    }

    private copySchools(schools: CSchool []){        
        this.schoolsArray= [];
        for(let i= 0; i< schools.length; i++){
            this.schoolsArray.push(schools[i]);
        }
    }

    public getStudents(){
        return this.studentsArray;
    }

    public getSchools(){
        return this.schoolsArray;
    }

    public getId(){
        return this.id;
    }

    public getIdSchool(){
        return this.idSchool;
    }

    public getName(){
        return this.name;
    }
    
    public getNameSchool(){
        return this.nameSchool;
    }
    
    public geFavouriteLang(){
        return this.favouriteLang;
    }
    
    public getSurname(){
        return this.surname;
    }

    public getUsername() {
        return this.username;
    }

    public getPassword() {
        return this.password;
    }

    public getIdType() {
        return this.idType;
    }

    public getActivated() {
        return this.activated;
    }

    public getLastConnection() {
        return this.lastConnection;
    }
    
    public setUsername(username: string){
        this.username= username;
    }
    
    public setName(name: string){
        this.name= name;
    }
    
    public setNameSchool(nameSchool: string){
        this.nameSchool= nameSchool;
    }
    
    public setIdSChool(idSchool: number){
        this.idSchool= idSchool;
    }
    
    public setFavouriteLang(favouriteLang: number){
        this.favouriteLang= favouriteLang;
    }
    
    public setSurname(surname: string){
        this.surname= surname;
    }
    
    public setPassword(password: string){
        this.password= password;
    }
    
    public setIdType(idType: number){
        this.idType= idType;
    }
    
    public setActivated(activated: boolean){
        this.activated= activated;
    }

    public setLastConnection(lastConnecion: Date){
        this.lastConnection= lastConnecion;
    }

}