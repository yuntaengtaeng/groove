import { Button, View, Text, FlatList, Keyboard } from 'react-native';
import { Short } from '../../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Comment from '../Comment';
import { useState } from 'react';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

type Props = Pick<Short, 'comments'> & {
  onCommentInputHandler: (value: string) => void;
};

const CommentSection = ({ comments, onCommentInputHandler }: Props) => {
  const { bottom } = useSafeAreaInsets();
  const [value, setValue] = useState('');

  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingBottom: bottom }}>
      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          댓글 ({comments.length}개)
        </Text>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Comment {...item} />}
          contentContainerStyle={{ gap: 32 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}
      >
        <BottomSheetTextInput
          style={{
            flex: 1,
            backgroundColor: 'lightgray',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          value={value}
          onChangeText={(newValue) => {
            setValue(newValue);
          }}
        />
        <Button
          title="입력"
          onPress={() => {
            onCommentInputHandler(value);
            setValue('');
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

export default CommentSection;
