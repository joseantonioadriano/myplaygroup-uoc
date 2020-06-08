export default class CText {
    
    private text: string;

    constructor(text: string) {
        this.text= text;
    }
 
    public getText() {
        return this.text;
    }

     public setText(text) {
        this.text= text;
    }

}