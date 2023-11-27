import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  week: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

type WeekItemProps = {
  item: number;
};

const WeekItem: React.FC<WeekItemProps> = ({item}) => (
  <View style={styles.week}>
    <Text>{`Week ${item}`}</Text>
  </View>
);

type WeekSelectionProps = {
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
};

const WeekSelection: React.FC<WeekSelectionProps> = ({
  selectedWeek,
  onSelectWeek,
}) => {
  const data = Array.from({length: 41}, (_, index) => index);

  const handleSelectWeek = (week: number) => {
    onSelectWeek(week);
  };

  const renderItem = ({item}: {item: number}) => (
    <TouchableOpacity onPress={() => handleSelectWeek(item)}>
      <WeekItem item={item} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal={true} // 수평 스크롤
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
      extraData={selectedWeek}
      onEndReached={() => {}}
      onEndReachedThreshold={0.5}
    />
  );
};

export default WeekSelection;
