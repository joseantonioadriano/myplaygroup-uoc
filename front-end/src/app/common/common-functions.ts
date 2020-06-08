export default class CommonFunction {
    
    private baseURLBack: String= '';       

    constructor() {
        this.write('common-fonction', 'constructor');
        if(this.getEnvironment()==='production') {
            this.baseURLBack = 'http://backend.myplaygroup.es';
        } else if (this.getEnvironment()==='localhost') {
            this.baseURLBack = 'http://localhost/myplaygroup-back-php';
        } else {
            this.baseURLBack = '';
        }             
    }

    public write(func: string, message: string) {
        //if (this.getEnvironment()==='localhost'){
            const today = new Date();
            const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
            const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                if (message !== '') {
                    message = ' => ' + message;
                }
            console.log(date + ' ' + time + ' - ' + func + '()' + message);
        //}
    }
    
    public navigate(url: string) {
        this.write('navigate', url);
        
    }    

    public getRoute(){ 
        //return this.router.url;        
    }

    private addZero(sec: number){
        return ( sec<10? ('0'+sec):(sec) );
    }

    public getEnvironment(){        
        if (window.location.href.indexOf("localhost:4200").toString() === '-1') {
            //this.write('getEnvironment', 'production');
            return 'production';
        } else {
            //this.write('getEnvironment', 'localhost');
            return 'localhost';
        }  
    }

    public getBaseURL(){
        return this.baseURLBack;
    }

    public validationChars(sFieldValue: string) {
        this.write('validationChars', sFieldValue);
        const regex = /^[@.0123456789a-zA-ZçÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜ\s\'-]*$/;
        const result = regex.test(sFieldValue);
        this.write('validationChars', 'return ' + result);
        return result;
      }

    public setStorage(name: string, object: any){
        this.write('setStorage', 'name: '+name+' object:'+object);
        (object===undefined || object===null) ? null : sessionStorage.setItem(name, JSON.stringify(object));                
    }       
    
    public getStorage(name: string) {
        return JSON.parse(sessionStorage.getItem(name));
    }

    public remoteStorage(name: string) {
        return sessionStorage.removeItem(name);
    }

}