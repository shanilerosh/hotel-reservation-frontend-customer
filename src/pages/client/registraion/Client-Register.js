
import {Card, Steps} from "antd";
import React, {useState} from 'react';
import ClientBasicDetailComp from "./Client-Basic-Detail-Comp";
import PackageDetailComp from "./Package-Detail-Comp";
import PaymentDetailComp from "./Payment-Detail-Comp";

const {Step} = Steps;


function ClientRegister() {
    const steps = [
        {
            title: 'Client Details',
            content: <ClientBasicDetailComp goToPackageDetails={() => next()}/>,
        },
        {
            title: 'Package Details',
            content: <PackageDetailComp goToPaymentDetails={() => next()} goToMembershipDetails={() => prev()}/>,
        },
        {
            title: 'Payment',
            content: <PaymentDetailComp goToPackageDetails={() => prev()}/>,
        },
    ];
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <Card title="Client Registration">
                <>
                    <Steps current={current}>
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                    <div className="steps-content" style={{marginTop: 15}}>{steps[current].content}</div>
                    {/*<div className="steps-action">*/}
                    {/*    {current < steps.length - 1 && (*/}
                    {/*        <Button type="primary" onClick={() => next()}>*/}
                    {/*            Next*/}
                    {/*        </Button>*/}
                    {/*    )}*/}
                    {/*    {current === steps.length - 1 && (*/}
                    {/*        <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
                    {/*            Done*/}
                    {/*        </Button>*/}
                    {/*    )}*/}
                    {/*    {current > 0 && (*/}
                    {/*        <Button*/}
                    {/*            style={{*/}
                    {/*                margin: '0 8px',*/}
                    {/*            }}*/}
                    {/*            onClick={() => prev()}*/}
                    {/*        >*/}
                    {/*            Previous*/}
                    {/*        </Button>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </>


            </Card>
        </>
    );
}

export default ClientRegister;
