import { Image } from 'react-native';

export type Props = {
  url: string;
};

const ProfileImg = ({ url }: Props) => {
  return (
    <Image
      source={{ uri: url }}
      style={{
        width: 36,
        height: 36,
        borderRadius: 36,
      }}
    />
  );
};

export default ProfileImg;
