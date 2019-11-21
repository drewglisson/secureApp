import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text, 
    Button
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

class chat extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: navigation.getParam('recipient', 'chat'),

        headerRight: () => (
            <Button 
                // onPress={() => navigation.navigate('settings')}
                title="info"
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
                    text: 'suck my dick',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "react native",
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat 
                messages={this.state.messages}
                onSend = {messages => this.onSend(messages)}
                user = {{
                    _id: 1,
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default chat;
