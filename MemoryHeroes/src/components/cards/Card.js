import React from "react";
import './Card.css'

export default function Card(props) {

    const handleClick = () => {
        if(props.onClick && !props.item.active) {
            props.onClick(props.item)
        } 
    }

    const isActiveOrGuessed = props.item.active || props.item.guessed

    return (
        <div className="card" onClick ={() => handleClick()}>
            <div className="card-front" style = {isActiveOrGuessed ? {transform : 'rotateY(180deg)'} : null}></div>
            <div className="card-back" style = {isActiveOrGuessed ? {transform : 'rotateY(360deg)'} : null}>
                <img className="card-back-image" src = {`${props.item.image}`}/>
            </div>
        </div>
    )
}