import React from 'react';
import {Image, ImageSourcePropType, Pressable} from 'react-native';

import {theme} from '@config';
import styles from './styles';

export type Props = {
  style?: any;
  imageSource: ImageSourcePropType;
  disabled?: boolean;
  onPress?: () => void;
};

export default function ImageButton({
  style,
  imageSource,
  disabled,
  onPress,
}: Props) {
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
            ? theme.colors.buttonBackgroundPressed
            : theme.colors.buttonBackground,
        },
        style,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Image style={imageStyle} source={imageSource} />
    </Pressable>
  );
}
