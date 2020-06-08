export default class CSchool {
    
    private id: number;
    private name: String;
    private idKindergarden: number;
    private address: String;

    constructor(id: number, name: string, idKinderkarden: number, address: string) {
        this.id= id;
        this.name= name;
        this.idKindergarden= idKinderkarden;
        this.address= address;
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

    public setIdKinderkarden(idKinderkarden) {
        this.idKindergarden= idKinderkarden;
    }

    public getIdKinderkarden(){
        return this.idKindergarden;
    }

    public getAddress() {
        return this.address;
    }

    public setAddress(address) {
        this.address= address;
    }

}