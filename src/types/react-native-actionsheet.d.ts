declare module 'react-native-actionsheet' {
    interface ActionSheetProps {
        title?: string;
        options: string[];
        cancelButtonIndex:int;
        destructiveButtonIndex?:int;
        onPress: (index: number) => void;
    }

    class ActionSheet extends React.PureComponent<ActionSheetProps, any> {
        show: () => void;
    }

    export = ActionSheet;
}
