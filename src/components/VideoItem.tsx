import { Pressable, View, Image, Text } from 'react-native';
import { Short } from '../types';
import ProfileImg from './ProfileImg';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import DurationMark from './DurationMark';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type Props = Short & {
  onPress: () => void;
};

const VideoItem = ({
  onPress,
  author,
  thumbnailURL,
  title,
  views,
  publishedAt,
  duration,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          height: 200,
          position: 'relative',
        }}
      >
        <Image
          source={{ uri: thumbnailURL }}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <DurationMark duration={duration} />
        </View>
      </View>

      <View style={{ padding: 16, flexDirection: 'row', gap: 8 }}>
        <ProfileImg url={author.avatarURL} />
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {author.name} · 조회수 {views}회 · {dayjs(publishedAt).fromNow()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VideoItem;
