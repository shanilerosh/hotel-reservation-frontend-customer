import {UtilitiService} from "../../../util/UtilitiService";

export default function PaymentSuccess() {
    return (
        <>
            <h2 align={"center"} style={{color:"green"}}>{UtilitiService.getUserName() + " ,your payment has been successes"}</h2>
        </>
    )
}