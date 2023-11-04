import React from "react";
import Header from "./_components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="container">
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
