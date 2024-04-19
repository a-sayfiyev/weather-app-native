import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { LinearGradient } from 'expo-linear-gradient';

export default function Loader() {
    return (
        <View style={styles.fullScreen}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.fullScreen}>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0)"
                    source={require('../assets/loader.json')}
                    animationStyle={styles.lottie}
                    speed={1}
                />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottie: {
        width: 150,
        height: 150,
    },
});
