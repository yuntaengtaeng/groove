import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '..';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ListProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({ navigation, route }: ListProps) => {
  return (
    <View>
      <Text>List</Text>
      <Button
        title="Detail"
        onPress={() => {
          navigation.navigate('Detail', {
            id: '1',
          });
        }}
      />
    </View>
  );
};

export default List;
