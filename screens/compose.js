import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput, 
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    Button,  
    Input,
} from 'react-native-elements';


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
                <Input 
                    placeholder="Enter recipient"
                    onChangeText={this.onChangeName}
                    value={this.state.recipient}
                    clearButtonMode='always'
                />
                <Button 
                    title="Go"
                    type="solid"
                    onPress = {this.onPress}
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
});

export default compose;