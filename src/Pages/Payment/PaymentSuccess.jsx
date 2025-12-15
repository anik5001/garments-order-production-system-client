import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    axios.post(`http://localhost:3000/payment-success`, { sessionId });
  }, [sessionId]);
  return <div>succcess payment</div>;
};

export default PaymentSuccess;
