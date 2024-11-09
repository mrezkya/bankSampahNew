import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import Beranda from './beranda';
import {useNavigation} from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// const axios = require('axios');
import axios from 'axios';
// axios

const App = () => {
  const [nomorKartuKeluarga, setNomorKartuKeluarga] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  },[]);


  const login = async (no) => {
    setLoading(true)
    try {
      const mayaSara = await axios.post('http://188.166.249.164:3000/login', {
        username: no,
      });
      if(mayaSara.data.Status == true){
        // navigation.navigate('Home') 

        console.log("status login", mayaSara.data)
        const sessionInfo = {no}
        await AsyncStorage.setItem('login', JSON.stringify(sessionInfo))
        console.log('Session Info login:', sessionInfo);
        const storedSession = await AsyncStorage.getItem('login');
        console.log("beranda session")
        console.log(storedSession)
        setTimeout(() => {
          navigation.navigate('Home')
          
        }, 3000);
      }else{
        console.log(mayaSara.data.Status)
        console.log(no)
        alert("gagal")
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        {!isKeyboardVisible && (
          <>
            <Image
              style={styles.logo}
              source={require('./assets/gambar/logo.png')}
            />
            <Text style={styles.judul}>BANKSA</Text>
          </>
        )}
      </View>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.inputKtp}
          placeholder="Masukkan Nomor Kartu Keluarga"
          keyboardType="numeric"
          value={nomorKartuKeluarga}
          onChangeText={setNomorKartuKeluarga}
          placeholderTextColor={'black'}
          color={'black'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('daftar')}
          style={[
            styles.daftar,
            {
              top: isKeyboardVisible ? '70%' : '60%',
              height: isKeyboardVisible ? '10%' : '5%',
            },
          ]}>
          <Text style={styles.daftarText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonLogin,
            {
              top: isKeyboardVisible ? '70%' : '60%',
              height: isKeyboardVisible ? '10%' : '5%',
            },
          ]}
          onPress={() => login(nomorKartuKeluarga)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{marginTop: 16}}
          />
        )}
      </View>
      <View style={styles.keuntungan}>
        {!isKeyboardVisible && (
          <>
            <TouchableOpacity onPress={() => {
              Alert.alert('keuntungan','dengan menggunakan aplikasi ini pengguna dapat menjual sampah dan membantu mengurangi sampah yang berada di kelurahan purirano')
            }}>
              <Text style={styles.keuntunganText}>Keuntungan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert('laporkan kerusakan','Anda dapat melaporkan kerusakan atau masalah yang anda alami dengan cara mengirimkan email ke : mrezkya@ghotmail.com atau mengirim pesan ke nomor whatsapp berikut 083135026072')
            }}>
            <Text style={styles.report}>Laporkan kerusakan</Text>

            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keuntungan: {
    position: 'absolute',
    bottom: '35%',
    width: '100%',
    height: '5%',
    // backgroundColor: 'white',
  },
  keuntunganText: {
    position: 'absolute',
    top: '0%',
    left: '15%',
    textDecorationLine: 'underline',
  },
  report: {
    position: 'absolute',
    top: '0%',
    left: '45%',
    textDecorationLine: 'underline',
  },
  header: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center', 
    width: '100%',
    height: '100%',
  },
  loginForm: {
    position: 'absolute',
    left: '20%',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#409BF0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    // Tambahkan gaya untuk logo jika diperlukan
    position: 'absolute',
    top: '9%',
  },
  judul: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: '35%',
    left: '35%',
  },
  inputKtp: {
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '10%',
  },
  buttonLogin: {
    position: 'absolute',
    top: '60%',
    left: '53%',
    backgroundColor: '#27629A',
    width: '33%',
    height: '5%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  daftar: {
    position: 'absolute',
    top: '60%',
    left: '10%',
    backgroundColor: '#27629A',
    width: '33%',
    height: '5%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  daftarText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
