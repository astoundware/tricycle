import React from 'react';
import {Image, Pressable} from 'react-native';

import styles from './styles';

export default function ImageButton({style, imageSource, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#e9e9e9' : '#f9f9f9',
        },
        style,
        styles.container,
      ]}
      onPress={onPress}>
      <Image style={styles.image} source={imageSource} />
    </Pressable>
  );
}
