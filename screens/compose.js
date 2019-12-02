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
        key: 'Andrew'
    },
    {
        key: '1'
    },
    {
        key: '2'
    },
    {
        key: '3'
    },
]



class compose extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: 'New Message'
    });

    state = {recipient: ''}

    onPress = () => {
        this.props.navigation.navigate('chat', {recipient: this.state.recipient});
    };

    onChangeName = recipient => this.setState({recipient});

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
                {/* Friend list  */}
                <FlatList
                    data={friendList}
                    renderItem={({item}) => 
                        <Button 
                            title={item.key}
                            type="clear"
                            // onPress = {recipient => this.setState(item.key)}
                /> }
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