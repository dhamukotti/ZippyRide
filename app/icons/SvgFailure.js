import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
};
const SvgFailure = ({width, height}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 256 256">
      <G
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}>
        <Path
          d="M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0s45 20.187 45 45-20.187 45-45 45z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#ec0000"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M28.5 65.5a4 4 0 01-2.829-6.828l33-33a4 4 0 115.656 5.657l-33 33A3.986 3.986 0 0128.5 65.5z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M61.5 65.5a3.987 3.987 0 01-2.828-1.172l-33-33a4 4 0 015.657-5.657l33 33a3.997 3.997 0 010 5.656A3.987 3.987 0 0161.5 65.5z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  );
};
SvgFailure.defaultProps = defaultProps;

export default SvgFailure;
