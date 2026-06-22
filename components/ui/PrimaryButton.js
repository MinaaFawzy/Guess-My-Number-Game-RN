import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ?
                        [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer}
                onPress={onPress}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View >
    );
}

export default PrimaryButton;


const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,

    },
    pressed: {
        opacity: 0.75
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});