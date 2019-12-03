import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput, 
    TouchableOpacity,
    StyleSheet,
    FlatList,

} from 'react-native';
import {
    Button,  
    Input,
    List,
    ListItem,
} from 'react-native-elements';

const friendList = [
    {
        key: 'Friend 1'
    },
    {
        key: 'Friend 2'
    },
    {
        key: 'Friend 3'
    },
]

class compose extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: 'New Message'
    });

    state = {recipient: ''}

    onPress = () => {
        // navigates to the chat app with the recipient name 
        this.props.navigation.navigate('chat', {recipient: this.state.recipient});
    };

    onChangeName = recipient => this.setState({recipient});

    // onFriendPress = name => this.setState({name})
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Input 
                        placeholder="Enter recipient"
                        onChangeText={this.onChangeName}
                        value={this.state.recipient}
                        clearButtonMode='always'
                        returnKeyType='done'
                    />
                    <Button 
                        title="Go"
                        type="solid"
                        onPress = {this.onPress}
                    />
                </View>

                <FlatList
                // advance feature : have a friend list where you can click on their name 
                //                   and message them 
                    // style = {{alignContent: 'left'}}
                    data={friendList}
                    renderItem={({item}) => 
                        <Button 
                            title={item.key}
                            type="clear"
                            // onPress = {this.onFriendPress(item.key)}
                        /> 
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    row: {
        width: "80%", 
        flexDirection: "row", 
        justifyContent: "space-around"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
});

export default compose;