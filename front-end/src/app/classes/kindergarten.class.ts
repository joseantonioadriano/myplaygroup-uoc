export default class CKindergarten {
    
    private id: number;
    private name: String;
    private cif: String;

    constructor(id: number, name: string, cif: string) {
        this.id= id;
        this.name= name;
        this.cif= cif;
    }

    public getId(){
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getCif() {
        return this.cif;
    }

    public setId(id) {
        this.id= id;
    }

    public setName(name) {
        this.name= name;
    }

    public setCif(cif) {
        this.cif= cif;
    }

}