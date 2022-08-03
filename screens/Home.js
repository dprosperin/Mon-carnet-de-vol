import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar, TextInput, Button, Snackbar} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {factorBase, magneticCap, windTime, addResult} from '../src/utils';

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
        <Appbar.Content title="Calculs VFR" />
      </Appbar.Header>
      <View style={[s.container, s.h90]}>
        <TextInput
          style={s.mt3}
          label="Vitesse de l'avion"
          placeholder="en m/s"
          mode="outlined"
          value={airplaneSpeed.toString()}
          onChangeText={value => setAirplaneSpeed(value)}
        />
        <TextInput
          style={s.mt3}
          label="Vitesse du vent"
          placeholder="en m/s"
          mode="outlined"
          value={windSpeed.toString()}
          onChangeText={value => setWindSpeed(value)}
        />
        <TextInput
          style={s.mt3}
          label="Angle du vent"
          mode="outlined"
          placeholder="en degrés"
          value={windAngle.toString()}
          onChangeText={value => setWindAngle(value)}
        />
        <TextInput
          style={s.mt3}
          label="Distance"
          mode="outlined"
          placeholder="en m"
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
              addResult({
                factorBase: factorBase(airplaneSpeed, windAngle, windSpeed),
                magneticCap: magneticCap(windSpeed, windAngle, airplaneSpeed),
                windTime: windTime(
                  distance,
                  airplaneSpeed,
                  windAngle,
                  windSpeed,
                ),
                date: new Date().toISOString(),
              }).then(() => navigation.navigate('Historique'));
            } else {
              event.preventDefault();
              setHasError(true);
            }
          }}>
          Calculer
        </Button>
        <Snackbar visible={hasError} onDismiss={() => setHasError(false)}>
          Un ou plusieurs champs sont vides
        </Snackbar>
      </View>
    </View>
  );
};
export default Home;
