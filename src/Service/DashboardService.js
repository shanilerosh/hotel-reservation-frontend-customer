import HttpService from "../util/HttpService";


class DashboardService {

    fetchDashboardData = () => {
        return HttpService.get("/dashboard/dashboard-data")
    }

}

const dashboardService = new DashboardService()
export default dashboardService