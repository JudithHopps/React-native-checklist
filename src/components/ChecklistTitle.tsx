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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

type ChecklistTitleProps = {
  title: string;
};

const ChecklistTitle: React.FC<ChecklistTitleProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ChecklistTitle;
