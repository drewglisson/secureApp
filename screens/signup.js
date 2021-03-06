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

    // when typing in the text input it calls this state change which 
    // outputs the change back to the text input 

    onChangeEmail = email => this.setState({email});
    onChangeName = name => this.setState({name});
    onChangePass = pass => this.setState({pass});

    // 'creates' your account and logs you in with async 
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
                <View style = {styles.form}>
                    <Input 
                        placeholder = 'Email'
                        onChangeText={this.onChangeEmail}
                        value={this.state.email}
                        clearButtonMode='always'
                        textContentType = 'emailAddress'
                        keyboardType='email-address'
                        autoCompleteType='email'
                        returnKeyType='next'
                        returnKeyLabel='next'
                    />
                    <Input 
                        placeholder = 'Username'
                        onChangeText={this.onChangeName}
                        value={this.state.name}
                        clearButtonMode='always'
                        textContentType = 'username'
                        autoCompleteType='username'
                        returnKeyType='next'
                    />
                    <Input 
                        secureTextEntry = {true}
                        placeholder = 'Password'
                        onChangeText={this.onChangePass}
                        value={this.state.pass}
                        clearButtonMode='always'
                        textContentType = 'newPassword'
                        returnKeyType='done'
                    />
                    <Button 
                        style={styles.button}
                        title="SignUp"
                        type="outline"
                        onPress = {this.signUpAsync}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    },
    buttons: {
        justifyContent: "center",
        flexDirection: 'row',
    },
});

export default signup;