import HttpService from "../util/HttpService";

class CustomerService {
    submitNewCustomer = (data) => {
        return HttpService.post("/customer/", data)
    }
    getCustDetailByNic = (nic) => {
        return HttpService.get("/customer/"+nic)
    }

}

const customerService = new CustomerService()
export default customerService