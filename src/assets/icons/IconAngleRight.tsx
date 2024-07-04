import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const IconAngleRight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    aria-hidden="true"
    {...props}
    viewBox="0 0 24 24"
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 5 7 7-7 7"
    />
  </Svg>
)
export default IconAngleRight;