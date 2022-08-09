import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar, TextInput, Button, Snackbar} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Result from '../src/Result';
import {addResult} from '../src/services';
import i18next from '../translations/i18next';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const Home = ({navigation}) => {
  const [airplaneSpeed, setAirplaneSpeed] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windAngle, setWindAngle] = useState(0);
  const [distance, setDistance] = useState(0);
  const [hasError, setHasError] = useState(false);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content
          title={i18next.t('VisualFlightRulesCalculator.title_short')}
        />
      </Appbar.Header>
      <View style={[s.container, s.h90]}>
        <TextInput
          style={s.mt3}
          label={i18next.t('Inputs.airplaneSpeed')}
          placeholder={i18next.t('Units.metersPerSecond')}
          mode="outlined"
          value={airplaneSpeed.toString()}
          onChangeText={value => setAirplaneSpeed(value)}
        />
        <TextInput
          style={s.mt3}
          label={i18next.t('Inputs.windSpeed')}
          placeholder={i18next.t('Units.metersPerSecond')}
          mode="outlined"
          value={windSpeed.toString()}
          onChangeText={value => setWindSpeed(value)}
        />
        <TextInput
          style={s.mt3}
          label={i18next.t('Inputs.windAngle')}
          mode="outlined"
          placeholder={i18next.t('Units.degrees')}
          value={windAngle.toString()}
          onChangeText={value => setWindAngle(value)}
        />
        <TextInput
          style={s.mt3}
          label={i18next.t('Inputs.distance')}
          mode="outlined"
          placeholder={i18next.t('Units.meters')}
          value={distance.toString()}
          onChangeText={value => setDistance(value)}
        />
        <Button
          mode="contained"
          style={s.mt4}
          onPress={event => {
            if (
              airplaneSpeed !== '' &&
              windSpeed !== '' &&
              windAngle !== '' &&
              distance !== ''
            ) {
              setHasError(false);
              addResult(
                new Result({airplaneSpeed, windAngle, windSpeed, distance}),
              ).then(() => navigation.navigate(i18next.t('History.title')));
            } else {
              event.preventDefault();
              setHasError(true);
            }
          }}>
          {i18next.t('Actions.calculate')}
        </Button>
        <Snackbar visible={hasError} onDismiss={() => setHasError(false)}>
          {i18next.t('Form.emptyField_plural')}
        </Snackbar>
      </View>
    </View>
  );
};
export default Home;
