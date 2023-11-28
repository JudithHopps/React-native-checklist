import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

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
  editTextStyle: {
    color: '#333',
    fontSize: 15,
    position: 'absolute',
    top: 18,
    right: 20,
  },
});

type ChecklistTitleProps = {
  title: string;
  isVisibleEditBtn: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChecklistTitle: React.FC<ChecklistTitleProps> = ({
  title,
  isVisibleEditBtn,
  isEditing,
  setIsEditing,
}) => {
  const editText = isEditing ? 'Done' : 'Edit';

  const onClickEditBtn = () => {
    setIsEditing(!isEditing);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isVisibleEditBtn && (
        <TouchableOpacity style={styles.editTextStyle} onPress={onClickEditBtn}>
          <View>
            <Text>{editText}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChecklistTitle;
