import React, { useEffect, useRef } from "react";

import { useState } from "react";

const Flames = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [res, setRes] = useState("");
  const flamesFunc = (name1, name2, req, res) => {
    let firstname = name1;
    let secondname = name2;

    // let prev_lennames = firstname.length + secondname.length;
    for (let i of firstname) {
      for (let j of secondname) {
        if (i === j) {
          firstname = firstname.replace(new RegExp(i, "g"), "");
          secondname = secondname.replace(new RegExp(j, "g"), "");
        }
      }
    }
    let after_lennames = firstname.length + secondname.length;
    let flames = "FLAMES";
    // let flms_len = flames.length;
    console.log(firstname);
    console.log(secondname);
    console.log(after_lennames);

    let pos = 0;
    // let cnt = 0;
    // let prev_pos;
    // while (flames.length > 1) {
    //   while (cnt <= after_lennames) {
    //     // console.log(pos);
    //     prev_pos = pos;
    //     if (pos === flames.length - 1) {
    //       pos = 0;
    //       cnt++;
    //     } else {
    //       pos++;
    //     }
    //     cnt++;
    //   }
    //   console.log(prev_pos);
    //   cnt = 0;
    //   flames = flames.replace(flames[prev_pos], "");
    // }
    // console.log(flames);
    while (flames.length > 1) {
      pos = (pos + after_lennames - 1) % flames.length;
      flames = flames.substring(0, pos) + flames.substring(pos + 1);
    }
    console.log(flames);
    setRes(flames);
  };
  useEffect(() => {
    // This code will run when the component mounts
    // You can perform any initialization or side effect here
    // For example, console.log a message when the component mounts
    console.log("Flames component mounted");

    // Return a cleanup function if needed
    return () => {
      // This code will run when the component unmounts
      // You can perform any cleanup or resource releasing here
      // For example, console.log a message when the component unmounts
      console.log("Flames component unmounted");
    };
  }, []);
  return (
    <div>
      <div className="center">
        <span>Name-1: </span>
        <input type="text" onChange={(e) => setName1(e.target.value)} />
        <span> Name-2: </span>
        <input type="text" onChange={(e) => setName2(e.target.value)} />
        <div>
          <button onClick={() => flamesFunc(name1, name2, res)}>
            GET FLAMED
          </button>
        </div>

        <div className="container">
          {res !== "F" && <div className="slider F">F</div>}
          {res !== "L" && <div className="slider L">L</div>}
          {res !== "A" && <div className="slider A">A</div>}
          {res !== "M" && <div className="slider M">M</div>}
          {res !== "E" && <div className="slider E">E</div>}
          {res !== "S" && <div className="slider S">S</div>}
        </div>
        <div className="container">
          {res === "F" && <div className="slider F">F</div>}
          {res === "L" && <div className="slider L">L</div>}
          {res === "A" && <div className="slider A">A</div>}
          {res === "M" && <div className="slider M">M</div>}
          {res === "E" && <div className="slider E">E</div>}
          {res === "S" && <div className="slider S">S</div>}
        </div>
      </div>
    </div>
  );
};

export default Flames;
