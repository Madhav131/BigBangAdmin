import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
  View,
  Button,
  Image,
  AudioPlayer,
  AsyncStorage,
  Platform,
  Linking,
  BackHandler,
} from 'react-native';
import colors from './utils/colors';
import Fonts from './utils/Fonts';

import metrics from './utils/Metrics';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('screen');
const SplashSreen = props => {
  const [_ismodalvisible, setModalVisible] = useState(false);
  const [isNeededUpdate, setNeedUpdate] = useState(false);

  useEffect(async () => {
    // SoundPlayer.playSoundFile("sound", "mp3");
    var islogins = await AsyncStorage.getItem('isLogin');
    var role = await AsyncStorage.getItem('role')
    // console.log(islogins);

    setTimeout(() => {
      if (islogins == 'true') {
        if (role === 2 || role === "2")
          props.navigation.replace('ScanTicket');
        else if (role === 3 || role === "3")
          props.navigation.replace('ScanEntry');
        else
          props.navigation.replace('LoginScreen');
      } else {
        props.navigation.replace('LoginScreen');
      }
      // props.navigation.replace('LoginScreen');
    }, 2000);
  }, []);

  const exitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.container}>
        <Animatable.View
          animation="bounceIn"
          style={{
            marginTop: '25%',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Image
            source={require('../Screen/assets/logo05.png')}
            style={{ width: width * 1, height: height * 0.6, marginTop: 55 }}
            resizeMode="contain"
          />
          {/* <View style={{height: metrics.HEIGHT * 0.09}}>
            <Text
              style={{color: colors.golden, fontSize: metrics.HEIGHT * 0.09}}>
              BIGBANG
            </Text>
          </View> */}
          {/* <View style={{marginTop: '3%'}}>
            <Text
              style={{color: colors.black, fontSize: metrics.HEIGHT * 0.03}}>
              #Games #Food #Entertaiment
            </Text>
          </View> */}
        </Animatable.View>
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
        isVisible={_ismodalvisible}
        // isVisible={true}
        onBackButtonPress={() => {
          this.exitApp();
        }}>
        <View
          style={{
            height: metrics.HEIGHT * 0.31,
            backgroundColor: colors.black,
            padding: '5%',
            borderRadius: 5,
            width: '100%',
            borderWidth: 1,
            borderColor: colors.secondryColor,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: Fonts.FontsType.OpenSans_Bold,
              color: colors.golden,
            }}>
            UPDATE
          </Text>

          <Text
            style={{
              fontSize: 15,
              marginTop: '7%',
              fontFamily: Fonts.FontsType.OpenSans_Semibold,
              color: colors.white,
            }}>
            TRP is Updated!!!{' '}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: '3%',
              fontFamily: Fonts.FontsType.OpenSans_Regular,
              color: colors.white,
            }}>
            To use this app, download the latest version{' '}
          </Text>

         
          <View
            style={{
              marginTop: '10%',
              flexDirection: 'row',
              justifyContent: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.trpapp',
                )
              }
              style={{
                height: 40,
                width: '35%',
                borderRadius: 20,
                backgroundColor: colors.golden,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  color: colors.white,
                  fontFamily: Fonts.FontsType.OpenSans_Semibold,
                }}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => exitApp()}
              style={{
                height: 40,
                width: '35%',
                borderRadius: 20,
                backgroundColor: colors.golden,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  color: colors.white,
                  fontFamily: Fonts.FontsType.OpenSans_Semibold,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
      
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};
export default SplashSreen;

const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
