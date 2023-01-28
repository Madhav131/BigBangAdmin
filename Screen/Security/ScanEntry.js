import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../utils/const';
import Toast from 'react-native-simple-toast';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ScanEntry(props) {
  const [isModalOPen, setModalOPen] = useState(false);
  const [isModalfalse, setIsModalFalse] = useState(false);
  const [token, setToken] = useState('');
  const [total_person, setPerson] = useState(0);
  const [scan, setScan] = useState(true);
  const [getmsg, setMsg] = useState('');

  //   useEffect(() => {
  //     // const _token = AsyncStorage.getItem("token")
  //     AsyncStorage.getItem('token').then(value => {
  //       if (value) {
  //         setToken(value);
  //         console.log('---', value);
  //       }
  //     });
  //   }, [token]);

  const onSuccess = e => {
    const check = e.data.substring(0, 4);
    console.log('scanned data---------' + e.data);
    setScan(false);
    checkEntry(e.data);
  };

  const checkEntry = async code => {
    const Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('qr_code', code);

    await axios
      .post(BASE_URL + 'check-entry', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('-----res entry ', res.data);
        if (res.data.success === 1) {
          setModalOPen(true);
          setPerson(res.data.person);
        } else if (res.data.status === 'Token is Expired') {
          props.navigation.reset({routes: [{name: 'LoginScreen'}]});
        } else {
          Toast.show(res.data.message);
          setMsg(res.data.message);
          setIsModalFalse(true);
          // props.navigation.replace('ScanEntry');
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };

  const logout = async () => {
    AsyncStorage.clear();
    props.navigation.reset({routes: [{name: 'LoginScreen'}]});
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: '5%',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.black}}>
          Scan Entry
        </Text>
        <Entypo
          name="log-out"
          size={25}
          color={colors.black}
          onPress={() => logout()}
        />
      </View>

      {scan ? (
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          // cameraType="front"
          // ref={(node) => { scanner = node }}
          onRead={onSuccess}
          topContent={
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 18,
                padding: 32,
                color: 'black',
              }}>
              Please move your camera {'\n'} over the QR Code
            </Text>
          }
        />
      ) : (
        <View style={{flex: 1, backgroundColor: colors.black}} />
      )}

      <Modal
        isVisible={isModalOPen}
        onBackButtonPress={() => {
          setModalOPen(false);
          setScan(true);
        }}>
        <View
          style={{
            padding: '5%',
            backgroundColor: colors.white,
            borderRadius: 3,
          }}>
          <Image
            source={require('../assets/right.png')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 10,
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              color: colors.black,
              fontWeight: '500',
            }}>
            Total Person
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              marginTop: '1%',
              color: colors.black,
              fontWeight: '500',
            }}>
            {total_person}
          </Text>

          <TouchableOpacity
            style={{marginTop: '5%', alignSelf: 'center'}}
            onPress={() => {
              setScan(true);
              setModalOPen(false);
            }}>
            <Text
              style={{
                marginTop: '5%',
                color: colors.red,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: '5%',
              }}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isModalfalse}
        onBackButtonPress={() => {
          setIsModalFalse(false);
          setScan(true);
        }}>
        <View
          style={{
            padding: '5%',
            backgroundColor: colors.white,
            borderRadius: 3,
          }}>
          <Image
            source={require('../assets/wrong.png')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 10,
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              marginTop: '1%',
              color: colors.black,
              fontWeight: '500',
            }}>
            {getmsg}
          </Text>

          <TouchableOpacity
            style={{marginTop: '5%', alignSelf: 'center'}}
            onPress={() => {
              setScan(true);
              setIsModalFalse(false);
            }}>
            <Text
              style={{
                color: colors.red,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
