import './App.css';
import {Route, Switch} from "react-router-dom";
import {TablePageConnection} from "./page/table-page/TablePage";
import {AddRecordPageConnection} from "./page/add-record-page/AddRecordPage";
import {EditRecordPageConnection} from "./page/edit-record-page/EditRecordPage";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={TablePageConnection}/>
                <Route path={"/add"} exact component={AddRecordPageConnection}/>
                <Route path={"/edit/:id"} exact component={EditRecordPageConnection}/>
            </Switch>
        </div>
    )
}

export default App;
