import {Spin} from "antd";

const LoadingComp = (props) => {
    return (
        <div>
            {
                props.loading ?
                    <div className={"loader-container"}>
                        <Spin size="large" tip="Loading..."/>
                    </div> : ''
            }
        </div>

    )
}
export default LoadingComp