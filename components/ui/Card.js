import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

function Card({ children }) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    card: {
        marginTop: 35,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        alignItems: 'center',
    },
});
