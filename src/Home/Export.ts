import Expo, { Linking } from 'expo';
import { PixelRatio, Share, Alert, CameraRoll } from 'react-native';

export enum ExportAction {
  Save = 0,
  Share = 1,
}

export const exportImage = async (action: ExportAction, view: any) => {

  const targetPixelCount = 1080;
  const pixelRatio = PixelRatio.get();
  const pixels = targetPixelCount / pixelRatio;

  const image = 'data:image/png;base64,' + await Expo.takeSnapshotAsync(view, {
    result: 'base64',
    height: pixels,
    width: pixels,
    quality: 1,
    format: 'png',
  });

  switch (action) {

    case ExportAction.Save:
      CameraRoll.saveToCameraRoll(image, 'photo')
      .then(() => {
        Alert.alert(
          'Image saved to photos',
          null,
          [{ text: 'OK', style: 'default' }]
        )
      })
      .catch(() => {
        Alert.alert(
          'Error saving image',
          'Please make sure this app has permission to access your photos.',
          [
            { text: 'Cancel', style: 'destructive' },
            { text: 'Go to settings', style: 'default', onPress:() => { Linking.openURL('app-settings:'); } } 
          ]
        )
      })
      break;

    case ExportAction.Share:
      Share.share({
        url: image,
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Something went wrong when trying to share. Sorry about that.',
          [
            { text: 'OK', style: 'cancel' },
          ]
        )
      });
      break;
  }
}