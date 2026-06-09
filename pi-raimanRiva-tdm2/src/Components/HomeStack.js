import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Screens/Home';
import DetallePost from '../Screens/DetallePost';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="DetallePost" 
                component={DetallePost} 
                options={{ title: 'Comentarios' }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;