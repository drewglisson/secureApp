import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


class authLoading extends React.Component {

    componentDidMount() {
        this.bootStrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootStrapAsync =  async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'app' : 'auth');
    };

    render() {
        return (
            <View styles={styles.continer}>
                <ActivityIndicator />
                <StatusBar barStyle = "default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default authLoading;