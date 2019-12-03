import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
} from 'react-native';


// modal

class forgot extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Advance page for the user to reset their password 
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