import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert} from "react-native";
import {useNavigation} from '@react-navigation/native'; 
import axios from "axios";
// pastikan komponen Daftar adalah komponen React yang valid
const Daftar = () => {
  const [NIK, setNIK] = useState('');
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const dafarUser = async () => {
    try{
      const response = await axios.post(
        'http://188.166.249.164:3000/tambahPengguna',
        {
          NIK: NIK,
          username: nama,
          nomor_hp: noHp,
          email: email,
          alamat: alamat,
        },
      );
      console.log(response.data)
      if(response.data.status === true){
        Alert.alert('berhasil')
        navigation.navigate('main')
      }
    }catch{
      console.log('error')
    }
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/gambar/banner.jpg')}
        style={{height: 200, marginTop: 0, paddingTop: 0, marginBottom: '5%'}}
      />
      <ScrollView>
        <Text style={styles.headerText}>Silahkan Daftarkan Akun Anda</Text>

        <Text style={{color: 'black'}}>Masukan Nomor Kartu Keluarga</Text>
        <TextInput
          style={styles.inputForm}
          placeholder="Nomor Kartu Keluarga"
          placeholderTextColor={'black'}
          value={NIK}
          onChangeText={setNIK}
          color={'black'}
        />
        <Text style={{color: 'black'}}>Masukan Nama Anda</Text>
        <TextInput
          style={styles.inputForm}
          placeholder="Masukan Nama Anda"
          placeholderTextColor={'black'}
          value={nama}
          onChangeText={setNama}
          color={'black'}
        />
        <Text style={{color: 'black'}}>Masukan Nomor HP/Whatsapp Anda</Text>
        <TextInput
          style={styles.inputForm}
          placeholder="Masukan Nomor Hp Anda"
          placeholderTextColor={'black'}
          value={noHp}
          onChangeText={setNoHp}
          color={'black'}
        />
        <Text style={{color: 'black'}}>Masukan Alamat Anda</Text>
        <TextInput
          style={styles.inputForm}
          placeholder="Masukan Alamat Anda"
          placeholderTextColor={'black'}
          value={alamat}
          color={'black'}
          onChangeText={setAlamat}
        />
        <Text style={{color: 'black'}}>Masukan Email Anda</Text>
        <TextInput
          style={styles.inputForm}
          placeholder="Masukan Email Anda"
          placeholderTextColor={'black'}
          value={email}
          color={'black'}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.inpuTombol} onPress={dafarUser}>
          <Text>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  inpuTombol: {
    backgroundColor: '#90ee90',
    margin: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 3,
  },
  inputForm: {
    margin: 10,
    width: 300,
    height  : 40,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Daftar