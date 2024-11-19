import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

export default function Amenities(props: {color: string}) {
  const {color = '#007AFF'} = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Rect
        x="21.406"
        y="32.8074"
        width="25.8263"
        height="3.67776"
        rx="1.83888"
        transform="rotate(-45 21.406 32.8074)"
        fill={color}
      />
      <Rect
        x="15.3365"
        y="21.9101"
        width="15.6202"
        height="3.43286"
        rx="1.71643"
        transform="rotate(45 15.3365 21.9101)"
        fill={color}
      />
    </Svg>
  );
}
