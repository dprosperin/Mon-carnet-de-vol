import {SENTRY_DSN} from '@env';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: SENTRY_DSN,
});

export default Sentry;
