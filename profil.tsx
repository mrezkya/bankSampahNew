import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

// const ambilDataServer = async () => {
//   const resp = await axios.get(`http://10.0.3.2:3000/user/`)
// }
const Profil = () => {
  const [sessionData, setSessionData] = useState(null);

  const ambilNIKuser = async () => {
    const session = await AsyncStorage.getItem('login');
    console.log(session);
    if (session) {
      setSessionData(JSON.parse(session));
      console.log(sessionData.no);
    }
  };

  useEffect(() => {
    ambilNIKuser();
  }, []);


  const [data, setData] = useState([]);
  useEffect(() => {
    if (sessionData) {
      console.log('siaps', sessionData.no);
      console.log('masuk profil');

      // Definisikan fungsi asinkron di sini
      const ambilDataUser = async () => {
        try {
          const resp = await axios.get(
            `http://188.166.249.164:3000/user/${sessionData.no}`,
          );
          console.log(resp.data.results); 
          setData(resp.data.results);
        } catch (error) {
          console.log('error', error);
          console.log(`http://188.166.249.164:3000/user/${sessionData.no}`);
        }
      };

      // Panggil fungsi ambilDataUser sekali
      ambilDataUser();
    }
  }, [sessionData]); // Menjalankan useEffect setiap kali sessionData berubah


  useEffect( () => {
    if(data[0] == null){
      console.log("data null")
    }else{
      console.log(data[0])
    }
  }, [data])
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Profil</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('./assets/gambar/back.png')} />
      </TouchableOpacity>
      <View style={styles.content}>
        {/* <Text style={styles.headerText}>
          NO KK : {sessionData == null ? 'ok' : sessionData.no}{' '}
        </Text>
        <Text style={styles.headerText}>Nama :</Text>
        <Text style={styles.headerText}>Alamat :</Text>
        <Text style={styles.headerText}>No HP :</Text>
        <Text style={styles.headerText}>Email :</Text> */}
        {data.map(item => (
          <>
            <Text style={styles.headerText}>NO KK : {item.NIK}</Text>
            <Text style={styles.headerText}>Nama : {item.username}</Text>
            <Text style={styles.headerText}>Alamat : {item.alamat}</Text>
            <Text style={styles.headerText}>No HP : {item.nomor_hp}</Text>
            <Text style={styles.headerText}>Email :{item.email}</Text>
          </>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    height: '100%',
  },
  content: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});
export default Profil;
