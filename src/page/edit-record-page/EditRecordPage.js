import './EditRecordPage.css'
import {ActionBar} from "../../component/action-bar/ActionBar";
import {editFirstNameRecord, editLastNameRecord, getAllRecords} from "../../redux/action";
import {connect} from "react-redux";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function EditRecordPage(props) {

    const [error, setError] = useState("");
    const history = useHistory();
    const oneRecord = props.records.find(record => record.id === props.match.params.id);

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
        if (oneRecord.firstName === "") {
            isFormHasError = true;
            setError("First")
        } else if (!/^[a-z]+$/i.test(oneRecord.firstName)) {
            isFormHasError = true;
            setError("First/Valid")
        } else if (oneRecord.lastName === "") {
            isFormHasError = true;
            setError("Last")
        } else if (!/^[a-z]+$/i.test(oneRecord.lastName)) {
            isFormHasError = true;
            setError("Last/Valid")
        }

        return isFormHasError;
    }


    const onSubmit = () => {
        const isError = checkErrors();
        if (!isError) {
            history.push('/');
        }
    }

    return (
        <div className={"main-container-edit-record"}>
            <ActionBar />
            <div className={"inner-container-edit"}>
             <form className={"form-edit"}>
                 <h1>EDIT RECORD</h1>
                 <div>
                     <label>
                         First Name
                         <input className={"margin-first"} type={"text"} value={oneRecord ? oneRecord.firstName : ""}
                         onChange={(e) => {
                             e.preventDefault();
                             props.editFirstNameRecord(props.match.params.id, e.target.value);
                         }}/>
                     </label>
                 </div>
                 <div>
                     <label>
                         Last Name
                         <input className={"margin-last"} type={"text"} value={oneRecord ? oneRecord.lastName : ""}
                         onChange={(e) => {
                             e.preventDefault()
                             props.editLastNameRecord(props.match.params.id, e.target.value)
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
        editFirstNameRecord,
        editLastNameRecord
    };
};

export const EditRecordPageConnection = connect(mapStateToProp, mapDispatchActions())(EditRecordPage);
