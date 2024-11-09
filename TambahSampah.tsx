import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet,TextInput, TouchableOpacity, Image, ScrollView, Alert, PermissionsAndroid} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native'; 
import Geolocation from '@react-native-community/geolocation';
import backend from "./fungsiku";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

var lati = 0
var long = 0 
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
  Geolocation.getCurrentPosition(info => {
    console.log(info.coords.latitude);
    console.log(info.coords.longitude);
    long = info.coords.longitude
    lati = info.coords.latitude
  });
};

const hariIni = () => {
  var [thebulan, tahun, tanggal] = '';
  const Bulan = bulan => {
    bulanIni = [
      {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      },
    ];
    return bulanIni[0][bulan];
  };
  const getDate = Date.call();
  dateAwal = getDate.split(' ');
  // console.log(dateAwal)
  Bulan(dateAwal[1]);
  thebulan = Bulan(dateAwal[1]);
  tahun = dateAwal[3];
  tanggal = dateAwal[2];
  let hasil = `${tahun}-${thebulan}-${tanggal}`;
  // console.log(hasil)
  return hasil;
};


//referensi

const TambahSampah = () => {
  //   const [data, setData] = useState(null);
  const navigation = useNavigation();
  //   useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       'https://jsonplaceholder.typicode.com/posts/1',
  //     );
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);
  const [identitas, setIdentitas] = useState(null);
  const [panini, setPanini] = useState([]);

  useEffect(() => {
    const cekIdentitas = async () => {
      const cekIdentitasUser = await AsyncStorage.getItem('login');
      const userIdentitas = JSON.parse(cekIdentitasUser);
      setIdentitas(userIdentitas);
      console.log('Hasil identitas:', userIdentitas);
    };
    cekIdentitas();
  }, []);

  useEffect(() => {
    if (identitas) {
      const paniniApi = async () => {
        try {
          const response = await axios.get(
            `http://188.166.249.164:3000/user/${identitas.no}`,
          );
          setPanini(response.data.results);
          console.log('wow:', response.data.results);
        } catch (error) {
          console.error('Error fetching panini:', error);
        }
      };
      paniniApi();
    }
  }, [identitas]); // Tambahkan identitas sebagai ketergantungan

  useEffect(() => {
    console.log('Updated panini:', panini);
  }, [panini]); // Memantau perubahan pada panini

  useEffect(() => {
    console.log('Updated panini:', panini[0]); // Log terbaru dari panini
  }, [panini]);

  const [selectedValue, setSelectedValue] = useState('Sampah Plastik');
  // useEffect(() => {
  //     const {NIK, email, nomor_hp, username} = panini[0];
  //     console.log('NIK : ', NIK);
  //     console.log('NIK : ', username);
  // }, [panini]);
  const [total, setTotal] = useState(null);
  const tambahPesanan = async () => {
      const resp = await axios.post(
        'http://188.166.249.164:3000/tambahPesanan',
        {
          Nama: panini[0].username,
          Jenis_Sampah: selectedValue,
          Berat_Sampah: total,
          Nomor_HP: panini[0].nomor_hp,
          Alamat: panini[0].alamat,
          kordinat_A: long,
          kordinat_B: lati,
          Waktu: hariIni(),
        },
      );
      console.log(panini[0].username, selectedValue, total, panini[0].nomor_hp,panini[0].alamat, long, lati, hariIni())
      if(resp.data.status === true){
        navigation.navigate('Home')
        Alert.alert('berhasil Menambahkan Sampah')
      }
  };

  const [dataku, setDataku] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  useEffect(() => {
    const panini = async () => {
      try {
        const session = await AsyncStorage.getItem('login');
        console.log(session);
        setSessionData(session);
      } catch (err) {
        console.log('tidak ada session');
      }
    };
  });

  // const madanFuraTelaso = async () => {
  //   try{

  //     const response = await axios.get(
  //       `https://3f8b-125-162-232-71.ngrok-free.app/user/123123123123123123`,
  //     );
  //     console.log(response.data);
  //     console.log("Bismillah",sessionData.no)
  //     setDataku(response.data.results)
  //     console.log("panini", dataku)

  //   }catch(err){
  //     console.log(err)
  //   }}
  //   panini().then(madanFuraTelaso())
  // }, [])

  // useEffect(() => {
  //   console.log('Data yang disimpan di state: ', dataku);
  // }, [dataku]);

  const lihatHasil = () => {
    if (selectedValue == 'sampah plastik') {
      alert('selamt datang');
      console.log(panini[0].username);
      console.log(panini[0].NIK);
    } else {
      alert('anda memilih sampah kaleng');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBack}>
        <Image source={require('./assets/gambar/back.png')} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Masukan keterangan sampah</Text>
      <ScrollView style={styles.sampahForm}>
        <Text>Masukan total sampah</Text>
        <TextInput
          style={styles.inputSampah1}
          placeholder="masukan total berat sampah"
          keyboardType="numeric"
          placeholderTextColor={'black'}
          maxLength={3}
          onPress={requestCameraPermission}
          onChangeText={text => setTotal(text)}
        />
        <Text>Masukan total sampah</Text>
        <Picker
          style={styles.inputSampah2}
          onValueChange={value => console.log(value)}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Sampah plastik" value="sampah plastik" />
          <Picker.Item label="sampah kaleng" value="sampah kaleng" />
        </Picker>
        <TouchableOpacity style={styles.submit} onPress={tambahPesanan}>
          <Text style={{color: 'black'}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <Text>anda memilij {selectedValue}</Text> */}
      <View style={styles.content}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
            alignSelf: 'center',
          }}>
          Informasi Sampah
        </Text>
        <Text>Harga Sampah</Text>
        <Text>Sampah plastik/KG Rp. 10000</Text>
        <Text>Sampah kaleng/KG Rp. 2000</Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#409BF0',
    borderRadius: 10,
    height: "15%",
    padding: 10,
    width: 300,
    marginTop: "35%",
  },
  submit: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    top: '115%',
    left: '35%',
  },
  goBack: {
    position: 'absolute',
    top: 20,
    left: 45,
  },
  inputSampah2: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
  },
  inputSampah1: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 100,
    color: 'black',
  },
  sampahForm: {
    position: 'absolute',
    top: 150,
    backgroundColor: '#409BF0',
    borderRadius: 10,
    height: 250,
    width: '80%',
    padding: 20,
  },
});
export default TambahSampah;