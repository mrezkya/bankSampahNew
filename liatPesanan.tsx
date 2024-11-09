import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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




const server = `http://188.166.249.164:3000/pesananTest/${ambilWaktu()[1]}/${
  ambilWaktu()[0]
}`;
const LiatPesanan = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);


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
  }, [identitas]);

  useEffect(() => {
    const ambilData = async () => {
      const resp = await axios.get(server);
      setData(resp.data);
      console.log("data user")
      console.log(resp.data);
    };
    ambilData()
    console.log("panini : ",data)
  }, []);


  useEffect( () => {
    if(panini){
      console.log('berhasil')
      console.log(panini[0])
    }else{
      console.log('gagal')
    }
  }, [panini])
const maps = `https://www.google.com/maps?q=123,123`;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={style.goBack}>
        <Image source={require('./assets/gambar/back.png')} />
      </TouchableOpacity>
      <Text style={style.headText}>Ini adalah halaman liat pesanan</Text>
      {/* <Text>Filter : </Text> */}
      <ScrollView style={style.content}>
        {data.length == 0 &&
        <>
        <Image source={require('./assets/gambar/Sampah.jpg')} style={{width: 115, height: 160, alignSelf: 'center'}}/>
        <Text style={{alignSelf: 'center',fontSize: 20,color:'black',fontWeight: 'bold'}}>Belum ada pesanan untuk bulan ini</Text>
        </>

      }
        {data.map(item => (
          <View key={item.NIK} style={style.loop}>
            <Text style={style.title}> Nama : {item.Nama}</Text>
            <Text style={style.title}> Jenis sampah : {item.Jenis_Sampah}</Text>
            <Text style={style.title}>
              {' '}
              Berat sampah : {item.Berat_Sampah}
              {' KG '}
            </Text>
            <Text style={style.title}> Nomor HP : {item.Nomor_HP}</Text>
            <Text style={style.title}> Alamat : {item.Alamat}</Text>
            <Text style={style.title}> Waktu : {item.Waktu}</Text>

            
            <TouchableOpacity style={style.button} onPress={ async () => {
              if(panini){
                console.log(panini[0].auth)
                if(panini[0].auth === "admin"){
                  try {
                    console.log(item.id_Pesan);
    
                    const deleteData = await axios.get(
                      `http://188.166.249.164:3000/pesananDelete/${item.id_Pesan}`,
                    );
    
                    alert('Data berhasil dihapus');
                  } catch (err) {
                    alert('Data gagal dihapus');
                    console.log(err);
                  }
                }else{
                  Alert.alert('anda bukan admin')
                }
              }
            }}>
              <Text style={{color: 'black'}}>Konfirmasi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={style.maps}
              onPress={() => {
                alert(item.kordinat_A, item.kordinat_B);
                Linking.openURL(`https://www.google.com/maps?q=${item.kordinat_B},${item.kordinat_A}`);
              }}>
              <Text style={{color: 'black'}}>maps</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  maps: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: "89%",
    left: "35%",
  },
  button : {
    backgroundColor: 'white',
    width: 100,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 70,
  },
  loop: {
    backgroundColor: 'blue',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  headText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default LiatPesanan;
