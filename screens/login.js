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

    state = {name: '', pass:''}

    signInAsync = async () => {
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

    onSignupPress = () => {
        this.props.navigation.navigate('signup');
    }
    forgotPassPress = () => {
        this.props.navigation.navigate('forgot');
    }

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