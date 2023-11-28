import React, {useRef, useEffect, useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Rectangle897} from '../assets/svgs/Icons';

const styles = StyleSheet.create({
  selectedweekTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#FFF',
    paddingTop: 10,
    paddingHorizontal: 22,
  },
  unselectedweekTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    paddingTop: 10,
    paddingHorizontal: 22,
  },
  selectedweekNum: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFF',
    paddingTop: 4,
    paddingHorizontal: 10,
  },
  unselectedweekNum: {
    fontSize: 18,
    fontWeight: '400',
    color: '#999',
    paddingTop: 4,
    paddingHorizontal: 10,
  },
  rectangleComponent: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: 50,
    height: 62,
  },
  WeekItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type WeekItemProps = {
  item: number;
  isSelected: boolean;
};

type WeekSelectionProps = {
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
};

type RenderItemProps = {
  item: number;
  handleSelectWeek: (week: number) => void;
  selectedWeek: number;
};

const WeekItem: React.FC<WeekItemProps> = ({item, isSelected}) => {
  return (
    <View style={styles.WeekItemContainer}>
      <Text
        style={isSelected ? styles.selectedweekTxt : styles.unselectedweekTxt}>
        week
      </Text>
      <Text
        style={isSelected ? styles.selectedweekNum : styles.unselectedweekNum}>
        {item}
      </Text>
    </View>
  );
};

const RenderItem: React.FC<RenderItemProps> = ({
  item,
  selectedWeek,
  handleSelectWeek,
}) => (
  <TouchableOpacity onPress={() => handleSelectWeek(item)}>
    <View style={styles.rectangleComponent}>
      {Rectangle897(item === selectedWeek)}
    </View>
    <WeekItem item={item} isSelected={item === selectedWeek} />
  </TouchableOpacity>
);

const WeekSelection: React.FC<WeekSelectionProps> = ({
  selectedWeek,
  onSelectWeek,
}) => {
  const scrollToSelectedWeek = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: selectedWeek,
        viewPosition: 0.5,
      });
    }
  }, [selectedWeek]);

  useEffect(() => {
    scrollToSelectedWeek();
  }, [scrollToSelectedWeek]);

  const flatListRef = useRef<FlatList<any>>(null);

  const data: number[] = Array.from({length: 41}, (_, index) => index);

  const handleSelectWeek = (week: number) => {
    onSelectWeek(week);
  };
  const ITEM_HEIGHT = 73;

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      ref={flatListRef}
      horizontal={true}
      data={data}
      renderItem={({item}) => (
        <RenderItem
          item={item}
          handleSelectWeek={handleSelectWeek}
          selectedWeek={selectedWeek}
        />
      )}
      keyExtractor={item => item.toString()}
      extraData={selectedWeek}
      onEndReachedThreshold={0.5}
      getItemLayout={getItemLayout}
      initialScrollIndex={selectedWeek - 2}
    />
  );
};

export default WeekSelection;
