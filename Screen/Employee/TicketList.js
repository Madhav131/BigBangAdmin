import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../utils/const';
import colors from '../utils/colors';

export default function TicketList(props) {
  const [ticket_list, setList] = useState([]);
  const [token, setToken] = useState('');
  const [isloading, SetLoading] = useState(false);

  //   useEffect(() => {
  //     AsyncStorage.getItem('token').then(value => {
  //       if (value) {
  //         setToken(value);
  //         console.log('---', value);
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getTicketList();
    });

    return unsubscribe;
  }, [props]);

  const getTicketList = async () => {
    const Token = await AsyncStorage.getItem('token');
    SetLoading(true);
    axios
      .get(BASE_URL + 'get-ticket-list', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success === 1) {
          setList(res.data.data);
          SetLoading(false);
        } else if (res.data.status === 'Token is Expired') {
          SetLoading(false);
          props.navigation.reset({routes: [{name: 'LoginScreen'}]});
          AsyncStorage.clear();
        }
      })
      .catch(err => {
        console.log(err);
        SetLoading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: '5%',
          width: '100%',
          backgroundColor: colors.white,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.black}}>
          Ticket List
        </Text>
        {/* <Entypo name='log-out' size={25} color={colors.black}
                    onPress={() => logout()}
                /> */}
      </View>

      <View style={{marginTop: '2%'}}>
        {isloading === true ? (
          <ActivityIndicator
            color={colors.themecolor}
            size="large"
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        ) : (
          <FlatList
            data={ticket_list}
            refreshControl={
              <RefreshControl
                refreshing={isloading}
                onRefresh={getTicketList}
              />
            }
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginHorizontal: '4%',
                    marginVertical: '2%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    backgroundColor: colors.white,
                    elevation: 2,
                    borderRadius: 3,
                    padding: '4%',
                  }}>
                  {/* <Image source={{ uri: item.ride.image_full }}
                                    style={{ height: 100, width: 100 }} /> */}
                  <View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                      <Text style={{color: colors.gray}}>Ride Name : </Text>
                      <Text style={{color: colors.black}}>
                        {item.ride ? item.ride.name : ''}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginTop: 4,
                      }}>
                      <Text style={{color: colors.gray}}>Total Person : </Text>
                      <Text style={{color: colors.black}}>
                        {item.total_person}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginTop: 4,
                      }}>
                      <Text style={{color: colors.gray}}>Used : </Text>
                      <Text style={{color: colors.black}}>
                        {item.used === null ? 0 : item.used}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginTop: 4,
                      }}>
                      <Text style={{color: colors.gray}}>Total Amount : </Text>
                      <Text style={{color: colors.black}}>
                        {item.total_amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginTop: 4,
                      }}>
                      <Text style={{color: colors.gray}}>QR Code : </Text>
                      <Text style={{color: colors.black}}>{item.qr_code}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    marginTop: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: 18,
                    }}>
                    No DATA
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}
