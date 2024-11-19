import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export default function Station(props: {color: string}) {
  const {color = '#007AFF'} = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Path
        d="M12.6036 34.1096C13.0676 33.4162 13.847 33 14.6813 33H34.3187C35.153 33 35.9324 33.4162 36.3964 34.1096C37.5081 35.7707 36.3175 38 34.3187 38H14.6813C12.6825 38 11.4919 35.7707 12.6036 34.1096Z"
        fill={color}
      />
      <Rect x="17" y="16" width="14" height="20" rx="3" fill={color} />
      <Rect x="19" y="19" width="10" height="6" rx="1" fill={'#fff'} />
    </Svg>
  );
}
