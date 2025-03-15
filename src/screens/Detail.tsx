import { View, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail = ({ navigation, route }: DetailProps) => {
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
