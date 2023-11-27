import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import ChecklistTitle from './src/components/ChecklistTitle';
import WeekSelection from './src/components/WeekSelection';
import WeeklyData from './src/components/WeeklyData';
import Divider from './src/components/common/Divider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  weekSelectionContainer: {
    justifyContent: 'space-around', // 주변에 여백을 두고 배치
    width: '100%', // 부모 View의 100%를 차지
    marginBottom: 16,
  },
});

const MainScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState(15);

  const handleSelectWeek = (week: number) => {
    setSelectedWeek(week);
    console.log(selectedWeek);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChecklistTitle title="Checklists" />

      <View style={styles.weekSelectionContainer}>
        <WeekSelection
          selectedWeek={selectedWeek}
          onSelectWeek={handleSelectWeek}
        />
      </View>

      <Divider />

      <WeeklyData selectedWeek={selectedWeek} />
    </SafeAreaView>
  );
};

export default MainScreen;
