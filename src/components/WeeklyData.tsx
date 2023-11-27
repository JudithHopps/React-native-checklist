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

type WeeklyDataProps = {
  weekData: string;
};

const WeeklyData: React.FC<WeeklyDataProps> = ({weekData}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.week}>{weekData}</Text>
    </View>
  );
};

export default WeeklyData;
