import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 60,
    flexShrink: 0,
    paddingVertical: 20,
    paddingHorizontal: 146,
    paddingBottom: 18,
  },
  week: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

type WeekSelectionProps = {
  selectedWeek: number;
  onSelectWeek: number;
};

const WeekSelection: React.FC<WeekSelectionProps> = ({
  selectedWeek,
  onSelectWeek,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.week}>
        {selectedWeek} {onSelectWeek}
      </Text>
    </View>
  );
};

export default WeekSelection;
