import { View, Image, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native";

import Colors from "../constants/Colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ userNumber, guessRounds, onStartNewGame }) {

    const { width, height } = useWindowDimensions();
    const imageheight = height < 400 ? 150 : 300;
    return (
        <ScrollView>
            <View style={styles.rootContainer}>
                <Title>Game End!</Title>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/success.png')}
                        style={[styles.image, {
                            height: imageheight,
                            width: imageheight,
                            borderRadius: imageheight / 2
                        }]} />
                </View>
                <Text style={styles.summaryText} >
                    Your phone needed
                    <Text style={styles.highlight}> {guessRounds} </Text>
                    guesses to guess the number
                    <Text style={styles.highlight}> {userNumber} </Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>
                    Start New Game
                </PrimaryButton>
            </View>
        </ScrollView>
    );
}

export default GameOverScreen;



const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: 150,
        overflow: 'hidden',
        margin: 36,
        borderWidth: 3,
        borderColor: Colors.primary800
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontSize: 24,
        fontFamily: 'open-sans',
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }

});



