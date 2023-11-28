import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import ChecklistTitle from './src/components/ChecklistTitle';
import WeekSelection from './src/components/WeekSelection';
import WeeklyData from './src/components/WeeklyData';
import Divider from './src/components/common/Divider';
import Input from './src/components/common/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekSelectionContainer: {
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  addlistContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

const MainScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState(15);
  const [addlist, setAddlist] = useState('');
  const [isVisibleAddBtn, setIsVisibleAddBtn] = useState<boolean>(true);
  const [isVisibleInput, setIsVisibleInput] = useState<boolean>(false);
  const [isVisibleEditBtn, setIsVisibleEditBtn] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const weeklyDateRef = useRef<any>(null);

  // useEffect(() => {
  //   setIsVisibleAddBtn(true);
  //   setIsVisibleInput(false);
  //   setIsVisibleEditBtn(true);
  //   setIsEditing(false);
  // }, [selectedWeek]);

  const handleSelectWeek = (week: number) => {
    setSelectedWeek(week);
  };
  const handleTextChange = (inputText: string) => {
    setAddlist(inputText);
  };
  const handleAdditionalList = () => {
    weeklyDateRef.current?.addChecklist(addlist);
    setAddlist('');
    setIsVisibleInput(false);
    setIsVisibleAddBtn(true);
  };
  const onClickAddBtn = () => {
    setIsVisibleInput(true);
    setIsVisibleAddBtn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChecklistTitle
        title="Checklists"
        isVisibleEditBtn={isVisibleEditBtn}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleDelete={weeklyDateRef.current?.handleDelete}
      />

      <View style={styles.weekSelectionContainer}>
        <WeekSelection
          selectedWeek={selectedWeek}
          onSelectWeek={handleSelectWeek}
        />
      </View>

      <Divider />

      <WeeklyData
        selectedWeek={selectedWeek}
        setIsVisibleEditBtn={setIsVisibleEditBtn}
        isEditing={isEditing}
        ref={weeklyDateRef}
      />

      {isVisibleAddBtn && (
        <TouchableOpacity
          style={styles.addlistContainer}
          onPress={onClickAddBtn}>
          <View>
            <Image source={require('./src/assets/images/FAB.png')} />
          </View>
        </TouchableOpacity>
      )}

      {isVisibleInput && (
        <Input
          placeholder="Add a checklist..."
          onChangeText={handleTextChange}
          value={addlist}
          handleOnSubmit={handleAdditionalList}
        />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
