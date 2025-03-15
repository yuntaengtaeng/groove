import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type Props = {
  duration: number;
};

const DurationMark = ({ duration }: Props) => {
  const formatDuration = (seconds: number) => {
    const duration = dayjs.duration(seconds, 'seconds');
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();
    return `${minutes}:${
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
    }`;
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignSelf: 'flex-start',
        padding: 4,
        borderRadius: 4,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 10,
        }}
      >
        {formatDuration(duration)}
      </Text>
    </View>
  );
};

export default DurationMark;
