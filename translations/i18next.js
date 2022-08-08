import i18next from 'i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';
import fr from './fr-FR.json';
import en from './en-GB.json';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';

i18next.use(i18nextReactNative).init({
  resources: {
    fr: fr,
    en: en,
  },
  interpolation: {
    format: function (value, format, lng) {
      if (value instanceof Date) {
        let dateOptionsFormat = Object.fromEntries(JSON.parse(format));
        return value.toLocaleDateString(lng, dateOptionsFormat);
      }
      return value;
    },
  },
});

export default i18next;
