import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

import "../component/LoveFinder.css";

const countLetters = (name, crush) => {
  let map = new Map();
  let count = 0;

  name.split("").forEach((element) => {
    if (map.has(element)) {
      map.set(element, map.get(element) + 1);
    } else {
      map.set(element, 1);
    }
  });

  crush.split("").forEach((element) => {
    if (map.has(element)) {
      map.set(element, map.get(element) - 1);
    } else {
      count = count + 1;
    }

    if (map.has(element) && map.get(element) <= 0) {
      map.delete(element);
    }
  });

  count = count + map.size - 1;

  return calculateLove(count);
};

const calculateLove = (count) => {
  let love = "flames";
  let index;
  let start = 0;
  let limit = love.length;

  while (love.length != 1) {
    index = (start + count) % limit;
    limit = limit - 1;
    love = love.slice(0, index) + love.slice(index + 1);
    start = index;
  }

  switch (love) {
    case "f":
      return "friend-info";
    case "l":
      return "love-success";
    case "a":
      return "affection-info";
    case "m":
      return "marriage-info";
    case "e":
      return "enemy-error";
    case "s":
      return "sister-warning";
  }
};

const LoveFinder = () => {
  const [name, setName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [result, setResult] = useState([]);

  const onSubmitHandler = () => {
    if(name === "" || crushName === "") {
      alert("please fill the fields")  
      return;
    }
    let word = countLetters(name, crushName);
    setResult(word.split("-"));
  };

  const onResetHandler = () => {
    setName("");
    setCrushName("");
    setResult("")
  }

  return (
    <div className="wrapper">
      <div className="formContainer">
        <div className="header">
            <h3 className="title">love calculator</h3>
        </div>
      <div className="resultWindow">
        {result.length != 0 ? (
          <Alert severity={result[1]}>{result[0]}</Alert>
        ) : <div className="relationship">relationship</div>}
      </div>
      <form>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Crush Name"
            value={crushName}
            onChange={(e) => setCrushName(e.target.value)}
            required
          />
        
        <div className="buttonContainer">
          <Button className="text-uppercase" variant="primary" onClick={onSubmitHandler}>submit</Button>
          <Button className="text-uppercase" variant="outline-dark" onClick={onResetHandler}>reset</Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default LoveFinder;
