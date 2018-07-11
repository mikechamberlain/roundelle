import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Roundel, RoundelProps } from '../Roundel/Roundel';
import { roundels, RoundelInfo, defaultStyles } from '../styles';

interface HomeState {
  roundel: RoundelInfo;
}

export class Home extends React.PureComponent<{}, HomeState> {

  screenWidth: number;
  editorSize: number;
  themeItemSize: number;
  
  constructor(props: {}) {
    super(props);

    this.state = {
      roundel: {
        ...roundels[0],
        text: '',
      }
    };

    const screenWidth = Dimensions.get('screen').width;
    this.editorSize = screenWidth * 0.95;
    this.themeItemSize = screenWidth * 0.18;
  }

  static navigationOptions = {
    title: 'Roundel',
  };

  private onRoundelPress = (roundel: RoundelInfo) => {
    console.log(roundel);
    this.setState(() => ({
      roundel: {
        ...roundel,
        text: this.state.roundel.text,
      }
    }));
  }

  private onChangeText = (text: string) => {
    console.log('text changed to ' + text + ' on home');
    this.setState(prev => ({
      roundel: {
        ...prev.roundel,
        text,
      }
    }));
  }

  render() {

    console.log('rendering home')
    console.log(this.state);

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
        <StatusBar barStyle="light-content" translucent />
        <View style={styles.roundel}>
          <Roundel {...editorProps} />
        </View>
        <ScrollView style={styles.themes}>
          <View style={styles.themeItems}>
            {themeProps.map((p, i) => <Roundel key={i} {...p} />)}
          </View>
        </ScrollView>>
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
    borderBottomColor: defaultStyles.brandColor,
    borderBottomWidth: 0.5,
  },
  themes: {
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  themeItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  }
});