import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput, 
    TouchableHighlight,
    StyleSheet,
    Modal,
} from 'react-native';
import {
    Button,  
} from 'react-native-elements';


class home extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: navigation.getParam('name', 'home'),

        // to the account setting page 
        headerLeft: () => (
            <Button 
                onPress={() => navigation.navigate('settings')}
                title="settings"
                type='clear'
            />
        ),

        headerRight: () => (
            <Button 
                onPress={() => navigation.navigate('compose')}
                title="compose"
                type='clear'
            />
        )
    });

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    recent messages
                </Text>
            </View>
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

export default home;