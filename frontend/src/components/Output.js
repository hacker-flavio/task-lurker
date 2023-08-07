// import React, { useState, useEffect } from "react";

// function Output({ containerArray, setContainerArray }) {
//   const [containerArrayClone, setContainerArrayClone] = useState();
//   const [editJson, setEditJson] = useState(false);
//   console.log(containerArray);
//   const editJSON = () => {
//     console.log("open edit json");

//     setEditJson(true);
//   };
//   const closeEditJSON = () => {
//     console.log("close edit json");
//     setContainerArray(containerArrayClone);
//     setEditJson(false);
//     alert("close edit json");
//   };
//   const copyJSON = () => {
//     console.log("copy json");
//     navigator.clipboard.writeText(JSON.stringify(containerArray, null, 2));
//     alert("JSON copied to clipboard");
//   };

//   const updateJSON = () => {
//     console.log("update json");
//     setContainerArrayClone(
//       JSON.parse(document.querySelector("textarea").value)
//     );

//     alert("JSON updated");
//   };

//   const downloadJSON = () => {
//     console.log("save json");
//     var element = document.createElement("a");
//     var file = new Blob([JSON.stringify(containerArray, null, 2)], {
//       type: "text/plain",
//     });
//     element.href = URL.createObjectURL(file);
//     element.download = "json.txt";
//     element.click();
//   };
//   useEffect(() => {
//     if (editJson) {
//       setContainerArrayClone(containerArray);
//     }
//   }, [editJson]);
//   useEffect(() => {
//     console.log(containerArrayClone);
//   }, [containerArrayClone]);

//   return (
//     <div>
//       {/* <textarea value={JSON.stringify(containerArray, null, 2)} rows={10} /> */}
//       <div id="editJsonDiv" onClick={() => editJSON()}>
//         <div id="editJsonText">
//           <div>edit json</div>
//         </div>
//         <span className="material-icons custom-icon-style-small">edit</span>
//       </div>
//       {editJson ? (
//         <div id="outerOverLayDiv">
//           <div id="innerOverLayDiv">
//             <div id="closeDiv" onClick={() => closeEditJSON()}>
//               <span className="material-icons custom-icon-style-small">
//                 close
//               </span>
//             </div>
//             <div id="jsonActionButtonsOuterDiv">
//               <div className="jsonActionButtons" onClick={updateJSON}>
//                 update json
//               </div>
//               <div className="jsonActionButtons" onClick={downloadJSON}>
//                 save json
//               </div>
//               <div className="jsonActionButtons" onClick={copyJSON}>
//                 copy json
//               </div>
//             </div>
//             <textarea
//               value={JSON.stringify(containerArray, null, 2)}
//               rows={10}
//               style={{ flexGrow: 1 }}
//               onChange={(e) => {
//                 setContainerArray(JSON.parse(e.target.value));
//               }}
//             />
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default Output;

import React, { useState, useEffect } from "react";

function Output({ containerArray, setContainerArray }) {
  const [containerArrayClone, setContainerArrayClone] = useState();
  const [jsonText, setJsonText] = useState();

  const [editJson, setEditJson] = useState(false);
  console.log(containerArray);
  const editJSON = () => {
    console.log("open edit json");

    setEditJson(true);
  };
  const closeEditJSON = () => {
    console.log("close edit json");
    setContainerArray(containerArrayClone);
    setEditJson(false);
    alert("close edit json");
  };
  const copyJSON = () => {
    console.log("copy json");
    navigator.clipboard.writeText(JSON.stringify(containerArray, null, 2));
    alert("JSON copied to clipboard");
  };

  const updateJSON = () => {
    console.log("update json");
    setContainerArrayClone(
      JSON.parse(document.querySelector("textarea").value)
    );

    alert("JSON updated");
  };

  const downloadJSON = () => {
    console.log("save json");
    var element = document.createElement("a");
    var file = new Blob([JSON.stringify(containerArray, null, 2)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "json.txt";
    element.click();
  };
  useEffect(() => {
    if (editJson) {
      setJsonText(JSON.stringify(containerArray, null, 2));
      setContainerArrayClone(containerArray);
    }
  }, [editJson]);
  useEffect(() => {
    console.log(containerArrayClone);
  }, [containerArrayClone]);

  useEffect(() => {
    if (editJson && jsonText) {
      try {
        const parsedValue = JSON.parse(jsonText);
        setContainerArray(parsedValue);
      } catch (error) {
        console.error("Error processing JSON:", error);
      }
    }
  }, [editJson, jsonText, setContainerArray]);

  return (
    <div>
      {/* <textarea value={JSON.stringify(containerArray, null, 2)} rows={10} /> */}
      <div id="editJsonDiv" onClick={() => editJSON()}>
        <div id="editJsonText">
          <div>edit json</div>
        </div>
        <span className="material-icons custom-icon-style-small">edit</span>
      </div>
      {editJson ? (
        <div id="outerOverLayDiv">
          <div id="innerOverLayDiv">
            <div id="closeDiv" onClick={() => closeEditJSON()}>
              <span className="material-icons custom-icon-style-small">
                close
              </span>
            </div>
            <div id="jsonActionButtonsOuterDiv">
              <div className="jsonActionButtons" onClick={updateJSON}>
                update json
              </div>
              <div className="jsonActionButtons" onClick={downloadJSON}>
                save json
              </div>
              <div className="jsonActionButtons" onClick={copyJSON}>
                copy json
              </div>
            </div>
            {/* <textarea
              value={JSON.stringify(jsonText, null, 2)}
              rows={10}
              style={{ flexGrow: 1 }}
              onChange={(e) => {
                setJsonText(JSON.parse(e.target.value));
              }}
            /> */}
            <textarea
              value={jsonText}
              rows={10}
              style={{ flexGrow: 1 }}
              onChange={(e) => {
                setJsonText(e.target.value);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Output;
