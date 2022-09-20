import HttpService from "../util/HttpService";


class PaymentService {
    fetchCostDetails = (reservationId) => {
        return HttpService.get("/payment/"+reservationId);
    }
    makeCardPayment = (paypalDto) => {
        return HttpService.post("/payment/paypal-pay",paypalDto);
    }
    makeCashPayment = (paymentDto) => {
        return HttpService.post("/payment/cash-pay",paymentDto);
    }
    downlaodInvoice = (reservationId) => {
        return HttpService.get("/payment/payment-invoice/"+reservationId);
    }

}

const paymentService = new PaymentService()
export default paymentService