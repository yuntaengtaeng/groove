import { View, StyleSheet, Alert, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useMemo, useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useStore from '../store';
import { TimeUpdateEventPayload, useVideoPlayer, VideoView } from 'expo-video';
import EngagementStats from '../components/Detail/EngagementStats';
import PostInfo from '../components/Detail/PostInfo';
import UserProfile from '../components/Detail/UserProfile';
import CommentSection from '../components/Detail/CommentSection';
import { useQuery } from '@tanstack/react-query';
import { WebVTTParser } from 'webvtt-parser';
import LoadingView from '../components/view/LoadingView';
import ErrorView from '../components/view/ErrorView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail = ({ navigation, route }: DetailProps) => {
  const id = route.params.id;
  const { bottom } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const { shortList, setLike, setView, setComment } = useStore();
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const findIndex = shortList.findIndex((short) => short.id === id);
  const short = [...shortList][findIndex];

  const fetchSubtitles = async () => {
    const subtitle = short.subtitles.find((s) => s.origin);

    if (!subtitle) {
      throw new Error('No subtitle found');
    }

    const response = await fetch(subtitle.url);

    if (!response.ok) {
      throw new Error('Failed to fetch subtitles');
    }

    const data = await response.json();

    const parser = new WebVTTParser();
    const tree = parser.parse(data, 'metadata');

    return tree;
  };

  const {
    data: subtitles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['subtitle'],
    queryFn: fetchSubtitles,
  });

  const player = useVideoPlayer(short.url, (player) => {
    player.timeUpdateEventInterval = 1;
    player.addListener('timeUpdate', (payload) => {
      if (payload.bufferedPosition > 0 && subtitles) {
        const subtitle = subtitles.cues.find(
          (cue) =>
            cue.startTime <= payload.currentTime &&
            cue.endTime > payload.currentTime
        );
        setCurrentSubtitle(subtitle ? subtitle.text : '');
      }
    });
  });

  useEffect(() => {
    const eventHandler = (payload: TimeUpdateEventPayload) => {
      if (payload.bufferedPosition > 0 && subtitles) {
        const subtitle = subtitles.cues.find(
          (cue) =>
            cue.startTime <= payload.currentTime &&
            cue.endTime > payload.currentTime
        );
        setCurrentSubtitle(subtitle ? subtitle.text : '');
      }
    };

    player.addListener('timeUpdate', eventHandler);
    player.timeUpdateEventInterval = 1;

    return () => {
      player.removeListener('timeUpdate', eventHandler);
    };
  }, [subtitles]);

  useEffect(() => {
    setView(id);
  }, [id]);

  if (isLoading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error.message} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.6,
          backgroundColor: 'black',
        }}
      >
        <VideoView
          style={{
            width: '100%',
            height: '100%',
          }}
          player={player}
        />
      </View>

      <View
        style={{
          flex: 0.4,
          padding: 16,
          gap: 8,
        }}
      >
        {!!currentSubtitle && (
          <Text style={{ textAlign: 'center' }}>🔊 {currentSubtitle}</Text>
        )}
        <PostInfo
          title={short.title}
          tags={short.tags}
          description={short.description}
        />
        <UserProfile url={short.author.avatarURL} name={short.author.name} />

        <EngagementStats
          comments={short.comments}
          likes={short.likes}
          views={short.views}
          shares={short.shares}
          onCommentHandler={() => {
            bottomSheetRef.current?.snapToIndex(1);
          }}
          onLikeHandler={() => {
            setLike(id);
          }}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        keyboardBehavior="fillParent"
        containerStyle={{
          paddingBottom: bottom,
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <CommentSection
            comments={short.comments}
            onCommentInputHandler={(newComment) => {
              if (!newComment) {
                Alert.alert('댓글을 입력해주세요!');
                return;
              }

              setComment(id, newComment);
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Detail;
