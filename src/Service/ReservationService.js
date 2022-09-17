import HttpService from "../util/HttpService";
import axios from "axios";
import {BASE_URL} from "../util/Constants";

const basUrl = BASE_URL + "/";
const _axios = axios.create();

class ReservationService {
    filterAvailableRooms = (data) => {
        return _axios.post(basUrl + "api/rooms/room-type", data);
    }
    getRoomsByRoomType = (roomTypeId) => {
        return _axios.get(basUrl + "api/rooms/" + roomTypeId)
    }
    makeReservationClark = (data) => {
        return HttpService.post("/reservation/clark/", data)
    }
    makeReservationCustomer = (data) => {
        return HttpService.post("/reservation/", data)
    }
    fetchReservations = (filterData, status) => {
        return HttpService.post("/reservation/clark/" + status, filterData)
    }
    fetchReservationByReservationId = (resId) => {
        return HttpService.get("/reservation/" + resId)
    }
    markCheckIn = (resModifyData) => {
        return HttpService.post("/reservation/check-in" , resModifyData)
    }
    markCheckOut = (resModifyData) => {
        return HttpService.post("/reservation/check-out" , resModifyData)
    }
    markCancel = (cencelationDto) => {
        return HttpService.post("/reservation/cancel" , cencelationDto)
    }
    updateCardDetails = (reservationId,cardDto) => {
        return HttpService.post("/reservation/credit-card/"+reservationId , cardDto)
    }
}

const reservationService = new ReservationService()
export default reservationService