import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs' 
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator} from '@react-navigation/drawer'


//components import 

import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';


import {Provider as PaperProvider } from "react-native-paper";




const Drawer = createDrawerNavigator(); 
const Tab = createBottomTabNavigator(); 
const Stack = createStackNavigator();

//bottom tab navigation  

const BottomTabs = () =>(
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen}/>
    <Tab.Screen  name="Settings" component={SettingsScreen}/>
 </Tab.Navigator>
)
  
 //Drawer navigation
const AppDrawer = () =>(
  <Drawer.Navigator>
    <Drawer.Screen name="Main" component={BottomTabs} />
    <Drawer.Screen name="Search" component={SearchScreen} />
    <Drawer.Screen  name="Profile" component={ProfileScreen}/>
    <Drawer.Screen name="Settings" component={SettingsScreen}/>
    
  </Drawer.Navigator>
)



export default function Index() {
  return (
    
    <PaperProvider>
   <NavigationContainer independent={true}>
   <AppDrawer />
   </NavigationContainer>
   </PaperProvider>
  );
}
