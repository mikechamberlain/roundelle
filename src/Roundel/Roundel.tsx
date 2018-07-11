import React from 'react';
import { View, StyleSheet, TextInput, TextInputProperties, TouchableHighlight } from 'react-native';
import { defaultStyles, RoundelInfo } from '../styles';

const RING_SCALING_FACTOR = 0.85;
const HOLE_SCALING_FACTOR = 0.56;
const BAR_SCALING_FACTOR = 0.17;
const FONT_SCALING_FACTOR = 0.115;

export interface RoundelProps extends RoundelInfo {
  size: number;
  editable?: boolean;
  onPress?: (roundel: RoundelInfo) => void;
  onChangeText?: (text: string) => void;
}

interface RoundelState extends RoundelInfo {
  fontSize: number;
}

export class Roundel extends React.PureComponent<RoundelProps, RoundelState> {

  constructor(props: RoundelProps) {
    super(props);
    this.state = {
      ...props,
      fontSize: 1,
    } as RoundelState;
  }

  private onChangeText = (text: string) => {
    this.setState(() => { fontSize: 12 });

    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
    if (!this.props.editable) return;
    this.setState(() => ({
      text: text,
    }));
  }

  private onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.state);
    }
  };

  render() {

    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: this.props.size,
        height: this.props.size,
      },
      ring: {
        borderRadius: 999999,
        width: this.props.size * RING_SCALING_FACTOR,
        height: this.props.size * RING_SCALING_FACTOR,
        backgroundColor: this.props.ringColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
      hole: {
        borderRadius: 999999,
        width: this.props.size * HOLE_SCALING_FACTOR,
        height: this.props.size * HOLE_SCALING_FACTOR,
        //margin: 5,
        backgroundColor: 'white'
      },
      bar: {
        position: 'absolute',
        height: this.props.size * BAR_SCALING_FACTOR,
        width: '100%',
        backgroundColor: this.props.barColor,
      },
      text: {
        position: 'absolute',
        color: this.props.textColor,
        fontSize: this.state.fontSize,// this.props.size * FONT_SCALING_FACTOR,
        width: '90%',
        fontFamily: defaultStyles.fontFamily,
      }
    });

    const textInputProps: TextInputProperties = {
      value: this.props.text,
      editable: this.props.editable,
      style: styles.text,
      autoCapitalize: 'characters',
      placeholderTextColor: 'white',
      autoCorrect: false,
      autoFocus: this.props.editable,
      returnKeyType: 'done',
      allowFontScaling: true,
    };
    // because textAlign is apparently not an official property (...?)
    const props = {
      ...textInputProps,
      textAlign: 'center',
    };

    console.log('rendering roundel');

    return (
      <TouchableHighlight 
        onPress={this.onPress}
        activeOpacity={this.props.editable ? 1 : defaultStyles.touchableHighlight.activeOpacity}
        underlayColor={defaultStyles.touchableHighlight.underlayColor}>
        <View style={styles.container}>
          <View style={styles.ring}>
            <View style={styles.hole} />
          </View>
          <View style={styles.bar} />
          <TextInput {...props} onChangeText={this.onChangeText} />
        </View>
      </TouchableHighlight>
    );
  }
}