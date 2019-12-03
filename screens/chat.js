import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Button,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

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
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Welcome to our app',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "alice",
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    // appends the message object to the gifted message list
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
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'android' ? 'padding' :  null} 
                    keyboardVerticalOffset={80}
                />
        </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
});

export default chat;
