import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    AsyncStorage,
    Alert
} from 'react-native';
import {
    Button, 
    Input
} from 'react-native-elements';

class login extends React.Component {

    static navigationOptions = {
        title: 'Login'
    };

    // setting the state for the render variables 
    state = {name: '', pass:''}
    
    signInAsync = async () => {

        // using async the phone stores a token and will keep you logged in 
        // until you log out, even if you close the app
        if ( this.state.name != '' && this.state.pass != '') {
            try {
                await AsyncStorage.setItem('userToken', 'abc');
                this.props.navigation.navigate('app', {name: this.state.name});

            } catch(error) {
                console.log(error.toString());
                Alert.alert(error.ToString());
            }
        } else { 
            Alert.alert(
                'Invalid Signin',
                'The fields cannot be blank',
                [ {text: 'OK', onPress: () => console.log('Ok Pressed')} ],
                {cancelable: false}
            )
        }
    };

    // navigation to the signup page
    onSignupPress = () => {
        this.props.navigation.navigate('signup');
    }
    // navigation to the forgot password page
    forgotPassPress = () => {
        this.props.navigation.navigate('forgot');
    }

    // when typing in the text input it calls this state change which 
    // outputs the change back to the text input 
    onChangeName = name => this.setState({name});
    onChangePass = pass => this.setState({pass});

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.form}>
                    <Input 
                        placeholder = 'Username'
                        onChangeText={this.onChangeName}
                        value={this.state.name}
                        clearButtonMode='always'
                        textContentType = 'username'
                        autoCompleteType='username'
                        enablesReturnKeyAutomatically
                        returnKeyType='next'
                        returnKeyLabel='next'
                    />
                    <Input 
                        secureTextEntry = {true}
                        placeholder = 'Password'
                        onChangeText={this.onChangePass}
                        value={this.state.pass}
                        clearButtonMode='always'
                        textContentType = 'password'
                        returnKeyType='done'
                    />
                
                    <View style = {styles.buttons}>
                        <Button 
                            title="Login"
                            type="outline"
                            onPress = {this.signInAsync}
                        />
                        <Button 
                            title="SignUp"
                            type="outline"
                            onPress = {this.onSignupPress}
                        />
                        <Button 
                            title="Forgot"
                            type="outline"
                            onPress = {this.forgotPassPress}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    },
    buttons: {
        justifyContent: "center",
        flexDirection: 'row',
    }
});

export default login;