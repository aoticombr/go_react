import React, { useState } from "react";
import "./InfoBox.css";


import img from "../../imgs/svg/bag.svg";



import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card

const InfoBox = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-color"
               style={{
                 backgroundColor: props.bg              
              }} 
              >
                <img class="user-panel"src={img} />
              </span>

              <div class="info-box-content">
                <span class="info-box-text">{props.titulo}</span>
                <span class="info-box-number">{props.valor}</span>
              </div>
           
            </div>
         
          </div>
    </AnimateSharedLayout>
  );
};

export default InfoBox;
