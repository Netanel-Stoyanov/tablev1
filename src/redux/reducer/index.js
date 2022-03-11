import {combineReducers} from "redux";

const recordReducer = (currentState = [], action) => {
    switch (action.type) {
        case "RECORD/ADD" :
            const newAddArray = [...currentState];
            newAddArray.push(action.payload);
            return newAddArray;
        case "RECORD/GET-ALL" :
            return [...currentState];
        case "RECORD/DELETE" :
            const newArray = [...currentState];
            const index = newArray.findIndex(record => record.id === action.payload);
            newArray.splice(index, 1);
            return newArray;
        case "RECORD/EDIT" :
            let record = currentState.find(record => record.id === action.payload.recordId);
            record.firstName = action.payload.record.firstName;
            record.lastName = action.payload.record.lastName;
            return [...currentState];
        default:
            return currentState;
    }
};

export default combineReducers({
    record : recordReducer
});
