import React, { Component } from 'react';
import { 
    View, 
    Text,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

class settings extends React.Component {

    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    This is the account settings page, where you can change shit.
                </Text>
                <TouchableOpacity onPress = {this.signOutAsync}>
                    <Text style = {styles.buttonText}>
                        Sign out
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    <Text >
                        Deletion policy
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    <Text >
                        Change password
                    </Text>
                </TouchableOpacity>
                
                
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

export default settings;