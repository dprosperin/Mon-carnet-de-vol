import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  Appbar,
  Card,
  Paragraph,
  Title,
  Divider,
  IconButton,
  Colors,
} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {getAllResults} from '../src/services';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const History = () => {
  const [allResults, setAllResults] = useState([]);
  const [sortBy, setSortBy] = useState('latest');

  const styles = StyleSheet.create({
    appBg: {
      backgroundColor: '#F8F8FA',
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      display: 'flex',
    },
  });

  const toggleSortBy = () => {
    if (sortBy === 'latest') {
      setSortBy('oldest');
    } else {
      setSortBy('latest');
    }
  };

  const refresh = () =>
    getAllResults().then(AllResults => setAllResults(AllResults));

  useEffect(() => refresh(), []);
  useEffect(() => {
    if (sortBy === 'latest') {
      setAllResults(
        allResults.sort((a, b) => {
          return new Date(a.date) < new Date(b.date);
        }),
      );
    } else {
      setAllResults(
        allResults.sort((a, b) => {
          return new Date(a.date) > new Date(b.date);
        }),
      );
    }
  }, [sortBy, allResults]);

  return (
    <View style={styles.appBg}>
      <Appbar.Header>
        <Appbar.Content title="Historique" />
      </Appbar.Header>

      <View style={[s.container, s.h90]}>
        <FlatList
          data={allResults}
          ListHeaderComponent={
            <>
              <View style={[styles.menuContainer, s.mt2, s.mx2]}>
                <IconButton
                  style={s.m0}
                  icon="refresh"
                  size={31}
                  color={Colors.grey600}
                  onPress={() => refresh()}
                />
                <IconButton
                  style={s.m0}
                  icon={
                    sortBy === 'latest'
                      ? 'sort-clock-descending'
                      : 'sort-clock-ascending'
                  }
                  size={31}
                  color={Colors.grey600}
                  onPress={() => toggleSortBy()}
                />
              </View>
              <Divider />
            </>
          }
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
