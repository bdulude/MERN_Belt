import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom';
import Header from './Header';

const Pirate = () => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [treasure, setTreasure] = useState(3);
    const [phrase, setPhrase] = useState("");
    const [role, setRole] = useState("Captain");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hook, setHook] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pirates/" + id)
            .then(res => {
                console.log("GET Success");
                console.log(res.data);
                setName(res.data.name);
                setImage(res.data.image);
                setTreasure(res.data.treasure);
                setPhrase(res.data.phrase);
                setRole(res.data.role);
                setPegLeg(res.data.pegLeg);
                setEyePatch(res.data.eyePatch);
                setHook(res.data.hook);
            })
            .catch(err => {
                console.log('GET Failed');
                console.log(err.data);
            })
    }, [id]);

    const generatePirate = () => {
        return {
            name : name,
            image : image,
            treasure : treasure,
            phrase : phrase,
            role : role,
            pegLeg : pegLeg,
            eyePatch : eyePatch,
            hook : hook
        }
    }


    const boolHandler = (attribute) => {
        let pirate = null;
        if (attribute === 1) {
            setPegLeg(!pegLeg);
            console.log("Change Peg");
            pirate = {
                name : name,
                image : image,
                treasure : treasure,
                phrase : phrase,
                role : role,
                pegLeg : !pegLeg,
                eyePatch : eyePatch,
                hook : hook
            }
        }
        else if (attribute === 2) {
            setEyePatch(!eyePatch);
            console.log("Change eye");
            pirate = {
                name : name,
                image : image,
                treasure : treasure,
                phrase : phrase,
                role : role,
                pegLeg : pegLeg,
                eyePatch : !eyePatch,
                hook : hook
            }
        }
        else if (attribute === 3) {
            setHook(!hook);
            console.log("Change hook");
            pirate = {
                name : name,
                image : image,
                treasure : treasure,
                phrase : phrase,
                role : role,
                pegLeg : pegLeg,
                eyePatch : eyePatch,
                hook : !hook
            }
        }
        axios
            .put("http://localhost:8000/api/pirates/" + id, pirate)
            .then(res => {
                console.log("PUT Success");
                console.log(res.data);
            })
            .catch(err => {
                console.log('PUT Failed');
                console.log(err.data);
            });
    }

    return (
        <>
        <Header title={name} link={"/"} button={"Crew Board"}/>
        <div style={{ display: "flex", flexDirection: "row", border: "3px solid black" }}>
            <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    width: "340px",
                    padding: 5,
                    justifyContent: "space-between",
                    background: "white"}}>
                <img src={image} alt={name}/>
                <h1>{phrase}</h1>
            </div>
            <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    width: "340px",
                    padding: 5,
                    justifyContent: "space-between",
                    background: "white"}}>
                <h2>About</h2>
                <p>Position: {role}</p>
                <p>Treasures: {treasure}</p>
                {
                    pegLeg ?
                    <>
                        <p>Peg Leg: Yes</p>
                        <button onClick={() => boolHandler(1)}>No</button>
                    </> :
                    <>
                        <p>Peg Leg: No</p>
                        <button onClick={() => boolHandler(1)}>Yes</button>
                    </> 
                }
                {
                    eyePatch ?
                    <>
                        <p>Eye Patch: Yes</p>
                        <button onClick={() => boolHandler(2)}>No</button>
                    </> :
                    <>
                        <p>Eye Patch: No</p>
                        <button onClick={() => boolHandler(2)}>Yes</button>
                    </> 
                }
                {
                    hook ?
                    <>
                        <p>Hook Hand: Yes</p>
                        <button onClick={() => boolHandler(3)}>No</button>
                    </> :
                    <>
                        <p>Hook Hand: No</p>
                        <button onClick={() => boolHandler(3)}>Yes</button>
                    </> 
                }
            </div>
        </div>
        </>
    )
}

export default Pirate