import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Roundel, RoundelProps } from '../Roundel/Roundel';
import { roundels, RoundelInfo, defaultStyles } from '../styles';
import ActionSheet from 'react-native-actionsheet';
import { exportImage, ExportAction } from './Export';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const DEFAULT_TEXT_SIZE = 1;
const MAX_TEXT_LENGTH = 10;
const TEXT_SCALING_FACTOR = 0.94 // for every character over the max, we reduce the text size by this factor;
const THEME_ITEM_SCALING_FACTOR = 0.18;

interface HomeState {
  roundel: RoundelInfo;
  editing: boolean;
  text: string;
}

export class Home extends React.PureComponent<NavigationScreenProps, HomeState> {

  screenWidth: number;
  editorSize: number;
  themeItemSize: number;
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

    const screenWidth = Dimensions.get('screen').width;
    this.editorSize = screenWidth;
    this.themeItemSize = screenWidth * THEME_ITEM_SCALING_FACTOR;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      export: this.export
    });
  }

  static navigationOptions = (navigation: NavigationParams) => ({
    title: 'Roundel',
    headerRight: (
      <Ionicons
        style={styles.shareButton}
        name="ios-share-outline" 
        size={30} 
        color="white" 
        onPress={() => navigation.navigation.getParam('export')()}/>
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

  private onChangeText = (text: string) => {
    this.setState(prev => ({
      roundel: {
        ...prev.roundel,
        textSize: this.calcTextSize(text),
      },
      text: text,
    }));
  }

  private export = () => {
    Keyboard.dismiss();
    console.log('ecpo')
    // this.setState(() => ({
    //   editing: false,
    // }));
    this.setState(prev => ({
      roundel: {
        ...prev.roundel,
        textSize: this.calcTextSize(prev.roundel.text),
      }
    }));
    this.exportActionSheet.show();

  }

  render() {
    const editorProps: RoundelProps = {
      ...this.state.roundel,
      editable: true,
      editing: this.state.editing,
      size: this.editorSize,
      textSize: this.state.roundel.textSize,
      onChangeText: this.onChangeText,
      onPress: undefined,
      text: this.state.text,
    };

    const themeProps: RoundelProps[] = roundels.map(roundel => ({
      ...roundel,
      editable: false,
      size: this.themeItemSize,
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
          onPress={(action: ExportAction) => { exportImage(action, this.editorView) }}
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
  }
});