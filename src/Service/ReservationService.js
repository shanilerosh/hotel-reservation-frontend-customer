import HttpService from "../util/HttpService";

class ReservationService{
    filterAvailableRooms=(data)=>{
        return HttpService.post("/rooms/room-type",data)
    }
    getRoomsByRoomType=(roomTypeId:string)=>{
        return HttpService.get("/rooms/"+roomTypeId)
    }
    makeReservation=(data)=>{
        return HttpService.post("/reservation/clark/",data)
    }
}
const reservationService=new ReservationService()
export default reservationService