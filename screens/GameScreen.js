import { StyleSheet, Text, View, Alert, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

import Title from "../components/ui/Title";
import NumberContanier from "../components/game/NumberContanier";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";
import GameLogItem from "../components/game/GameLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [minBoundary, setMinBoundary] = useState(1);
    const [maxBoundary, setMaxBoundary] = useState(100);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        // Validate user input - catch if they're lying
        if (
            (direction === 'lower' && currentGuess < userNumber)
            || (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { text: 'Sorry', style: 'cancel' }
            ]);
            return;
        }
        // Update boundaries based on direction
        let newMinBoundary = minBoundary;
        let newMaxBoundary = maxBoundary;

        if (direction === 'lower') {
            newMaxBoundary = currentGuess;
        } else {
            newMinBoundary = currentGuess + 1;
        }

        setMinBoundary(newMinBoundary);
        setMaxBoundary(newMaxBoundary);

        const newRandomNumber = generateRandomBetween(newMinBoundary, newMaxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuessRounds((prev) => [newRandomNumber, ...prev]);
    }

    return (
        <ScrollView>
            <View style={styles.rootContainer}>
                <Title>Opponent's Guess</Title>
                <NumberContanier>{currentGuess}</NumberContanier>
                <Card>
                    <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                                <Ionicons name="remove-outline" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                                <Ionicons name="add-outline" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                    </View>
                </Card>
                <View style={styles.listContainer}>
                    <FlatList
                        data={guessRounds}
                        renderItem={(itemData) => <GameLogItem
                            roundNumber={guessRounds.length - itemData.index}
                            guess={itemData.item}
                        />}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item.toString()}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 16
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16
    }

});