import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Card, Paragraph, Title, Button} from 'react-native-paper';
import Result from '../src/Result';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import ResultsMenu from './ResultsMenu';
import i18next from '../translations/i18next';

type ResultsListProps = {
  results: Result[];
  sortBy: keyof Result;
  sortOrder: 'ascending' | 'descending';
  onPressResult(arg0: Result): void;

  onRefresh(): void;
  onSortOrderChange(): void;
  onDelete(item: Result): void;
  onClean(): void;
  onSortByChange(value: keyof Result): void;
};

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {styles: s} = bootstrapStyleSheet;

const sort = (
  results: Result[],
  sortBy: keyof Result,
  sortOrder: 'ascending' | 'descending',
): Result[] => {
  results.sort((a, b) => {
    const operand1 = parseFloat(a[sortBy] ? a[sortBy] : 0);
    const operand2 = parseFloat(b[sortBy] ? b[sortBy] : 0);

    if (sortOrder === 'ascending') {
      return operand1 - operand2;
    } else {
      return operand2 - operand1;
    }
  });
  return results;
};

const ResultsList = ({
  results,
  sortBy,
  sortOrder,
  onPressResult,
  onDelete,
  onClean,
  onRefresh,
  onSortOrderChange,
  onSortByChange,
}: ResultsListProps): JSX.Element => {
  results = sort(results, sortBy, sortOrder);

  return (
    <FlatList
      data={results}
      ListHeaderComponent={
        <ResultsMenu
          sortBy={sortBy}
          sortOrder={sortOrder}
          onRefresh={() => onRefresh()}
          onSortOrderChange={() => onSortOrderChange()}
          onClean={() => onClean()}
          onSortByChange={value => onSortByChange(value)}
        />
      }
      ListEmptyComponent={
        <Title style={[s.textMuted, s.textCenter, s.mt2]}>
          {i18next.t('Display.emptyHistory')}
        </Title>
      }
      renderItem={({item}: {item: Result}) => {
        return (
          <Card elevation={1} style={s.mt3} onPress={() => onPressResult(item)}>
            <Card.Title title="Calcul VFR" />
            <Card.Content>
              <Paragraph>
                {i18next.t('Display.factorBase', {result: item})}
              </Paragraph>
              <Paragraph>
                {i18next.t('Display.magneticCap', {result: item})}
              </Paragraph>
              <Paragraph>
                {i18next.t('Display.windTime', {result: item})}
              </Paragraph>
              <Paragraph style={[s.textMuted]}>
                {i18next.t('Display.calculatedOn', {result: item})}
              </Paragraph>
              <Card.Actions style={[s.justifyContentEnd]}>
                <Button
                  icon={'delete'}
                  mode="contained"
                  uppercase={false}
                  onPress={() => onDelete(item)}>
                  {i18next.t('Actions.remove')}
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
        );
      }}
    />
  );
};

const useToggleSortOrder = (
  initialSortOrder: 'ascending' | 'descending' = 'ascending',
): ['ascending' | 'descending', Function] => {
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const toggleSortOrder = () => {
    if (sortOrder === 'ascending') {
      setSortOrder('descending');
    } else {
      setSortOrder('ascending');
    }
  };

  return [sortOrder, toggleSortOrder];
};

export {ResultsList, useToggleSortOrder, sort};
