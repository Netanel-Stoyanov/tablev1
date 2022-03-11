import "./OperationButton.css";

export function OperationButton(props) {

    function onClickDelete(id) {
        props.onClick(id);
    }

    function changeColor () {
        if (props.type === "EDIT") {
            return "edit-button";
        } else if (props.type === "DELETE") {
            return "delete-button";
        }
    }

    function checkButton() {
        if (props.type === "EDIT") {
            return "fas fa-user-edit";
        } else if (props.type === "DELETE") {
            return "fas fa-trash-alt";
        }
    }

    return (
        <div onClick={() => onClickDelete(props.recordID)} className={changeColor()}>
            <i className={checkButton()}/>
        </div>

    )
}
