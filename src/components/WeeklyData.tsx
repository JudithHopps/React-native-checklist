import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {CheckboxIcon, ChecklistsIcon, MinusIcon} from '../assets/svgs/Icons';
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
  setIsVisibleEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
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
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  editContatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  uncompletelist: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
    paddingHorizontal: 12,
  },
  completelist: {
    fontSize: 14,
    fontWeight: '400',
    color: '#C4C4C4',
    paddingHorizontal: 12,
    textDecorationLine: 'line-through',
  },
  emptyListContainer: {
    marginTop: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChecklistsText: {
    fontSize: 20,
    color: '#84858F',
    fontWeight: '700',
    marginBottom: 8,
  },
  addChecklistsText: {
    fontSize: 13,
    color: '#999',
  },
  addlistContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  minusContainer: {
    width: 28,
    alignItems: 'flex-end',
  },
});

const WeeklyData = forwardRef<any, WeeklyDataProps>(
  ({selectedWeek, setIsVisibleEditBtn, isEditing}, ref) => {
    const [checklistData, setChecklistData] = useState<ChecklistItem[]>([]);
    const [selectedWeekData, setSelectedWeekData] = useState<ChecklistItem[]>(
      [],
    );
    const [updatedSelectedData, setUpdatedSelectedData] = useState<
      ChecklistItem[]
    >([]);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    useImperativeHandle(ref, () => ({
      addChecklist,
      handleDelete,
    }));

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

      setSelectedWeekData(filteredData);
      setUpdatedSelectedData(filteredData);
    }, [checklistData, selectedWeek]);

    useEffect(() => {
      const completedTasks = selectedWeekData.filter(item => item.completed);
      setCompletedCount(completedTasks.length);
      setTotalItems(selectedWeekData.length);
      setIsVisibleEditBtn(selectedWeekData.length > 0);
    }, [selectedWeekData, setIsVisibleEditBtn]);

    useEffect(() => {
      console.log('upup', updatedSelectedData);
    }, [updatedSelectedData]);

    const toggleComplete = (index: number) => {
      const modifiedData = [...selectedWeekData];
      modifiedData[index].completed = !modifiedData[index].completed;
      setSelectedWeekData(modifiedData);
    };

    const toggleDelete = (index: number) => {
      const modifiedData = updatedSelectedData.filter((_, i) => i !== index);
      setUpdatedSelectedData(modifiedData);
      console.log('Update', modifiedData);
    };

    const handleDelete = () => {
      if (updatedSelectedData) {
        const updatedData = [
          ...checklistData.filter(v => v.weekNumber !== selectedWeek),
          ...updatedSelectedData,
        ];

        setChecklistData(updatedData);
        console.log('gogo');
        console.log('Update', updatedSelectedData);
      }
    };
    // const handleDelete = () => {
    //   if (updatedSelectedData && updatedSelectedData.length > 0) {
    //     const updatedData = checklistData.filter(item => {
    //       return !updatedSelectedData.some(
    //         selectedItem => selectedItem.weekNumber === item.weekNumber,
    //       );
    //     });

    //     setChecklistData(updatedData);
    //     console.log('gogo');
    //     console.log('Update', updatedSelectedData);
    //   }
    // };

    const addChecklist = (newChecklist: string) => {
      const updatedChecklist = [
        {weekNumber: selectedWeek, content: newChecklist, completed: false},
        ...checklistData,
      ];
      setChecklistData(updatedChecklist);
    };

    return (
      <View style={styles.container}>
        {totalItems > 0 ? (
          <View>
            <ProgressBar
              totalItems={totalItems}
              completedCount={completedCount}
            />
            {!isEditing ? (
              <FlatList
                data={selectedWeekData}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => toggleComplete(index)}>
                    <View style={styles.checklistContatiner}>
                      {CheckboxIcon(item.completed)}
                      <Text
                        style={
                          item.completed
                            ? styles.completelist
                            : styles.uncompletelist
                        }>
                        {item.content}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            ) : (
              <FlatList
                data={updatedSelectedData}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => toggleDelete(index)}>
                    <View style={styles.editContatiner}>
                      <Text
                        style={[
                          item.completed
                            ? styles.completelist
                            : styles.uncompletelist,
                          {marginRight: 16},
                        ]}>
                        {item.content}
                      </Text>

                      <View style={styles.minusContainer}>
                        {isEditing && MinusIcon()}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            )}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            {ChecklistsIcon()}
            <Text style={styles.noChecklistsText}>No checklists</Text>
            <Text style={styles.addChecklistsText}>
              Add checklists that should be checked weekly.
            </Text>
          </View>
        )}
      </View>
    );
  },
);

export default WeeklyData;
