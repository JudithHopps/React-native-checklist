import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {checkboxIcon} from '../assets/svgs/svg';
import ProgressBar from './ProgressBar';

type ChecklistFetchItem = {
  weekNumber: number;
  content: string;
};

type ChecklistItem = {
  weekNumber: number;
  content: string;
  completed: boolean;
};

type WeeklyDataProps = {
  selectedWeek: number;
};

const WeeklyData: React.FC<WeeklyDataProps> = ({selectedWeek}) => {
  const [checklistData, setChecklistData] = useState<ChecklistItem[]>([]);
  const [selectedWeekData, setSelectedWeekData] = useState<ChecklistItem[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://file.notion.so/f/f/772fc649-1fcc-498c-94cc-cff14dc51887/cd375ffb-16ed-4926-bda3-d0b9605addf0/checklist_seeds.json?id=6dd919ce-57bd-4ca3-91f0-2923b9433edd&table=block&spaceId=772fc649-1fcc-498c-94cc-cff14dc51887&expirationTimestamp=1701165600000&signature=w7_V9XeCMfTwcb_621a3Bdkk4twojcAJsrGtdi88HAA&downloadName=checklist_seeds.json',
        );
        const data: ChecklistFetchItem[] = await response.json();

        const initializedData: ChecklistItem[] = data.map(item => ({
          ...item,
          completed: false,
        }));
        setChecklistData(initializedData);
        // console.log(initializedData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getFilteredData = () => {
      return checklistData.filter(item => item.weekNumber === selectedWeek);
    };

    const filteredData = getFilteredData();
    const completedTasks = filteredData.filter(item => item.completed);

    setSelectedWeekData(filteredData);
    setCompletedCount(completedTasks.length);
    setTotalItems(filteredData.length);
  }, [checklistData, selectedWeek]);

  return (
    <View style={styles.container}>
      <ProgressBar totalItems={totalItems} completedCount={completedCount} />
      <FlatList
        data={selectedWeekData}
        renderItem={({item}) => (
          <View style={styles.checklistContatiner}>
            {checkboxIcon(item.completed)}
            <Text style={styles.week}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  checklistContatiner: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  week: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
    paddingLeft: 12,
  },
});

export default WeeklyData;