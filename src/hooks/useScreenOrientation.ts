import { useEffect } from 'react';
import useScreenOrientationStore from '../store/orientationStore';
import * as ScreenOrientation from 'expo-screen-orientation';

const useScreenOrientation = () => {
  const setOrientation = useScreenOrientationStore(
    (state) => state.setOrientation
  );

  useEffect(() => {
    const getOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(
        orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
      );
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const orientation = event.orientationInfo.orientation;
        setOrientation(
          orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
            orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
        );
      }
    );

    getOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, [setOrientation]);
};

export default useScreenOrientation;
