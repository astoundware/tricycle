import React from 'react';
import {useTranslation} from 'react-i18next';

import {
  default as VideoDimensionsPresetRow,
  type Props as VideoDimensionsPresetRowProps,
} from '../VideoDimensionsPresetRow';

export type Props = VideoDimensionsPresetRowProps;

export default function VideoAspectRatioPresetRow(props: Props) {
  const {t} = useTranslation();

  return (
    <VideoDimensionsPresetRow
      {...props}
      allowDecimals={true}
      separator={t('videoAspectRatioPresets.dimensionSeparator')}
    />
  );
}
