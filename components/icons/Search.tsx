import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export default function Amenities(props: {color: string}) {
  const {color = '#007AFF'} = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Circle
        cx="25"
        cy="25"
        r="9"
        fill="white"
        stroke={color}
        stroke-width="3"
      />
      <Path d="M32.4554 31.7838L40 37.8317" stroke={color} stroke-width="3" />
    </Svg>
  );
}
