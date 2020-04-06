import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ bbBox, imageUrl}) => {
   
    return(
        <div className='center ma imageDiv'>
         <img id='inputImage' className="sourceImage" src={ imageUrl } alt="imageDetect"/> 
         <div className="bounding-box" style={{top: bbBox.topRow, right: bbBox.rightColmn, bottom: bbBox.bottomRow, left: bbBox.leftColmn}}> </div>
        </div>
    ); 
}

export default FaceRecognition;


