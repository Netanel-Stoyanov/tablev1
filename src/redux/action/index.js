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

export const editRecord = (recordId, record) => {
    return {
        type: "RECORD/EDIT",
        payload: {recordId, record}
    };
};


