import {ActionBar} from "../../component/action-bar/ActionBar";
import './AddRecordPage.css';
import {useEffect, useState} from "react";
import {addRecord, getAllRecords} from "../../redux/action";
import {connect} from "react-redux";
import {Record} from "../../model/Record";
import {useHistory} from "react-router-dom";

function AddRecordPage(props) {

    const [id, setId] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        props.getAllRecords()
    }, [])

    function checkIfIdExists() {
        let isExist = false;
        if (props.records.length > 0) {
            props.records.forEach(record => {
                if (record.id === id) {
                    isExist = true;
                }
            })
            return isExist;
        }
    }

    function onError() {
        if (error === "ID") {
            return <div style={{color: "red"}}>you must enter an id</div>
        }
        if (error === "First") {
            return <div style={{color: "red"}}>you must enter your first Name</div>
        }
        if (error === "Last") {
            return <div style={{color: "red"}}>you must enter your last Name</div>
        }
        if (error === "ID/EXIST") {
            return <div style={{color: "red"}}>id already exists in the system</div>
        }
        if (error === "ID/NaN") {
            return <div style={{color: "red"}}>id must be a Number</div>
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
        let isExist = checkIfIdExists();

        if (id === "") {
            setError("ID")
            isFormHasError = true;
        } else if (!/^\d+$/.test(id)) {
            setError("ID/NaN")
            isFormHasError = true;
        } else if (isExist) {
            setError("ID/EXIST")
            isFormHasError = true;
        }else if (firstName === "") {
            isFormHasError = true;
            setError("First")
        } else if (!/^[a-z]+$/i.test(firstName)) {
            isFormHasError = true;
            setError("First/Valid")
        } else if (lastName === "") {
            isFormHasError = true;
            setError("Last")
        } else if (!/^[a-z]+$/i.test(lastName)) {
            isFormHasError = true;
            setError("Last/Valid")
        }

        return isFormHasError;
    }

    function onSubmit() {
        const isFormHasError = checkErrors();

        if (!isFormHasError) {
            const record = new Record(id, firstName, lastName);
            props.addRecord(record)
            history.push('/');
        }
    }

    return (
        <div className={"main-container-add-record"}>
            <ActionBar type={"HOME"}/>
            <div className={"inner-container"}>
                <form className={"form-add"}>
                    <div>
                        <h1>ADD RECORD FORM</h1>
                    </div>
                    <label className={"form-element-id"}>
                         ID
                        <input placeholder="ID" className={"margin-input id"} type={"text"} onChange={(e) => {
                            e.preventDefault();
                            if (error === "ID" || error === "ID/EXIST" || error === "ID/NaN") {
                                setError("")
                            }
                            setId(e.target.value);
                        }}/>
                    </label>
                    <label>
                         First Name
                        <input placeholder="first name" className={"margin-input first"} type={"text"} onChange={(e) => {
                            e.preventDefault();
                            if (error === "First" || error === "First/Valid") {
                                setError("")
                            }
                            setFirstName(e.target.value);
                        }}/>
                    </label>
                    <label>
                         Last Name
                        <input placeholder="last name" className={"margin-input last"} type={"text"} onChange={(e) => {
                            e.preventDefault();
                            if (error === "Last" || error === "Last/Valid") {
                                setError("")
                            }
                            setLastName(e.target.value);
                        }}/>
                    </label>
                    {onError()}
                    <div onClick={() => onSubmit()} className={'submit-add-form'}>
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
        addRecord,
        getAllRecords
    };
};

export const AddRecordPageConnection = connect(mapStateToProp, mapDispatchActions())(AddRecordPage);
