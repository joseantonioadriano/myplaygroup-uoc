export default class CKindergarten {
    
    private spanish: String;
    private english: String;

    constructor(english: string, spanish: string) {
        this.spanish= spanish;
        this.english= english;
    }
    
    public getSpanish() {
        return this.spanish;
    }

    public getEnglish() {
        return this.english;
    }

    public setSpanish(spanish) {
        this.spanish= spanish;
    }

    public setEnglish(english) {
        this.english= english;
    }

    public getValue(lang){
        switch(lang){
            case 1:
                return this.getEnglish();
                break;
            case 2:
                return this.getSpanish();
                break;            
            default:
                return "";
                break;
        }
    }

}