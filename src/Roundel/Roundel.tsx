import React from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, NativeSyntheticEvent, TextInputEndEditingEventData, Text } from 'react-native';
import { defaultStyles, RoundelInfo } from '../styles';

const RING_SCALING_FACTOR = 0.82;
const HOLE_SCALING_FACTOR = 0.54;
const BAR_SCALING_FACTOR = 0.17;
const FONT_SCALING_FACTOR = 0.124;

export interface RoundelProps extends RoundelInfo {
  width: number;
  height: number;
  editing?: boolean;
  editable?: boolean;
  onPress?: (roundel: RoundelInfo) => void;
  onBeginEditing?: () => void;
  onEndEditing?: (text: string) => void;
}

interface RoundelState extends RoundelInfo {
  editing: boolean;
}

export class Roundel extends React.PureComponent<RoundelProps, RoundelState> {

  textInput: TextInput;

  constructor(props: RoundelProps) {
    super(props);
    this.state = {
      ...this.props,
      textSize: this.props.textSize,
      editing: this.props.editing,
    } as RoundelState;
  }

  componentDidUpdate() {
    if (!this.props.editing && this.textInput) {
      this.setState(() => ({editing: false}));
      this.textInput.blur();
    }
  }

  private onBeginEditing = () => {
    this.setState(() => ({editing: true}));
    if (this.props.onBeginEditing) {
      this.props.onBeginEditing();
    }
  }

  private onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    this.setState(() => ({editing: false}));
    if (this.props.onEndEditing) {
      this.props.onEndEditing(e.nativeEvent.text);
    }
  }

  onPress = () => {
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
        top: '41%'
      },
      text: {
        position: 'absolute',
        width: '95%', 
        color: this.props.textColor,
        fontSize: this.props.width * FONT_SCALING_FACTOR * this.props.textSize,
        fontFamily: defaultStyles.fontFamily,
        textAlign: 'center',
      }
    });

    const textInputProps: any = {
      value: this.props.text,
      editable: this.props.editable,
      style: styles.textInput,
      autoCapitalize: 'characters',
      placeholderTextColor: 'white',
      autoCorrect: false,
      autoFocus: this.state.editing,
      returnKeyType: 'done',
      allowFontScaling: true,
      maxLength: 20,
    };
    // because textAlign is apparently not an official property (...?)
    const textInputPropsExt = {
      ...textInputProps,
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
              ? <TextInput ref={ref => this.textInput = ref} onFocus={this.onBeginEditing} onEndEditing={this.onEndEditing} {...textInputPropsExt} />
              : <Text style={styles.text}>{this.props.text}</Text>
            }
        </View>
      </TouchableHighlight>
    );
  }
}