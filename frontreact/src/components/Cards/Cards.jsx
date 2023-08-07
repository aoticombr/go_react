import React from "react";
import "./Cards.css";


import Card from "../Card/Card";

const Cards = (props) => {
  //console.log('ddddddddd');
  //console.log(props.title);
  return (
    <div className="Cards">
      {props.data.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              title2={card.title2}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
