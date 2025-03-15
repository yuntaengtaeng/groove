import { View, Text } from 'react-native';
import ProfileImg, { Props as ProfileImgProps } from '../ProfileImg';

type Props = ProfileImgProps & {
  name: string;
};

const UserProfile = ({ name, url }: Props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <ProfileImg url={url} />
      <Text
        style={{
          fontSize: 14,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default UserProfile;
