import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  message: string;
};

const ErrorView = ({ message }: Props) => {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: bottom,
        paddingTop: top,
      }}
    >
      <View
        style={{
          width: 10,
          backgroundColor: 'orange',
          height: 30,
        }}
      />
      <Text style={{ fontWeight: 600, fontSize: 20 }}>{message}</Text>
    </View>
  );
};

export default ErrorView;
