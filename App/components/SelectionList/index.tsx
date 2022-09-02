import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {theme} from '@config';
import {DisplayValue} from '@models';
import styles from './styles';

export type Props = {
  style?: any;
  items?: DisplayValue[];
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
};

export default function SelectionList({
  style,
  items,
  selectedKey,
  onSelectionChange,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      {(items || []).map(function (item) {
        const isSelected = item.key === selectedKey;
        const itemStyle = {
          backgroundColor: isSelected
            ? theme.colors.selectionBackground
            : 'transparent',
        };
        const textStyle = {
          color: isSelected ? theme.colors.selectionFont : 'black',
        };
        return (
          <Pressable
            key={item.key}
            style={[styles.itemContainer, itemStyle]}
            onPress={() => onSelectionChange && onSelectionChange(item.key)}>
            <Text style={textStyle} numberOfLines={1}>
              {item.text}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
