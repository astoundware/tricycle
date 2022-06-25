import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import TemplateRow from '../TemplateRow';
import styles from './styles';

export default function TemplateTable({
  style,
  templates,
  onNameChange,
  onRemove,
}) {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styles.header]}>
        <View style={styles.nameHeader}>
          <Text>{t('items.name')}</Text>
        </View>
        <Text>{t('items.remove')}</Text>
      </View>
      <FlatList
        style={styles.list}
        data={templates}
        renderItem={({index, item}) => (
          <TemplateRow
            style={styles.row}
            name={item.name}
            onNameChange={name => onNameChange && onNameChange(index, name)}
            onRemove={() => onRemove && onRemove(index)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
