import { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/Colors';

export default function App() {

  const [pickedNumber, setPickedNumber] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const fontsLoaded = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  function gameOverHandler(numberOfRounds) {
    setGameOver(true);
    setGuessRounds(numberOfRounds);
  }


  if (pickedNumber) {
    screen = <GameScreen
      userNumber={pickedNumber}
      onGameOver={gameOverHandler}
    />;
  }

  function onStartNewGame() {
    setPickedNumber(null);
    setGuessRounds(0);
    setGameOver(false);
  }

  if (gameOver) {
    screen = <GameOverScreen
      userNumber={pickedNumber}
      guessRounds={guessRounds}
      onStartNewGame={onStartNewGame}
    />;
  }

  function pickedNumberHandler(number) {
    setPickedNumber(number);
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        style={styles.rootContainer}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootContainer}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }


});
