import * as React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export default function Amenities(props: {color: string}) {
  const {color = '#007AFF'} = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Rect x="12" y="13" width="24" height="3" fill={color} />
      <Rect
        width="3.16236"
        height="14.2946"
        transform="matrix(0.816976 -0.576672 0.570481 0.821311 12 16.2726)"
        fill={color}
      />
      <Rect
        width="3.38041"
        height="12.8624"
        transform="matrix(0.816976 0.576672 -0.570481 0.821311 33.2383 14.0909)"
        fill={color}
      />
      <Rect x="20" y="26" width="3" height="11" fill={color} />
      <Rect
        width="7.50126"
        height="3.42179"
        transform="matrix(0.938803 -0.344455 0.339598 0.940571 21.6458 33.7935)"
        fill={color}
      />
      <Path d="M26 24H30V29.5V35H26V24Z" fill={color} />
    </Svg>
  );
}
