import React, { useState } from 'react';
import {
    TouchableOpacity,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const keys = {
    '0': require('./images/key-0.png'),
    '1': require('./images/key-1.png'),
    x: require('./images/key-x.png'),
    'arm-1': require('./images/arm-1.png'),
    'arm-2': require('./images/arm-2.png'),
    'arm-3': require('./images/arm-3.png'),
    'arm-4': require('./images/arm-4.png'),
};

export default function App() {
    const genNum = () => Math.floor(Math.random() * 1001);
    const [num, setNum] = useState(genNum());
    const [binary, setBinary] = useState('');
    const [myNum, setMyNum] = useState(0);
    const randImg = () => `arm-${Math.floor(1 + Math.random() * 4)}`;
    const [img, setImg] = useState(randImg());
    const addText = (val) => () =>
        setBinary((x) => {
            const _val = `${x}${val}`;
            setMyNum(parseInt(_val, 2));
            setImg(randImg());
            return _val;
        });
    const add0 = addText(0);
    const add1 = addText(1);
    const del = () => {
        setBinary((x) => {
            const val = Boolean(x.length) ? x.slice(0, x.length - 1) : '';
            if (Boolean(val)) setMyNum(parseInt(val, 2));
            else setMyNum(0);
            return val;
        });
        setImg(randImg());
    };
    return (
        <ImageBackground 
            source={keys[img]}
            style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.playContainer}>
                </View>
                <View style={styles.binaryContainer}>
                    <Text style={styles.binaryText}>
                        {num} = {binary} ({myNum})
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonContainerLeft}>
                        <TouchableOpacity
                            onPress={add0}
                            style={styles.keyOpacity}>
                            <Image style={styles.key} source={keys['0']} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainerRight}>
                        <TouchableOpacity
                            onPress={add1}
                            style={styles.keyOpacity}>
                            <Image style={styles.key} source={keys['1']} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainerRight}>
                        <TouchableOpacity
                            onPress={del}
                            style={styles.keyOpacity}>
                            <Image style={styles.key} source={keys['x']} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    safeContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 32,
    },
    playContainer: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonContainer: {
        width: '100%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainerLeft: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainerRight: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    key: {
        width: 60,
        height: 60,
    },
    keyOpacity: {
        width: 60,
        height: 60,
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    binaryContainer: {
        width: '100%',
        height: 40,
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    binaryText: {
        fontSize: 24,
        color: '#fff',
    },
});
