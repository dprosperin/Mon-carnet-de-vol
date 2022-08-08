import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, IconButton, Colors} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Result from '../src/Result';
import DropDown from 'react-native-paper-dropdown';
import i18next from '../translations/i18next';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const styles = StyleSheet.create({
  menuContainer: {
    ...s.mt2,
    ...s.mx2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'center',
  },
});

type ResultsMenuProps = {
  sortBy?: keyof Result;
  sortOrder: 'ascending' | 'descending';

  onRefresh(): void;
  onSortOrderChange(): void;
  onClean(): void;
  onSortByChange(value: keyof Result): void;
};

const sortByList = [
  {
    label: i18next.t('Computed.factorBase'),
    value: 'factorBase',
  },
  {
    label: i18next.t('Computed.magneticCap'),
    value: 'magneticCap',
  },
  {
    label: i18next.t('Computed.windTime'),
    value: 'windTime',
  },
  {
    label: i18next.t('Inputs.airplaneSpeed'),
    value: 'airplaneSpeed',
  },
  {
    label: i18next.t('Inputs.windAngle'),
    value: 'windAngle',
  },
  {
    label: i18next.t('Inputs.distance'),
    value: 'distance',
  },
  {
    label: i18next.t('Inputs.windSpeed'),
    value: 'windSpeed',
  },
  {
    label: i18next.t('createdDate'),
    value: 'date',
  },
];

const ResultsMenu = ({
  sortOrder,
  onClean,
  onRefresh,
  onSortOrderChange,
  onSortByChange,
  sortBy,
}: ResultsMenuProps): typeof ResultsMenu => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <>
      <View style={styles.menuContainer}>
        <View style={[s.mrAuto, {flex: 0.75}]}>
          <DropDown
            label={i18next.t('Actions.sortBy')}
            mode={'flat'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={sortBy}
            setValue={onSortByChange}
            list={sortByList}
          />
        </View>
        <IconButton
          style={s.m0}
          icon="delete"
          size={31}
          color={Colors.grey600}
          onPress={() => onClean()}
        />
        <IconButton
          style={s.m0}
          icon="refresh"
          size={31}
          color={Colors.grey600}
          onPress={() => onRefresh()}
        />
        <IconButton
          style={s.m0}
          icon={
            sortOrder === 'descending' ? 'sort-descending' : 'sort-ascending'
          }
          size={31}
          color={Colors.grey600}
          onPress={() => onSortOrderChange()}
        />
      </View>
      <Divider />
    </>
  );
};

export default ResultsMenu;
