import { View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoadingView = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: bottom,
        paddingTop: top,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingView;
