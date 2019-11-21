import React, { Component } from 'react';
import { 
    View, 
    AsyncStorage,
    StyleSheet,
    Alert
} from 'react-native';
import {
    Button, 
    Input
} from 'react-native-elements';

class signup extends React.Component {

    static navigationOptions = {
        title: 'Signup'
    };

    state = {name: '', email: '', pass: '' }

    onChangeEmail = email => this.setState({email});
    onChangeName = name => this.setState({name});
    onChangePass = pass => this.setState({pass});

    signUpAsync = async () => {
        if ( this.state.email != '' && this.state.name != '' && this.state.pass != '') {
            try {

                await AsyncStorage.setItem('userToken', 'abc');
                this.props.navigation.navigate('app', {name: this.state.name});

            } catch(error) {
                console.log(error.toString());
                Alert.alert(error.ToString());
            }
        } else { 
            Alert.alert(
                'Invalid Signup',
                'The fields cannot be blank',
                [ {text: 'OK', onPress: () => console.log('Ok Pressed')} ],
                {cancelable: false}
            )
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Input 
                    placeholder = 'Email'
                    onChangeText={this.onChangeEmail}
                    value={this.state.email}
                    clearButtonMode='always'
                    textContentType = 'emailAddress'
                />
                <Input 
                    placeholder = 'Username'
                    onChangeText={this.onChangeName}
                    value={this.state.name}
                    clearButtonMode='always'
                    textContentType = 'username'
                />
                <Input 
                    secureTextEntry = {true}
                    placeholder = 'Password'
                    onChangeText={this.onChangePass}
                    value={this.state.pass}
                    clearButtonMode='always'
                    textContentType = 'password'
                />
                <Button 
                    title="SignUp"
                    type="solid"
                    onPress = {this.signUpAsync}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default signup;