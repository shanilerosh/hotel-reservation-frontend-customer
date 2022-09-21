import HttpService from "../util/HttpService";


class ReportService {
    fetchCostDetails = (reservationId) => {
        return HttpService.get("/payment/"+reservationId);
    }
    generateCustomerReport = (reportDto) => {
        return HttpService.post("/report/",reportDto);
    }


}

const reportService = new ReportService()
export default reportService