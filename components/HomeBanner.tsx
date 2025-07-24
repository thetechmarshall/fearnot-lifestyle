"use client";

import React from "react";
import Title from "./Title";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "motion/react";

const HomeBanner = () => {
  const [showSecondLine, setShowSecondLine] = React.useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Title className="text-3xl md:text-4xl font-bold text-center font-montserrat uppercase">
        <Typewriter
          words={['Empowered by Faith,']}
          loop={1}
          cursor={false}
          typeSpeed={80}
          deleteSpeed={0}
          delaySpeed={1000}
          onType={() => {
            setTimeout(() => setShowSecondLine(true), 2000); 
          }}
        />
        {" "}
        {showSecondLine && (
          <Typewriter
            words={['Driven by Style.']}
            loop={1}
            cursor={false}
            typeSpeed={80}
            deleteSpeed={0}
            delaySpeed={0}
          />
        )}
      </Title>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-sm text-center text-lightColor/80 font-medium max-w-[480px]"
      >
        Discover bold, faith-inspired pieces that speak purpose, power, and
        identity. Crafted for the confident, styled for the strong. Not just
        clothing—this is a movement of fearless expression.
      </motion.p>
    </div>
  );
};

export default HomeBanner;
