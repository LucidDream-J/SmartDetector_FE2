import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onSelectChange }) => {
  return (
    <div>
      <h2 className="">{"Magic Brain Face Detector"}</h2>
      <div>
        <div className="form center pa4 br3 shadow-5">
          <input
            className=" f4 pa2 w-50 center"
            type="text"
            placeholder='Type in a URL for your image'
            onChange={onInputChange}
          />
          <button
            className="w-20 grow f5 link ph3 pv2 dib black bg-light pointer"
            onClick={onButtonSubmit}
          >
            {/* {"Detect"} */}
            Detect
          </button>
          <select className="w-20 f5 ph3" onChange={onSelectChange}>
            <option value="FACE_DETECT_MODEL">Face Detection</option>
            <option value="GENERAL_MODEL">General</option>
            <option value="COLOR_MODEL">Color</option>
            <option value="FOOD_MODEL">Food</option>
            <option value="CELEBRITY_MODEL">Celebrity</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
