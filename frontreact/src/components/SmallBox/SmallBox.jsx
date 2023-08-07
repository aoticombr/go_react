import React, { useState } from "react";
import "./SmallBox.css";


import img from "../../imgs/svg/bag.svg";



import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card

const SmallBox = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      <div class="col-lg-3 col-6">
          
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{props.valor}</h3>

                <p>{props.titulo}</p>
              </div>
              <div class="icon">
                
              <img src={img} width={'50'} heigth={'50'} />
              </div>
              <a href="#" class="small-box-footer">
              {props.titulo2} <i class="fas fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
    </AnimateSharedLayout>
  );
};

export default SmallBox;
