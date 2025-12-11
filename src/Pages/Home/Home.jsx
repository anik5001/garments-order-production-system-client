import React from "react";
import HeroBanner from "./HeroBanner";
import CustomerFeedback from "./CustomerFeedback";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import QuickStatsCTA from "./QuickStatsCTA";
import Container from "../../components/Shared/Container";
import LatestProduct from "./LatestProduct";

const Home = () => {
  return (
    <Container>
      <div>
        <HeroBanner></HeroBanner>
        <LatestProduct></LatestProduct>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
        <CustomerFeedback></CustomerFeedback>
        <QuickStatsCTA></QuickStatsCTA>
      </div>
    </Container>
  );
};

export default Home;
