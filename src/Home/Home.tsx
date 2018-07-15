import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet, ScrollView, TouchableHighlight, Text } from 'react-native';
import { Roundel, RoundelProps } from '../Roundel/Roundel';
import { roundels, RoundelInfo, defaultStyles } from '../styles';
import ActionSheet from 'react-native-actionsheet';
import { exportImage, ExportAction } from './Export';
import { NavigationScreenProps } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const DEFAULT_TEXT_SIZE = 1;
const MAX_TEXT_LENGTH = 10;
const TEXT_SCALING_FACTOR = 0.94 // for every character over the max, we reduce the text size by this factor to try to fit it inside the bar
const THEME_ITEM_SCALING_FACTOR = 0.23;
const ROUNDEL_ASPECT_RATIO = 0.9
const EXPORT_WIDTH = 1080;

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
      _this: this,
    });
  }

  static navigationOptions = () => ({
    title: 'Roundel',
    // headerRight: (
    //   <Ionicons
    //     style={styles.shareButton}
    //     name="ios-share-outline" 
    //     size={30} 
    //     color="white" 
    //     onPress={() => {
    //       const _this: any = props.navigation.getParam('_this');
    //       _this.setState((prev: HomeState) => ({
    //           editing: false,
    //           roundel: {
    //             ...prev.roundel,
    //             textSize: _this.calcTextSize(prev.roundel.text),
    //           }
    //       }));
    //       _this.exportActionSheet.show();
    //     }}
    //   />
    // )
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

  private doExport = (action: ExportAction) => {
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
      onChangeText: this.onChangeText,
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
        <View style={styles.exportButtonContainer}>
          <TouchableHighlight
            style={styles.exportButton}
            onPress={() => this.exportActionSheet.show()}
            activeOpacity={defaultStyles.touchableHighlight.activeOpacity}
            underlayColor={defaultStyles.touchableHighlight.underlayColor}
          >
          <View style={styles.exportButton}>
            <Ionicons
              style={styles.shareButton}
              name="ios-share-outline" 
              size={30} 
              color="white" 
            />
            <Text style={styles.exportButtonText}>EXPORT</Text>
            </View>
          </TouchableHighlight>
        </View>
        <ActionSheet
          ref={(ref:any) => this.exportActionSheet = ref}
          options={['Save to photos', 'Share', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.doExport}
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
  exportButtonContainer: {
    height: 45,
    width: '100%',
  },
  exportButton: {
    backgroundColor: defaultStyles.brandColor,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  exportButtonText: {
    fontFamily: defaultStyles.fontFamily,
    color: 'white',
    fontSize: 20,
  }
});