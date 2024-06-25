import React from "react";
import { useLottie } from "lottie-react";
import Logo from "../assets/waitingAnim.json";

function WaitingScreen() {
  const options = {
    animationData: Logo,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="flex flex-col justify-center items-center w-[100%] h-[100%] p-4">
      <div className="w-[40%] mx-auto mb-6">{View}</div>
      <h1 className="text-3xl font-bold text-center mb-4">
        Waiting for Approval
      </h1>
      <p className="text-lg text-center max-w-[60%] mx-auto">
        This is a waiting page, where you have to wait until the admin accepts
        your request as a service provider. We appreciate your patience and
        understanding. You will be notified as soon as your request is reviewed
        and approved. Thank you for your interest in joining our platform as a
        service provider.
      </p>
    </div>
  );
}

export default WaitingScreen;
