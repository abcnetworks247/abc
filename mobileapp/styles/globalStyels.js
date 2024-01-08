import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        // backgroundColor: npLBlue,
        paddingTop: Platform.OS === 'android' ? 38 : 0
    },
});