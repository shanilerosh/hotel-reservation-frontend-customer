import {UtilitiService} from "../../../util/UtilitiService";

export default function PaymentError() {
    return (
        <>
            <h2 align={"center"} style={{color:"red"}}>{UtilitiService.getUserName() + " ,your payment has been declined"}</h2>
        </>
    )
}