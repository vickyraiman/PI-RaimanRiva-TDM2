import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

import Home from '../Screens/Home';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black"/> 
                }} 
            />
        </Tab.Navigator>
    );
}

export default HomeMenu;