import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type ProgressBarProps = {
  completedCount: number;
  totalItems: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  completedCount,
  totalItems,
}) => {
  const percentage =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressDetail}>
        <Text style={styles.completedTextStyle}>
          {completedCount} of {totalItems} completed{' '}
        </Text>
        <Text style={styles.percentageTextStyle}>{percentage}%</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={{...styles.progressIndicator, width: `${percentage}%`}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 335,
    marginBottom: 28,
  },
  progressDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completedTextStyle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
  percentageTextStyle: {
    color: '#0BB',
    fontSize: 14,
    fontWeight: '700',
    paddingTop: 2,
  },
  progressBar: {
    backgroundColor: '#ddd',
    marginTop: 17,
  },
  progressIndicator: {
    height: 6,
    backgroundColor: '#44CEC6',
    borderRadius: 5,
  },
});

export default ProgressBar;
