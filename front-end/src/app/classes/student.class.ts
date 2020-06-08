export default class CStudent {
    
    private id: number;
    private dni: string;
    private name: string;
    private surname: string;
    private idResponsable1: number;
    private idResponsable2: number;    
    private idSchool: number;  
    private genre: number;
    private dateBirth: string;

    constructor(id: number, dni: string, name: string, surname: string, idResponsable1: number, idResponsable2: number, idSchool: number, genre: number, dateBirth: string) {
        this.id= id;
        this.dni= dni;
        this.name= name;
        this.surname= surname;
        this.idResponsable1= idResponsable1;
        this.idResponsable2= idResponsable2;
        this.idSchool= idSchool;
        this.genre= genre;
        this.dateBirth= dateBirth;
    }

    public getId(){
        return this.id;
    }

    public getGenre(){
        return this.genre;
    }

    public getDatebirth(){
        return this.dateBirth;
    }

    public setGenre(genre) {
        this.genre= genre;
    }

    public setDateBirth(dateBirth) {
        this.dateBirth= dateBirth;
    }

    public getName() {
        return this.name;
    }

    public getSchool() {
        return this.idSchool;
    }

    public getDni() {
        return this.dni;
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

    public setDni(dni) {
        this.dni= dni;
    }

    public setName(name) {
        this.name= name;
    }
    
    public setSurname(surname) {
        this.surname= surname;
    }

    public setIdResponsable1(idResponsable1) {
        this.idResponsable1= idResponsable1;
    }

    public getIdResponsable1(){
        return this.idResponsable1;
    }

    public setIdResponsable2(idResponsable2) {
        this.idResponsable2= idResponsable2;
    }

    public getIdResponsable2(){
        return this.idResponsable2;
    }

}