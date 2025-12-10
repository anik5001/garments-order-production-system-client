import React from "react";
import HeroBanner from "./HeroBanner";
import CustomerFeedback from "./CustomerFeedback";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import QuickStatsCTA from "./QuickStatsCTA";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <CustomerFeedback></CustomerFeedback>
      <QuickStatsCTA></QuickStatsCTA>
    </div>
  );
};

export default Home;
