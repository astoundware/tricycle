import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import {DisplayValue} from '@models';

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
    <View style={style}>
      <FlatList
        data={items}
        renderItem={function ({item}) {
          const textStyle = {
            backgroundColor: item.key === selectedKey ? 'gray' : 'white',
          };
          return (
            <Pressable
              onPress={() => onSelectionChange && onSelectionChange(item.key)}>
              <Text style={textStyle}>{item.text}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
