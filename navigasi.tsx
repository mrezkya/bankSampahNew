import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

import lamanLogin from './App';
import main from './beranda';
import tambahSampah from './TambahSampah';
import liatSampah from "./liatPesanan"
import User from "./profil"
import daftar from "./daftar"

const Stack = createNativeStackNavigator();

enableScreens();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={lamanLogin}
          options={{title: 'haha', headerShown: false}}
        />
        <Stack.Screen
        name='daftar'
        component={daftar}
        options={{title:'hebat', headerShown:false}}
        />
        <Stack.Screen
          name="Home"
          component={main}
          options={{title: 'hebat', headerShown: false}}
        />
        <Stack.Screen
          name="tambahSampah"
          component={tambahSampah}
          options={{title: 'hebat', headerShown: false}}
        />
        <Stack.Screen
          name="liatSampah"
          component={liatSampah}
          options={{title: 'tested', headerShown: false}}
        />
        <Stack.Screen
          name="user"
          component={User}
          options={{title: 'tested', headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
