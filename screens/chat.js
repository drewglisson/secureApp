import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text, 
    Button,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
class chat extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: navigation.getParam('recipient', 'chat'),

        headerRight: () => (
            <Button 
                onPress={() => navigation.navigate('settings')}
                title="settings"
            />
        ),
    });

    state = {
        messages: [],
    };

    componentWillMount() {
        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'Welcome',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: "react native",
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         },
        //     ],
        // })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat 
                    messages={this.state.messages}
                    onSend = {messages => this.onSend(messages)}
                    user = {{
                        _id: 1,
                    }}
                />
               
                {/* <KeyboardSpacer/>    */}
                <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={80}/>
        </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      },
});

export default chat;
