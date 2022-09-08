export class UtilitiService{
    static getUserName=()=>{
        return sessionStorage.getItem("userName")
    }
}