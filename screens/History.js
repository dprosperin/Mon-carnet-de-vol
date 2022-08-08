import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {useResults, clearAllResults} from '../src/services';
import {ResultsList, useToggleSortOrder} from '../components/ResultsList';
import i18next from '../translations/i18next';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const History = () => {
  const [results, sync] = useResults([]);
  const [sortOrder, toggleSortOrder] = useToggleSortOrder();
  const [sortBy, setSortBy] = useState('date');

  const styles = StyleSheet.create({
    appBg: {
      backgroundColor: '#F8F8FA',
    },
  });

  return (
    <View style={styles.appBg}>
      <Appbar.Header>
        <Appbar.Content title={i18next.t('History.title')} />
      </Appbar.Header>

      <View style={[s.container, s.h90]}>
        <ResultsList
          results={results}
          sortOrder={sortOrder}
          sortBy={sortBy}
          onDelete={result => result.remove().then(() => sync())}
          onSortOrderChange={() => toggleSortOrder()}
          onPressResult={item => console.info(item)}
          onRefresh={() => sync()}
          onSortByChange={value => setSortBy(value)}
          onClean={() => clearAllResults().then(() => sync())}
        />
      </View>
    </View>
  );
};
export default History;
