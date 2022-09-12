export class UtilitiService{
    static getUserName=()=>{
        return sessionStorage.getItem("userName")
    }
    static getRole=()=>{
        return sessionStorage.getItem("roles")
    }
}