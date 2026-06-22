import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function NumberContanier({ children }) {
    return (
        <View style={styles.numberContanier}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}

export default NumberContanier;

const styles = StyleSheet.create({
    numberContanier: {
        borderRadius: 8,
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: Colors.accent500,
        fontFamily: 'open-sans',
        fontSize: 36,
    }
});
