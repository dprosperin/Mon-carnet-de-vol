import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Appbar, Card, Paragraph, Title} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {getAllResults} from '../src/services';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const History = () => {
  const [allResults, setAllResults] = useState([]);

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
          ListEmptyComponent={
            <Title style={[s.textMuted, s.textCenter]}>
              L'historique est vide
            </Title>
          }
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
                  <Paragraph>facteur de base = {factorBase} min/NM</Paragraph>
                  <Paragraph>cap magnetique = {magneticCap}</Paragraph>
                  <Paragraph>temps avec vent = {windTime}</Paragraph>
                  <Paragraph style={[s.textMuted]}>
                    Calculé le
                    {' ' + date.toLocaleDateString('fr-FR', dateOptionsFormat)}
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
