import { View, Text } from 'react-native';
import { Comment as CommentType } from '../types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type Props = CommentType;

const Comment = ({ id, content, author, createdAt }: Props) => {
  return (
    <View>
      <View>
        <Text>👤 {author}</Text>
      </View>
      <View>
        <Text>{content}</Text>
      </View>
      <Text>{dayjs(createdAt).fromNow()}</Text>
    </View>
  );
};

export default Comment;
