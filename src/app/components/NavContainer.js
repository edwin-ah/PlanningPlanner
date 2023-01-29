import React, { useContext } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import FoodScreen from '../screens/FoodScreen';
import SelectUserScreen from '../screens/SelectUserScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context_api/AuthContext';


const Tab = createMaterialBottomTabNavigator();
export default function NavContainer() {

  const [user, setUser] = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Activities"
      activeColor="#1d4ed8"
      inactiveColor="#9ca3af"
      barStyle={{ backgroundColor: "#fffcf9" }}
      screenOptions={{ headerShown: false }}
    >
      {user ? (
        <>
          <Tab.Screen name="Activities" component={ActivitiesScreen}
            options={{
              tabBarLabel: "Aktiviteter",
              tabBarIcon: ({ color }) => (
                <Ionicons name="heart-outline" color={color} size={26} />
              )
            }}
          />
          <Tab.Screen name="Foods" component={FoodScreen}
            options={{
              tabBarLabel: "Mat",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="food-apple-outline" color={color} size={26} />
              )
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen name="Login" component={SelectUserScreen}
            options={{
              tabBarLabel: "Logga in",
              tabBarIcon: ({ color }) => (
                <Ionicons name="log-in-outline" color={color} size={26} />
              )
            }}
          />
          {/* <Tab.Screen name="Register" component={RegisterScreen} 
            options={{
              tabBarLabel: "Register",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="edit" color={color} size={26} />
              )
            }}
          /> */}
        </>
      )}
    </Tab.Navigator>
  );
}