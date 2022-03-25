import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';

const Create = (props) => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [treasure, setTreasure] = useState(3);
    const [phrase, setPhrase] = useState("");
    const [role, setRole] = useState("First Mate");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hook, setHook] = useState(true);
    

    const submitHandler = (e) => {
        e.preventDefault();
        let pirate = {
            name : name,
            image : image,
            treasure : treasure,
            phrase : phrase,
            role : role,
            pegLeg : pegLeg,
            eyePatch : eyePatch,
            hook : hook
        }
        // console.log(pirate);
        axios
            .post("http://localhost:8000/api/pirates", pirate)
            .then((res) => {
                console.log("POST Success");
                console.log(res.data);
                props.setPirateList([...props.pirateList, res.data]);
                if (res.data.role === "Captain") {
                    props.setCaptain(true);
                }
                history.push("/");
            })
            .catch((err) => {
                const errorRes = err.response.data.errors;
                const errorArr = [];
                for (let key of Object.keys(errorRes)) {
                    errorArr.push(errorRes[key].message);
                }
                setErrors(errorArr);
                console.log('POST Failed');
                console.log(err.data);
            });
    }


    return (
        <>
        {errors.map((err, index) => <p key={index}>{err}</p>)}
        <div style={{ display: "flex", flexDirection: "row" }}>
            <form onSubmit={submitHandler} style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                <div style={{ display: "flex", flexDirection: "column", width: "150px", marginRight: 30, justifyContent: "space-between"}}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
                    <label htmlFor="image">Image: </label>
                    <input type="text" onChange={(e) => setImage(e.target.value)} value={image} />
                    <br />
                    <label htmlFor="image">Number of Treasure Chests: </label>
                    <input type="number" onChange={(e) => setTreasure(e.target.value)} value={treasure} />
                    <br />
                    <label htmlFor="phrase">Pirate Catch Phrase: </label>
                    <input type="text" onChange={(e) => setPhrase(e.target.value)} value={phrase} />
                    <br />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "100px", width: "150px", justifyContent: "space-between"}}>
                    <label htmlFor="role">Crew Position: </label>
                    <select name="role" onChange={(e) => setRole(e.target.value)} value={role}>
                        {
                            props.captain ?
                            <></> :
                            <option value="Captain">Captain</option>
                        }
                        <option value="First Mate">First Mate</option>
                        <option value="Quarter Master">Quarter Master</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                    <br />
                    <label htmlFor="pegLeg">Peg Leg: </label>
                    <input 
                        name="pegLeg"
                        type="checkbox"
                        checked={pegLeg}
                        onChange={() => setPegLeg(!pegLeg)}
                        />
                    <label htmlFor="eyePatch">Eye Patch: </label>
                    <input 
                        name="eyePatch"
                        type="checkbox"
                        checked={eyePatch}
                        onChange={() => setEyePatch(!eyePatch)}
                        />
                    <label htmlFor="hook">Hook Hand: </label>
                    <input 
                        name="hook"
                        type="checkbox"
                        checked={hook}
                        onChange={() => setHook(!hook)}
                        />
                    <br />
                    <input type="submit" onClick={submitHandler}/>
                </div>
            </form>
        </div>
        </>
    )
}

export default Create