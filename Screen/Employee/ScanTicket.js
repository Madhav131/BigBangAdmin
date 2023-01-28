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

export default function ScanTicket(props) {
  const [token, setToken] = useState('');
  const [total_person, setPerson] = useState(0);
  const [scan, setScan] = useState(true);
  const [ismodalfalse, setIsmodalFalse] = useState(false);
  const [getmsg, setMsg] = useState('');

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

    console.log('fromdata-->>', formdata);
    await axios
      .post(BASE_URL + 'check-ticket', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('-----res entry ', res.data.data);
        if (res.data.success === 1) {
          setScan(true);
          props.navigation.navigate('Ticketupdate', {
            _data: res.data.data,
          });
        } else if (res.data.status === 'Token is Expired') {
          props.navigation.reset({routes: [{name: 'LoginScreen'}]});
        } else {
          Toast.show(res.data.message);
          setMsg(res.data.message);
          setIsmodalFalse(true);
          // props.navigation.replace('ScanTicket');
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
          Scan Ticket
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
                color: 'black',
                marginTop: '3%',
              }}>
              Please move your camera {'\n'} over the QR Code
            </Text>
          }
        />
      ) : (
        <View style={{flex: 1, backgroundColor: colors.black}} />
      )}
      <Modal
        isVisible={ismodalfalse}
        onBackButtonPress={() => {
          setIsmodalFalse(false);
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
              setIsmodalFalse(false);
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
