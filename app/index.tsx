import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native"; 
import { createDrawerNavigator} from '@react-navigation/drawer'
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import {Provider as PaperProvider } from "react-native-paper";



const Drawer = createDrawerNavigator(); 

export default function Index() {
  return (
    
    <PaperProvider>

   <NavigationContainer independent={true}>
    <Drawer.Navigator initialRouteName="Home">
     
      <Drawer.Screen name="Home" component={HomeScreen} />  
      
     <Drawer.Screen name="Search" component={SearchScreen} />
    </Drawer.Navigator>
   </NavigationContainer>
   </PaperProvider>
  );
}
