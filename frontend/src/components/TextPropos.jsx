import { useState, useEffect } from "react";
import axios from "axios";

export default function TextPropos() {
  const [textPropos, setTextPropos] = useState([]);
  // const [imageHome, setImageHome] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/text?page=propos")
        .then((response) => response.data);
      setTextPropos(data);
      // console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        alert("text doesn't exists");
      }
    }
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div>
      {textPropos.map((text) => (
        <div key={text.id}>
          <h1 key="title1">{text.title}</h1>
          <p key="body1">{text.body}</p>
        </div>
      ))}
    </div>
  );
}
