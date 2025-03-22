import React from "react";
import Svg, { Path } from "react-native-svg";
const defaultProps = {
  width: 22,
  height: 16, // Reduced height
  fill: 'red',
};
const SvgEye = ({ width, height, fill }) => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" 
    width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
        stroke="#7f7f7f" 
        strokeWidth={1} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke="#7f7f7f" 
        strokeWidth={1} 
        strokeLinecap="round"
      />
    </Svg>
  );
};


SvgEye.defaultProps = defaultProps;

export default SvgEye;


