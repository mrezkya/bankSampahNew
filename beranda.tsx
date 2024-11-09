import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native'; 
import axios from 'axios';

var long = 0;
var lati = 0;
var progress = null;
// import Svg,{Circle} from 'react-native-svg';
var auth = "Admin"

const Beranda = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigation = useNavigation();
  const data = 80;
  const dataInfo = 'Data sedang loading';

const ambilWaktu = () => {
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
  const data = Date.call();
  const data2 = data.split(' ');
  const bulan = Bulan(data2[1]);
  const tahun = data2[3];
  const Gabung = [bulan, tahun];
  return Gabung;
};
  const [test, setTest] = useState(null);

  const server = `http://188.166.249.164:3000/milestone/${ambilWaktu()[1]}/${
    ambilWaktu()[0]
  }`;
  const ambilData = async () => {
    try {
      const resp = await axios.get(server);
      console.log(resp.data.total);
      setTest(resp.data.total);
    } catch (error) {
      console.log('error', error);
    }
  };
//

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin keluar?', [
          {
            text: 'Batal',
            onPress: () => null, 
            style: 'cancel',
          },
          {
            text: 'Keluar',
            onPress: () => BackHandler.exitApp(), 
          },
        ]);
        return true; 
      },
    );


    return () => {
      backHandler.remove();
    };
  }, []);

//
  progress = test;

  useEffect(() => {
    const intervalId = setInterval(() => {
      ambilData(); 
    }, 1000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log("test",server)
    test;
  }, []);
  const loadSession = async () => {
    try {
      const session = await AsyncStorage.getItem('login');
      console.log('masuk beranda');
      console.log(session);
      if (session) {
        setSessionData(JSON.parse(session));
      } else {
        console.log('why');
        navigation.navigate('main');
      }
    } catch (err) {
      console.error('Error loading session:', err);
      navigation.navigate('main');
    }
  };

  useEffect(() => {
    loadSession();
    ambilData();
  }, []);
  // // const backAction = () => {
  //   const loadSession = async () => {
  //     const session = await AsyncStorage.getItem('session');
  //     if (session) {
  //       setSessionData(JSON.parse(session));
  //     } else {
  //       navigation.navigate('main');
  //     }
  //   };
  //     useEffect(() => {

  //   //   alert("Keluar Aplikasi?",[
  //   //     {
  //   //       text: "Batal",
  //   //       onPress: () => null,
  //   //       style: "cancel"
  //   //     },
  //   //     { text: "Keluar", onPress: () => BackHandler.exitApp() }
  //   //   ]);
  //   //   return true; // Menghentikan default back action
  //   // };

  //   // const backHandler = BackHandler.addEventListener(
  //   //   "hardwareBackPress",
  //   //   backAction
  //   // );

  //   // return () => backHandler.remove(); // Membersihkan listener saat komponen di-unmount
  //   loadSession();
  // }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/gambar/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={() => BackHandler.exitApp()}
          style={styles.logout}>
          <Image
            source={require('./assets/gambar/logout.png')}
            style={styles.logout}
          />
        </TouchableOpacity>
        <Text style={styles.headerTextOuter}>Bank Sampah</Text>
        <View style={styles.headerDalam}>
          <Text style={styles.headerText}>Milestone Sampah</Text>
          <Text style={styles.headerTotal}>{progress} KG</Text>
          <View style={styles.outerProgress}>
            <View style={styles.innerProgress}></View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.tombolPertama}
        onPress={() => navigation.navigate('tambahSampah')}>
        <View>
          <Text>Tambah Sampah</Text>
        </View>
      </TouchableOpacity>
      {auth !== 'User' && (
        <TouchableOpacity
          style={styles.tombolSampah}
          onPress={() => {
            navigation.navigate('liatSampah');
          }}>
          <Text>List Pesanan</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.tombolUser}
        onPress={() => navigation.navigate('user')}>
        <Text>Profil User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('Pemberitahuan', 'Fitur belum tersedia')}
        style={styles.tombolHistory}>
        <Image
          source={require('./assets/gambar/history.png')}
          style={styles.history}
        />
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
            <Text></Text>
      <Image
        source={require('./assets/gambar/KKNMBKM22.jpeg')}
        style={{width: '100%', height: 200}}
      />
      {/* <Text>ini adalah halaman beranda</Text> */}
      <Text></Text>
      <View style={styles.contentKedua}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Tentang Aplikasi
        </Text>
        <Text style={{color: 'black', textAlign: 'center'}}>
          Aplikasi bank sampah ini akan memudahkan pengguna untuk mengurangi
          sampah yang berada di kelurahan purirano, massarakyat bisa menggunakan
          layanan ini untuk menjual sampah mereka yang mempunyai nilai jual,
          diharapkan dengan adanya aplikasi ini sampah akan lebih mudah
          diolah/daur ulang. Aplikasi ini di kembangkan oleh Tim KKN MBKM UHO
          2022.
        </Text>
      </View>
      {/* <BarChart data={data}></BarChart> */}
      {/* <Text>ini adalah halaman beranda</Text> */}
      {/* <BarChart data="100"/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  contentKedua: {
    backgroundColor: '#409BF0',
    borderRadius: 10,
    width: '80%',
    height: "30%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  history: {
    width: 20,
    height: 20,
  },
  tombolHistory: {
    backgroundColor: '#409BF0',
    borderRadius: 10,
    padding: 4,   
    position: 'absolute',
    right: '5%',
    top: '31%',
  },
  tombolUser: {
    backgroundColor: '#409BF0',
    borderRadius: 10,
    padding: 4,
    position: 'absolute',
    top: '31%',
    right: '15%',
  },
  tombolSampah: {
    backgroundColor: '#409BF0',
    borderRadius: 10,
    padding: 4,
    position: 'absolute',
    top: '31%',
    left: '38%',
  },
  logout: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '10%',
    right: '5%',
  },
  tombolPertama: {
    backgroundColor: '#409BF0',
    borderRadius: 10,
    padding: 4,
    position: 'absolute',
    top: '31%',
    left: '5%',
  },
  headerTextOuter: {
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
    top: '10%',
    left: '15%',
  },
  logo: {
    height: 40,
    width: 30,
    position: 'absolute',
    left: '4%',
    top: '5%',
  },
  headerTotal: {
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    top: '80%',
    left: '90%',
    color: 'black',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: '35%',
    left: '5%',
    color: 'black',
  },
  headerDalam: {
    backgroundColor: 'white',
    width: '80%',
    height: '60%',
    position: 'absolute',
    top: 90,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  header: {
    padding: 20,
    backgroundColor: '#409BF0',
    width: '100%',
    height: '30%',
    position: 'absolute',
    top: 0,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerProgress: {
    position: 'absolute',
    top: '80%',
    left: '5%',
    width: '80%',
    height: 30,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  innerProgress: {
    height: progress === '1%' ? 10 : '100%',
    width: progress,
    backgroundColor: '#409BF0',
    borderRadius: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Beranda;
