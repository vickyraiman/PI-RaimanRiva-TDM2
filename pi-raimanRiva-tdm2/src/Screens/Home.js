import { View, Text, Pressable } from 'react-native';
import { auth } from '../firebase/config';

function Home() {
    return (
        <View>
            <Text>Home</Text>
            <Text>Bienvenido a la app</Text>
        </View>
    );
}

export default Home;