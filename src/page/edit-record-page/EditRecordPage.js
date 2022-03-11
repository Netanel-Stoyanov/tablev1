import './EditRecordPage.css'
import {ActionBar} from "../../component/action-bar/ActionBar";
import {editRecord, getAllRecords} from "../../redux/action";
import {connect} from "react-redux";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function EditRecordPage(props) {

    const [error, setError] = useState("");
    const history = useHistory();
    const oneRecord = props.records.find(record => record.id === props.match.params.id);
    const [firstName, setFirstName] = useState(oneRecord? oneRecord.firstName : "");
    const [lastName, setLastName] = useState(oneRecord? oneRecord.lastName : "");

    function onError() {
        if (error === "First") {
            return <div style={{color: "red"}}>you must enter your first Name</div>
        }
        if (error === "Last") {
            return <div style={{color: "red"}}>you must enter your last Name</div>
        }
        if (error === "Last/Valid") {
            return <div style={{color: "red"}}>you must enter a valid last name characters only</div>
        }
        if (error === "First/Valid") {
            return <div style={{color: "red"}}>you must enter a valid first name characters only</div>
        }
    }


    function checkErrors() {
        let isFormHasError = false;
        if (firstName === "") {
            isFormHasError = true;
            setError("First")
        } else if (!firstName.match("^[ A-Za-z]+$")) {
            isFormHasError = true;
            setError("First/Valid")
        } else if (lastName === "") {
            isFormHasError = true;
            setError("Last")
        } else if (!lastName.match("^[ A-Za-z]+$")) {
            isFormHasError = true;
            setError("Last/Valid")
        }

        return isFormHasError;
    }


    const onSubmit = () => {
        const isError = checkErrors();
        if (!isError) {
            props.editRecord(props.match.params.id, {firstName, lastName})
            history.push('/');
        }
    }

    return (
        <div className={"main-container-edit-record"}>
            <ActionBar type={"HOME"}/>
            <div className={"inner-container-edit"}>
             <form className={"form-edit"}>
                 <h1>EDIT RECORD</h1>
                 <div>
                     <label>
                         First Name
                         <input className={"margin-first"} type={"text"} value={firstName}
                         onChange={(e) => {
                             e.preventDefault();
                             setFirstName(e.target.value)
                         }}/>
                     </label>
                 </div>
                 <div>
                     <label>
                         Last Name
                         <input className={"margin-last"} type={"text"} value={lastName}
                         onChange={(e) => {
                             e.preventDefault()
                             setLastName(e.target.value)
                         }}/>
                     </label>
                 </div>
                 {onError()}
                 <div onClick={() => onSubmit()} className={"submit-btn"}>
                     Submit
                 </div>
             </form>
            </div>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        records : state.record
    };
};

const mapDispatchActions = () => {
    return {
        getAllRecords,
        editRecord
    };
};

export const EditRecordPageConnection = connect(mapStateToProp, mapDispatchActions())(EditRecordPage);
