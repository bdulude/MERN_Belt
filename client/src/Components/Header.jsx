import React from 'react'
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div style={{ background: "rgb(139,69,19)", width: "700px", border: "3px solid black" }}>
            <h1>{props.title}</h1>
            <button><Link to={`${props.link}`}>{props.button}</Link></button>
        </div>
    )
}

export default Header