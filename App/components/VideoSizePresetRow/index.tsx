import React from 'react';
import {useTranslation} from 'react-i18next';

import {
  default as VideoDimensionsPresetRow,
  type Props as VideoDimensionsPresetRowProps,
} from '../VideoDimensionsPresetRow';

export type Props = VideoDimensionsPresetRowProps;

export default function VideoSizePresetRow(props: Props) {
  const {t} = useTranslation();

  return (
    <VideoDimensionsPresetRow
      {...props}
      separator={t('videoSizePresets.dimensionSeparator')}
    />
  );
}
