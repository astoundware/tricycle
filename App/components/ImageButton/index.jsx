import React from 'react';
import {Image, Pressable} from 'react-native';

import colors from '../../constants/colors';
import styles from './styles';

export default function ImageButton({style, imageSource, disabled, onPress}) {
  let containerStyle = {...styles.container};
  let imageStyle = {...styles.image};

  if (disabled) {
    containerStyle.borderWidth = 0;
    imageStyle.opacity = 0.25;
  }

  return (
    <Pressable
      style={({pressed}) => [
        containerStyle,
        {
          backgroundColor: pressed
            ? colors.buttonBackgroundPressed
            : colors.buttonBackground,
        },
        style,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Image style={imageStyle} source={imageSource} />
    </Pressable>
  );
}