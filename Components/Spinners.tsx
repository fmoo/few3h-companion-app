import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from "react-native";


export function SpinnerView() {
    return (
        // <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.container} />
        // </View>
    );

}

export function Spinner() {
    return <ActivityIndicator />
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
