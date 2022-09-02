import HttpService from "../util/HttpService";

class CustomerService {
    submitNewCustomer = (data) => {
        return HttpService.post("/customer/", data)
    }

}

const customerService = new CustomerService()
export default customerService