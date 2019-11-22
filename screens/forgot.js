import React, { Component } from 'react';
import { 
    View, 
    Text,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';


// modal

class forgot extends React.Component {

    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    This is theforogt usernmae or password page, where you can change shit.
                </Text>              
                
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

export default forgot;