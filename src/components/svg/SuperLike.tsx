import React, { FC } from "react";
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Defs,
  G,
  Circle,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeBlend,
} from "react-native-svg";

interface SuperLikeProps {}

const SuperLike: FC<SuperLikeProps> = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <G filter="url(#filter0_d_4842_25301)">
        <Circle cx="31" cy="16" r="16" fill="url(#paint0_linear_4842_25301)" />
      </G>
      <Path
        d="M30.4995 8L28.2071 12.597L23 13.3388L26.7721 16.9619L25.8704 22L30.4995 19.5755L35.1295 22L34.2345 16.9619L38 13.3388L32.8217 12.597L30.4995 8Z"
        fill="white"
      />
      <Defs>
        <Filter
          id="filter0_d_4842_25301"
          x="0"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="15" />
          <FeGaussianBlur stdDeviation="7.5" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.913725 0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0.2 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4842_25301"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4842_25301"
            result="shape"
          />
        </Filter>
        <LinearGradient
          id="paint0_linear_4842_25301"
          x1="31"
          y1="0"
          x2="31"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF7578" />
          <Stop offset="1" stopColor="#CF0018" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SuperLike;
