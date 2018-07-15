import React from 'react';
import { View, StyleSheet, TextInput, TextInputProperties, TouchableHighlight, NativeSyntheticEvent, TextInputEndEditingEventData, Keyboard, Text } from 'react-native';
import { defaultStyles, RoundelInfo } from '../styles';

const RING_SCALING_FACTOR = 0.82;
const HOLE_SCALING_FACTOR = 0.54;
const BAR_SCALING_FACTOR = 0.17;
const FONT_SCALING_FACTOR = 0.124;

export interface RoundelProps extends RoundelInfo {
  width: number;
  height: number;
  editable?: boolean;
  editing?: boolean;
  onPress?: (roundel: RoundelInfo) => void;
  onChangeText?: (text: string) => void;
}

export class Roundel extends React.PureComponent<RoundelProps, RoundelInfo> {

  textInput: TextInput;

  constructor(props: RoundelProps) {
    super(props);
    this.state = {
      ...this.props,
      textSize: this.props.textSize
    } as RoundelInfo;
  }

  componentWillReceiveProps(props: RoundelProps) {
    console.log('will receive');
    if (!props.editing) {
      Keyboard.dismiss();
    }
  }

  componentDidMount() {
    if (this.props.onChangeText) {
      this.props.onChangeText(this.state.text);
    }
  }

  private onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    if (this.props.onChangeText) {
      this.props.onChangeText(e.nativeEvent.text);
    }
  }

  onPress = () => {
    console.log('prts')
    if (this.props.onPress) {
      this.props.onPress(this.state);
    }
  };

  render() {

    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: this.props.width,
        height: this.props.height,
        backgroundColor: 'white',
      },
      ring: {
        borderRadius: 999999,
        width: this.props.width * RING_SCALING_FACTOR,
        height: this.props.width * RING_SCALING_FACTOR,
        backgroundColor: this.props.ringColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
      hole: {
        borderRadius: 999999,
        width: this.props.width * HOLE_SCALING_FACTOR,
        height: this.props.width * HOLE_SCALING_FACTOR,
        backgroundColor: 'white'
      },
      bar: {
        position: 'absolute',
        height: this.props.width * BAR_SCALING_FACTOR,
        width: '98%',
        backgroundColor: this.props.barColor,
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
        position: 'absolute',
        color: this.props.textColor,
        fontSize: this.props.width * FONT_SCALING_FACTOR * this.props.textSize,
        width: '95%',
        fontFamily: defaultStyles.fontFamily,
        height: this.props.width * BAR_SCALING_FACTOR,
      },
      text: {
        position: 'absolute',
        color: this.props.textColor,
        fontSize: this.props.width * FONT_SCALING_FACTOR * this.props.textSize,
        fontFamily: defaultStyles.fontFamily,
      }
    });

    const props: TextInputProperties = {
      value: this.props.text,
      editable: this.props.editable,
      style: styles.textInput,
      autoCapitalize: 'characters',
      placeholderTextColor: 'white',
      autoCorrect: false,
      autoFocus: this.props.editing,
      returnKeyType: 'done',
      allowFontScaling: true,
    };
    // because textAlign is apparently not an official property (...?)
    const textInputProps = {
      ...props,
      textAlign: 'center',
    };
    
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
            {this.props.editable
              ? <TextInput ref={ref => this.textInput = ref} onEndEditing={this.onEndEditing} {...textInputProps} />
              : <Text style={styles.text}>{this.props.text}</Text>
            }
        </View>
      </TouchableHighlight>
    );
  }
}