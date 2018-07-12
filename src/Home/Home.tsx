import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet, ScrollView, Button } from 'react-native';
import { Roundel, RoundelProps } from '../Roundel/Roundel';
import { roundels, RoundelInfo, defaultStyles } from '../styles';
import ActionSheet from 'react-native-actionsheet';
import { exportImage, ExportAction } from './Export';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';

interface HomeState {
  roundel: RoundelInfo;
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
        text: '',
      }
    };

    const screenWidth = Dimensions.get('screen').width;
    this.editorSize = screenWidth;
    this.themeItemSize = screenWidth * 0.18;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showExportActionSheet: () => this.exportActionSheet.show() 
    });
  }

  static navigationOptions = (navigation: NavigationParams) => ({
    title: 'Roundel',
    headerRight: (
      <Button
        onPress={() => navigation.navigation.getParam('showExportActionSheet')()}
        title="Share"
        color="white"
      />
    ),
  });

  private onRoundelPress = (roundel: RoundelInfo) => {
    this.setState(() => ({
      roundel: {
        ...roundel,
        text: this.state.roundel.text,
      }
    }));
  }

  private onChangeText = (text: string) => {
    this.setState(prev => ({
      roundel: {
        ...prev.roundel,
        text,
      }
    }));
  }

  render() {
    const editorProps: RoundelProps = {
      ...this.state.roundel,
      editable: true,
      size: this.editorSize,
      onChangeText: this.onChangeText,
      onPress: undefined,
    };

    const themeProps: RoundelProps[] = roundels.map(roundel => ({
      ...roundel,
      editable: false,
      size: this.themeItemSize,
      text: this.state.roundel.text,
      onPress: this.onRoundelPress,
    }));
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.roundel}>
          <Roundel {...editorProps} ref={ref => { this.editorView = ref;} } />
        </View>
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
  themes: {
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
    borderColor: defaultStyles.brandColor,
    borderTopWidth: 0.5,
  },
  themeItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  }
});