import { useState } from "react";

const Subscription = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    alert("Subscription Activated!");
  };

  return (
    <div>
      {subscribed ? (
        <h3>You are a Premium User!</h3>
      ) : (
        <button onClick={handleSubscribe}>Subscribe for Instant Solutions</button>
      )}
    </div>
  );
};

export default Subscription;
