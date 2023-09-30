"use client";

import Typewriter from "typewriter-effect";

const TypeWriter = () => {
 

  return (
    <div>
      <Typewriter
        options={{
          strings:  ["Shorten URLs", "Share Links", "Track Clicks"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TypeWriter;
