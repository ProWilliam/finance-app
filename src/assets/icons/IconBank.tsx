import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg"; 

const IconBank = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    aria-hidden="true"
    {...props}
    viewBox="0 0 24 24"
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
    />
  </Svg>
)
export default IconBank;
