import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import EditCard from "./components/editCard";
import StudentCard from "./components/studentCard";

function App() {
    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3 shadow p-4">
                <Switch>
                    <Route path="/card" component={StudentCard} />
                    <Route
                        path="/edit"
                        render={({ location }) => (
                            <EditCard card={location.state} />
                        )}
                    />
                    <Redirect to="/card" />
                </Switch>
            </div>
        </div>
    );
}

export default App;
