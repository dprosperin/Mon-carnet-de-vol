import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Appbar, Card, Paragraph} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {getAllResults} from '../src/utils';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const History = () => {
  const [allResults, setAllResults] = useState({});

  const styles = StyleSheet.create({
    appBg: {
      backgroundColor: '#F8F8FA',
    },
  });

  useEffect(() => {
    getAllResults().then(AllResults => setAllResults(AllResults));
  }, []);

  return (
    <View style={styles.appBg}>
      <Appbar.Header>
        <Appbar.Content title="Historique" />
      </Appbar.Header>

      <View style={[s.container, s.h90]}>
        <FlatList
          data={allResults}
          renderItem={({item}) => {
            let {factorBase, magneticCap, windTime, date} = item;

            date = new Date(date);
            const dateOptionsFormat = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };

            return (
              <Card elevation={1} style={s.mt3}>
                <Card.Title title="Calcul VFR" />
                <Card.Content>
                  <Paragraph>
                    facteur de base = {factorBase.toFixed(2)} min/NM
                  </Paragraph>
                  <Paragraph>
                    cap magnetique = {magneticCap.toFixed(2)}
                  </Paragraph>
                  <Paragraph>temps avec vent = {windTime.toFixed(2)}</Paragraph>
                  <Paragraph style={[s.textMuted]}>
                    Calculé le
                    {date.toLocaleDateString('fr-FR', dateOptionsFormat)}
                  </Paragraph>
                </Card.Content>
              </Card>
            );
          }}
        />
      </View>
    </View>
  );
};
export default History;
