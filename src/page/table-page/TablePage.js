import "./TablePage.css"
import {ActionBar} from "../../component/action-bar/ActionBar";
import {connect} from "react-redux";
import {deleteRecord, getAllRecords} from "../../redux/action";
import {useEffect} from "react";
import {OperationButton} from "../../component/operation-button/OperationButton";
import {useHistory} from "react-router-dom";

function TablePage(props) {

    const history = useHistory()

    useEffect(() => {
        props.getAllRecords();
    } , [])

    const onClickEdit = (id) => {
        history.push("/edit/" + id);
    }

    const showRecords = () => {
        if (props.records.length > 0) {
            return props.records.map((record, index) => <tr key={index}>
                <td className={"id"}>{record.id}</td>
                <td className={"first-name"}>{record.firstName}</td>
                <td className={"last-name"}>{record.lastName}</td>
                <td><OperationButton onClick={onClickEdit} recordID={record.id} type={"EDIT"}/></td>
                <td><OperationButton onClick={props.deleteRecord} recordID={record.id} type={"DELETE"}/></td>
            </tr>)
        }
    }

    return (
        <div className={"main-container"}>
            <ActionBar type={"ADD"}/>
            <div className={"table-header"}>
                <h1>Your Records</h1>
            </div>
            <div>
                <table className={"table"}>
                    <tbody>
                    <tr className={"main-row"}>
                        <td className={"id"}>ID</td>
                        <td className={"first-name"}>First Name</td>
                        <td className={"last-name"}>Last Name</td>
                        <td/>
                        <td/>
                    </tr>
                    {showRecords()}
                    </tbody>
                </table>
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
        deleteRecord
    };
};

export const TablePageConnection = connect(mapStateToProp, mapDispatchActions())(TablePage);
