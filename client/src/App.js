import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import Create from './Components/Create';
import Header from './Components/Header';
import Pirate from "./Components/Pirate";

function App() {
    const [pirateList, setPirateList] = useState([]);
    const [captain, setCaptain] = useState(false);


    const walkThePlank = (deleteId) => {
        console.log("Delete Pressed", deleteId);
        axios
            .delete("http://localhost:8000/api/pirates/" + deleteId)
            .then(res => {
                console.log("DELETE Success");
                console.log(res.data);
                if (res.data.role === "Captain") {
                    setCaptain(false);
                }
                setPirateList(pirateList.filter((pirate) => pirate._id !== deleteId));
            })
            .catch(err => {
                console.log("DELETE Failed");
                console.log(err.data);
            })
    }

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pirates")
            .then((res) => {
                console.log('GET Pirates Success');
                console.log(res.data.pirates);
                setPirateList(res.data.pirates);
                for (const pirate of res.data.pirates) {
                    if (pirate.role === "Captain") {
                        setCaptain(true);
                    }
                }
            })
            .catch((err) => {
                console.log("GET Pirates Failed");
                console.log(err.data);
            });
    }, []);

    return (
        <div className="App" style={{
            background: "orange",
            border: "3px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "10px"
        }}>
            <Route exact path="/">
            <Header  title={"Pirate Crew"} link={"/new/pirate"} button={"Add a Pirate"}/>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {pirateList.map((pirate) => {
                        return (
                            <div key={pirate._id} style={{
                                backgroundColor: "white",
                                width: "700px",
                                display: "flex",
                                justifyContent: "center",
                                border: "3px solid black",
                                marginTop: "10px"
                            }}>
                                <div style={{ display: "block", marginRight: 30 }}>
                                    <img src={pirate.image} alt={pirate.name} style={{ height: "100px" }} />
                                </div>
                                <div>
                                    <h3>{pirate.name}</h3>
                                    <button>
                                        <Link to={"/pirate/" + pirate._id}>View Pirate</Link>
                                    </button>
                                    <button onClick={() => walkThePlank(pirate._id)}>Walk the Plank!</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Route>
            <Route exact path="/pirate/:id">
                <Pirate />
            </Route>
            <Route exact path="/new/pirate">
                <Header  title={"Add Pirate"} link={"/"} button={"Crew Board"}/>
                <Create captain = {captain} setCaptain = {setCaptain} pirateList = {pirateList} setPirateList = {setPirateList}/>
            </Route>
        </div>
    );
}

export default App;
