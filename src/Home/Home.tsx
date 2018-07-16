import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Roundel, RoundelProps } from '../Roundel/Roundel';
import { roundels, RoundelInfo, defaultStyles } from '../styles';
import ActionSheet from 'react-native-actionsheet';
import { exportImage, ExportAction } from './Export';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const DEFAULT_TEXT_SIZE = 1;
const MAX_TEXT_LENGTH = 10;
// for every character over the max, we reduce the text size by this factor to try to fit it inside the bar
const TEXT_SCALING_FACTOR = 0.945;
const THEME_ITEM_SCALING_FACTOR = 0.23;
const ROUNDEL_ASPECT_RATIO = 0.9
const EXPORT_WIDTH = 1080;
// we need to wait this long for the iOS keyboard to fully scroll off-screen before showing the actionsheet, else it will automatically refocus the TextInput
const STUPID_IOS_KEYBOARD_DISMISS_DELAY = 1000; 

interface HomeState {
  roundel: RoundelInfo;
  editing: boolean;
  text: string;
}

export class Home extends React.PureComponent<NavigationScreenProps, HomeState> {

  screenWidth = Dimensions.get('screen').width
  editorSize = this.screenWidth;
  themeItemSize = this.screenWidth * THEME_ITEM_SCALING_FACTOR;
  editorView: Roundel;
  exportActionSheet: ActionSheet;

  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      roundel: {
        ...roundels[0],
        textSize: DEFAULT_TEXT_SIZE,
      },
      editing: true,
      text: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      setState: this.setState.bind(this),
      showExportActionSheet: () => this.exportActionSheet.show(),
    });
  }

  static navigationOptions = (params: NavigationParams) => ({
    title: 'Roundel',
    headerRight: (
      <Ionicons
        style={styles.shareButton}
        name="ios-share-outline" 
        size={32} 
        color="white" 
        onPress={() => {
          params.navigation.getParam('setState')(
            () => ({editing: false}),
            () => setTimeout(() => params.navigation.getParam('showExportActionSheet')(), STUPID_IOS_KEYBOARD_DISMISS_DELAY)
          );
        }}
      />
    ),
  });


  private onRoundelPress = (roundel: RoundelInfo) => {
    this.setState(prev => ({
      roundel: {
        ...roundel,
        text: prev.roundel.text,
        textSize: prev.roundel.textSize,
      }
    }));
  }

  private calcTextSize = (text: string): number => {
  return Math.min(
    DEFAULT_TEXT_SIZE, 
    DEFAULT_TEXT_SIZE * Math.pow(TEXT_SCALING_FACTOR, (text.length - MAX_TEXT_LENGTH)));
  }

  private onBeginEditing = () => {
    console.log('begin home');
    this.setState(() => ({ editing: true }));
  }

  private onEndEditing = (text?: string) => {
    console.log('end home');
    this.setState(prev => ({
      roundel: {
        ...prev.roundel,
        textSize: this.calcTextSize(text || prev.text),
      },
      text: text || prev.text,
      editing: false,
    }));
  }

  private handleActionSheet = (action: ExportAction) => {
    console.log('handle');
    this.onEndEditing();
    exportImage(action, this.editorView, EXPORT_WIDTH, EXPORT_WIDTH * 1 / ROUNDEL_ASPECT_RATIO);
  }

  render() {
    const editorProps: RoundelProps = {
      ...this.state.roundel,
      editable: true,
      editing: this.state.editing,
      width: this.editorSize,
      height: this.editorSize * ROUNDEL_ASPECT_RATIO,
      textSize: this.state.roundel.textSize,
      onBeginEditing: this.onBeginEditing,
      onEndEditing: this.onEndEditing,
      onPress: undefined,
      text: this.state.text,
    };

    const themeProps: RoundelProps[] = roundels.map(roundel => ({
      ...roundel,
      editable: false,
      width: this.themeItemSize,
      height: this.themeItemSize * ROUNDEL_ASPECT_RATIO,
      text: this.state.text,
      textSize: this.state.roundel.textSize,
      onPress: this.onRoundelPress,
    }));
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.roundel}>
          <Roundel {...editorProps} ref={ref => { this.editorView = ref;} } />
        </View>
        <View style={styles.border} />
        <ScrollView style={styles.themes}>
          <View style={styles.themeItems}>
            {themeProps.map((p, i) => <Roundel key={i} {...p} />)}
          </View>
        </ScrollView>
        <ActionSheet
          ref={(ref:any) => this.exportActionSheet = ref}
          options={['Save to photos', 'Share', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.handleActionSheet}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  roundel: {
    backgroundColor: 'white',
  },
  border: {
    height: 1,
    width: '100%',
    backgroundColor: defaultStyles.brandColor,
  },
  themes: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  themeItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  shareButton: {
    paddingRight: 10
  },
});