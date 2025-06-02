import { ImageSourcePropType } from 'react-native';

interface AboutData {
  appName: string;
  version: string;
  description: string;
  logo: ImageSourcePropType;
}

export const aboutLogic = (): AboutData => {
  const appName = 'MenuZen';
  const version = '1.0.0';
  const description = 'MenuZen est une application qui aide à planifier les repas.';
  const logo = require('@/assets/images/icon.png');

  return {
    appName,
    version,
    description,
    logo,
  };
};

export default aboutLogic;