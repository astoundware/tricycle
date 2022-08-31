import {ColorValue} from 'react-native';

export type Theme = {
  borderRadius: number;
  colors: {
    background: ColorValue;
    panelBackground: ColorValue;
    panelTitle: ColorValue;
    border: ColorValue;
    buttonBackground: ColorValue;
    buttonBackgroundPressed: ColorValue;
    inputBackground: ColorValue;
    titleBarBorder: ColorValue;
    selectionBackground: ColorValue;
    selectionFont: ColorValue;
  };
};
