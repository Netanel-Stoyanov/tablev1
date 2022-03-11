export const getAllRecords = () => {
    return {
        type : "RECORD/GET-ALL"
    };
};

export const addRecord = (record) => {
    return {
        type: "RECORD/ADD",
        payload: record,
    };
};

export const deleteRecord = (recordId) => {
    return {
        type: "RECORD/DELETE",
        payload: recordId,
    };
};

export const editFirstNameRecord = (recordId, firstName) => {
    return {
        type: "RECORD/EDIT-FIRST",
        payload: {recordId, firstName}
    };
};

export const editLastNameRecord = (recordId, lastName) => {
    return {
        type: "RECORD/EDIT-LAST",
        payload: {recordId, lastName}
    };
};
