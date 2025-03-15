import { View, Text } from 'react-native';
import { Short } from '../../types';

type Props = Pick<Short, 'title' | 'tags' | 'description'>;

const PostInfo = ({ title, tags, description }: Props) => {
  return (
    <View style={{ gap: 8 }}>
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
          fontSize: 14,
          color: 'gray',
        }}
      >
        {tags.join(' ')}
      </Text>
      <Text
        style={{
          fontSize: 14,
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default PostInfo;
