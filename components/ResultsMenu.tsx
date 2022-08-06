import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, IconButton, Colors} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Result from '../src/Result';
import DropDown from 'react-native-paper-dropdown';

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
    label: 'facteur de base',
    value: 'factorBase',
  },
  {
    label: 'cap magnetique',
    value: 'magneticCap',
  },
  {
    label: 'temps avec vent',
    value: 'windTime',
  },
  {
    label: "vitesse de l'avion",
    value: 'airplaneSpeed',
  },
  {
    label: "l'angle du vent",
    value: 'windAngle',
  },
  {
    label: 'distance',
    value: 'distance',
  },
  {
    label: 'vitesse du vent',
    value: 'windSpeed',
  },
  {
    label: 'date',
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
            label={'Trier par'}
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
