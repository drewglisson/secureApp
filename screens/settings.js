import React, { Component } from 'react';
import { 
    View, 
    Text,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    Picker,
} from 'react-native';
import {
    Button, 
    Input,
    Icon,
} from 'react-native-elements';
// import { Picker } from 'native-base';
// import RNPickerSelect from 'react-native-picker-select';

class settings extends React.Component {

    static navigationOptions = {
        title: 'Setting'
    };

    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('auth');
    };

    state = {friend: '', deletion: '',}

    state = {user: ''}
   updateUser = (user) => {
      this.setState({ user: user })
   }

    onChangeFriend = friend => this.setState({friend});
    onChangeDeletion = deletion => this.setState({deletion});

    // add friend to database 
    // addFriend 

    render() {
        return (
            <View style={styles.container}>

                <Button 
                    style= {{ width: "80%"}}
                    title="Sign Out"
                    type="solid"
                    onPress = {this.signOutAsync}
                />
                <View style ={{width: "80%", flexDirection: "row", justifyContent: "space-around"}}>
                    <Input 
                        style= {{width: "80%"}}
                        placeholder = 'Add Friend'
                        onChangeText={this.onChangeFriend}
                        value={this.state.friend}
                        clearButtonMode='always'
                        returnKeyType='done'
                    />
                     <Button style= {{ width: "80%"}}
                        // title="Add Friend"
                        icon = {
                            <Icon
                                name ="done"
                                size = {20} 
                                />
                        }
                        type="solid"
                        onPress = {this.addFriend}
                    />
                </View>

                <Picker
                    selectedValue={this.state.deletion}
                    style={{width: "80%"}}
                    onValueChange= {this.onChangeDeletion}
                    >
                    <Picker.Item label="24 Hours " value = "24"/>
                    <Picker.Item label="5 Hours  " value = "5"/>
                    <Picker.Item label="1 Hour" value = "1"/>
                </Picker>

                <Text style={{fontSize: 20}}> Deletion time: {this.state.deletion} </Text>

                {/* <View style={{flexDirection ='row'}}>
                    <Input 
                        placeholder = 'Change Password'
                        onChangeText={this.onChangePass}
                        value={this.state.pass}
                        clearButtonMode='always'
                        returnKeyType='add'
                    />
                    <Button style= {{padding: '5', width: "80%"}}
                        // title="Change Password"
                        icon = {
                            <Icon
                                name ="done"
                                size = {} />
                        }
                        type="solid"
                        onPress = {this.changePass}
                    />
                </View> */}
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default settings;