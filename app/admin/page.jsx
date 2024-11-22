import React from "react";
import { Image } from "primereact/image";

const StudentsPage = () => {
  return (
    <div>
      <Image
        src="https://i.ibb.co/CbKBG0K/Img-Principal.png"
        alt="Imagen"
        preview
        style={{
          width: "869px",
          height: "437px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      />
    </div>
  );
};

export default StudentsPage;
