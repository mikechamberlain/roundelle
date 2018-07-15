import React from 'react';
import { View, StyleSheet, TextInput, TextInputProperties, TouchableHighlight, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import { defaultStyles, RoundelInfo } from '../styles';

const RING_SCALING_FACTOR = 0.82;
const HOLE_SCALING_FACTOR = 0.54;
const BAR_SCALING_FACTOR = 0.17;
const FONT_SCALING_FACTOR = 0.124;

export interface RoundelProps extends RoundelInfo {
  size: number;
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
        width: this.props.size,
        height: this.props.size,
        backgroundColor: 'white',
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
        backgroundColor: 'white'
      },
      bar: {
        position: 'absolute',
        height: this.props.size * BAR_SCALING_FACTOR,
        width: '98%',
        backgroundColor: this.props.barColor,
      },
      text: {
        position: 'absolute',
        color: this.props.textColor,
        fontSize: this.props.size * FONT_SCALING_FACTOR * this.props.textSize,
        width: '97%',
        fontFamily: defaultStyles.fontFamily,
        height: this.props.size * BAR_SCALING_FACTOR,
      }
    });

    const textInputProps: TextInputProperties = {
      value: this.props.text,
      editable: this.props.editable,
      style: styles.text,
      autoCapitalize: 'characters',
      placeholderTextColor: 'white',
      autoCorrect: false,
      autoFocus: this.props.editing,
      returnKeyType: 'done',
      allowFontScaling: true,
    };
    // because textAlign is apparently not an official property (...?)
    const props = {
      ...textInputProps,
      textAlign: 'center',
    };
    console.log('render');
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
          <TextInput 
            ref={ref => this.textInput = ref}
            onEndEditing={this.onEndEditing}
            {...props}  
          />
        </View>
      </TouchableHighlight>
    );
  }
}