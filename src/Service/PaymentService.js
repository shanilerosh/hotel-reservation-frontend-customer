import HttpService from "../util/HttpService";


class PaymentService {
    fetchCostDetails = (reservationId) => {
        return HttpService.get("/payment/"+reservationId);
    }
    makeCardPayment = (paypalDto) => {
        return HttpService.post("/payment/paypal-pay",paypalDto);
    }

}

const paymentService = new PaymentService()
export default paymentService