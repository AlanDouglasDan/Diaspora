import React, { FC } from "react";
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Defs,
  Circle,
} from "react-native-svg";

interface SuperLike2Props {}

const SuperLike2: FC<SuperLike2Props> = () => {
  return (
    <Svg width="34" height="34" viewBox="0 0 46 46" fill="none">
      <Circle cx="23" cy="23" r="23" fill="url(#paint0_linear_4842_25326)" />
      <Path
        d="M22.7805 13L19.4852 19.6082L12 20.6746L17.4224 25.8827L16.1262 33.125L22.7805 29.6398L29.4362 33.125L28.1496 25.8827L33.5625 20.6746L26.1187 19.6082L22.7805 13Z"
        fill="white"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4842_25326"
          x1="23"
          y1="0"
          x2="23"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF7578" />
          <Stop offset="1" stopColor="#CF0018" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SuperLike2;
