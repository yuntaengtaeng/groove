import { Pressable, View, Text } from 'react-native';
import { Short } from '../../types';

type Props = Pick<Short, 'comments' | 'likes' | 'views' | 'shares'> & {
  onCommentHandler: () => void;
};

const EngagementStats = ({
  comments,
  likes,
  views,
  shares,
  onCommentHandler,
}: Props) => {
  return (
    <View style={{ gap: 8 }}>
      <Pressable onPress={onCommentHandler}>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          💬 댓글 보기 ({comments.length})
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 14,
          }}
        >
          ❤️ 좋아요 {likes}
        </Text>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          👁️ 조회수 {views}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
        }}
      >
        🔗 공유 {shares}
      </Text>
    </View>
  );
};

export default EngagementStats;
