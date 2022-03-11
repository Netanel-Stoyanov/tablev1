import "./ActionBar.css"
import {useHistory} from "react-router-dom";

export function ActionBar(props) {

    const history = useHistory();

    function checkButtonType () {
        if (props.type === "ADD") {
            return <div onClick={() => {history.push('/add')}} className={"button"}>
                ADD
            </div>
        } else if (props.type === "HOME"){
            return <div onClick={() => {history.push('/')}} className={"button"}>
                HOME
            </div>
        }
    }

    return (
        <div className={"action-bar-main-container"}>
            <div className={"logo"}>
                <img src={process.env.PUBLIC_URL + "/day-icon.svg"} alt={"day"}/>
            </div>
            <div className={"buttons-action-bar"}>
                {checkButtonType()}
            </div>
        </div>
    )
}
