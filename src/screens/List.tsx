import { FlatList, View } from 'react-native';
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import VideoItem from '../components/VideoItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useStore from '../store';

export type ListProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({ navigation, route }: ListProps) => {
  const { shortList, setShortList } = useStore();
  const { bottom } = useSafeAreaInsets();

  return (
    <FlatList
      data={shortList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VideoItem
          {...item}
          onPress={() => {
            navigation.navigate('Detail', {
              id: item.id,
            });
          }}
        />
      )}
      contentContainerStyle={{ gap: 16 }}
      ListFooterComponent={<View style={{ marginBottom: bottom }} />}
    />
  );
};

export default List;
