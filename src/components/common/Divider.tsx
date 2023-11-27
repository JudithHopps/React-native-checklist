import React from 'react';
import {View, StyleSheet} from 'react-native';

type DividerProps = {
  color?: string;
  height?: number;
};

const Divider: React.FC<DividerProps> = ({color = '#F6F5F8', height = 1}) => {
  const styles = StyleSheet.create({
    separator: {
      height: height,
      backgroundColor: color,
    },
  });

  return <View style={styles.separator} />;
};

export default Divider;
