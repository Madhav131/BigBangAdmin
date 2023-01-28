import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-simple-toast';
import metrics from '../utils/Metrics';
import axios from 'axios';
import Modal from 'react-native-modal';
import {ACCEPT_HEADER, BASE_URL} from '../utils/const';

export default function Ticketupdate(props) {
  const [ticketData, setData] = useState(props.route.params._data);
  const [isModalOPen, setModalOPen] = useState(false);
  const [getpicker, setPicker] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [ismodalfalse, setIsmodalFalse] = useState(false);
  const [getmsg, setMsg] = useState('');

  // useEffect(() => {
  //     // const _token = AsyncStorage.getItem("token")
  //     AsyncStorage.getItem("token").then((value) => {
  //         if (value) {
  //             setToken(value)
  //             console.log("---", value)
  //         }
  //     });
  // }, [])

  const update = async () => {
    const Token = await AsyncStorage.getItem('token');
    if (getpicker === '') {
      Toast.show('Please select person');
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('qr_code', ticketData.qr_code);
    data.append('person', getpicker);

    axios
      .post(BASE_URL + 'update-ticket', data, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('-----res entry ', res.data.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          setMsg(res.data.message);
          setData(res.data.data);
          setModalOPen(true);
          // props.navigation.replace('ScanTicket');
        } else if (res.data.status === 'Token is Expired') {
          props.navigation.reset({routes: [{name: 'LoginScreen'}]});
        } else {
          Toast.show(res.data.message);
          setMsg(res.data.message);
          setIsmodalFalse(true);
          // props.navigation.replace('ScanTicket');
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.sysBgColor}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.white,
          alignItems: 'center',
          padding: '5%',
          width: '100%',
        }}>
        <AntDesign
          name="arrowleft"
          color={colors.black}
          size={26}
          onPress={() => props.navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.black,
            marginLeft: '5%',
          }}>
          Details
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {ticketData ? (
          <View style={{flex: 1, padding: '5%'}}>
            <Image
              source={
                ticketData.ride
                  ? {uri: ticketData.ride.image_full}
                  : require('../assets/logo05.png')
              }
              resizeMode="stretch"
              style={{
                height: 120,
                width: 120,
                alignSelf: 'center',
                marginTop: '3%',
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 3,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 'bold',
                color: colors.black,
                marginTop: '5%',
              }}>
              {ticketData.ride ? ticketData.ride.name : ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'flex-start',
                marginTop: '5%',
              }}>
              <Text
                style={{color: colors.gray, fontSize: 16, fontWeight: '400'}}>
                Total Person :{' '}
              </Text>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: '400'}}>
                {ticketData.total_person}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'flex-start',
                marginTop: '2%',
              }}>
              <Text
                style={{color: colors.gray, fontSize: 16, fontWeight: '400'}}>
                Used :{' '}
              </Text>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: '400'}}>
                {ticketData.used === null ? 0 : ticketData.used}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'flex-start',
                marginTop: '2%',
              }}>
              <Text
                style={{color: colors.gray, fontSize: 16, fontWeight: '400'}}>
                Total Amount :{' '}
              </Text>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: '400'}}>
                {ticketData.total_amount}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'flex-start',
                marginTop: '2%',
              }}>
              <Text
                style={{color: colors.gray, fontSize: 16, fontWeight: '400'}}>
                QR Code :{' '}
              </Text>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: '400'}}>
                {ticketData.qr_code}
              </Text>
            </View>

            <View
              style={{
                marginTop: '10%',
                marginHorizontal: '5%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.gray,
              }}>
              <Picker
                // mode="dropdown"
                selectedValue={getpicker}
                style={{
                  color: colors.black,
                }}
                onValueChange={(itemValue, itemIndex) => setPicker(itemValue)}>
                <Picker.Item label="select person" value="" />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
              </Picker>
            </View>

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginTop: '10%',
                backgroundColor: colors.red,
                height: 40,
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => update()}>
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={{color: colors.white, fontWeight: 'bold'}}>
                  Update
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}

        <Modal
          isVisible={isModalOPen}
          onBackButtonPress={() => {
            setModalOPen(false);
            props.navigation.replace('ScanTicket');
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
                setModalOPen(false);
                props.navigation.replace('ScanTicket');
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
          isVisible={ismodalfalse}
          onBackButtonPress={() => {
            setIsmodalFalse(false);
            props.navigation.replace('ScanTicket');
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
                setIsmodalFalse(false);
                props.navigation.replace('ScanTicket');
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
      </ScrollView>
    </View>
  );
}
