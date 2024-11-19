import * as React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export default function Amenities(props: {color: string}) {
  const {color = '#007AFF'} = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Circle cx="26" cy="14" r="6.5" stroke={color} />
      <Circle cx="36.5" cy="24.5" r="6" stroke={color} />
      <Circle cx="15.5" cy="24.5" r="6" stroke={color} />
      <Path
        d="M11.5 24V24C13.7902 21.9961 17.2098 21.9961 19.5 24V24"
        stroke={color}
      />
      <Path
        d="M13 25.5V25.5C14.4159 24.0841 16.6778 23.9815 18.2161 25.2634L18.5 25.5"
        stroke={color}
      />
      <Path
        d="M14.5 27V27C15.0173 26.224 16.1153 26.1153 16.7747 26.7748L16.9999 27"
        stroke={color}
      />
      <Rect x="20" y="34" width="12" height="7" fill={color} />
      <Rect x="27" y="37" width="3" height="4" fill="white" />
      <Path d="M26 26L34.6603 34.25H17.3397L26 26Z" fill={color} />
      <Circle cx="26" cy="13" r="3" fill={color} />
      <Rect x="24" y="15" width="4" height="3" fill={color} />
      <Path
        d="M36.5 21.5L34.7386 23.966C34.2727 24.6183 34.1348 25.4493 34.3651 26.2171L34.4432 26.4773C34.5453 26.8175 34.7495 27.1181 35.0283 27.3381V27.3381C35.8213 27.9642 36.9797 27.7805 37.5401 26.9399L37.7669 26.5997C38.2152 25.9272 38.2394 25.0576 37.8293 24.3612L36.324 21.8054"
        stroke={color}
      />
    </Svg>
  );
}
