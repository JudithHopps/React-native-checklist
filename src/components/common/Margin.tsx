import React from 'react';
import {View, StyleSheet} from 'react-native';

type MarginProps = {
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
};

const Margin: React.FC<MarginProps> = ({
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
}) => {
  const styles = StyleSheet.create({
    separator: {
      marginTop: top,
      marginBottom: bottom,
      marginRight: right,
      marginLeft: left,
    },
  });

  return <View style={styles.separator} />;
};

export default Margin;
