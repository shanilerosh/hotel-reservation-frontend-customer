import HttpService from "../util/HttpService";


class PaymentService {
    fetchCostDetails = (reservationId) => {
        return HttpService.get("/payment/"+reservationId);
    }

}

const paymentService = new PaymentService()
export default paymentService