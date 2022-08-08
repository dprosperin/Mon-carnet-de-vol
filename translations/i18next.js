import i18next from 'i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';
import fr from './fr-FR.json';
import en from './en-GB.json';

i18next.use(i18nextReactNative).init({
  resources: {
    fr: fr,
    en: en,
  },
});

export default i18next;
