import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ChecklistTitle from './src/components/ChecklistTitle'; // ChecklistTitle 컴포넌트 임포트
// import WeekSelection from './WeekSelection'; // WeekSelection 컴포넌트 임포트
// import WeeklyData from './WeeklyData'; // WeeklyData 컴포넌트 임포트

const MainScreen = () => {
  // const [selectedWeek, setSelectedWeek] = useState(0); // 선택된 주 상태

  // // 주 선택 이벤트 핸들러
  // const handleSelectWeek = week => {
  //   setSelectedWeek(week);
  //   // 선택된 주에 따른 처리
  // };
  useState();
  return (
    <View style={styles.container}>
      {/* Checklist 제목 */}
      <ChecklistTitle title="Checklists" />
      {/* 
      {/* 0~40주를 선택하는 레이아웃 */}
      {/* <WeekSelection
        selectedWeek={selectedWeek}
        onSelectWeek={handleSelectWeek}
      // /> */}

      {/* 각 주의 데이터 레이아웃 */}
      {/* <WeeklyData weekData=해당 주의 데이터 /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 스타일링
  },
});

export default MainScreen;
