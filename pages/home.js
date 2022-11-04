import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  MD2Colors,
  Dialog,
  Portal,
  Button,
} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import Bege from '../assets/boyfriend.jpg';
import {emoteDelete} from './readBoard';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [mod, setMod] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const displayData = async () => {
      const result = await firestore().collection('NoteData').get();
      setData(
        result.docs.map(doc => {
          return Object.assign({id: doc.id}, doc.data());
        }),
      );
      setIsLoading(false);
    };
    displayData();
  }, [isFocused, refresh]);

  const haha = emoteDelete[Math.floor(Math.random() * 3)];
  // console.log(haha);
  return isLoading ? (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <ActivityIndicator size={50} animating={true} color={'red'} />
    </View>
  ) : (
    <View>
      <ScrollView style={style.Container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '80%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}>
            {data.map((val, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  marginVertical: 20,
                  height: 200,
                  borderRadius: 10,
                  display: 'flex',
                }}>
                <Portal>
                  <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <View
                      style={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        Dari Bege untuk Mpaas
                      </Text>
                    </View>

                    <View
                      // key={indev}
                      style={{
                        backgroundColor: '#FB2576',
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={haha.icon}
                        style={{width: 100, height: 100}}
                      />
                      <Text
                        style={{
                          marginTop: 20,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: 17,
                          color: 'white',
                        }}>
                        {/* Mpaa ini kamu yakin mo di apus, siapa tau penting lohhh */}
                        {haha.Text}
                      </Text>
                    </View>
                    <Dialog.Actions>
                      <Button onPress={() => setVisible(false)}>
                        <Text style={{color: 'red'}}>Engga</Text>
                      </Button>
                      <Button
                        onPress={async () => {
                          // alert(idDelete);
                          await firestore()
                            .collection('NoteData')
                            .doc(idDelete)
                            .delete()
                            .then(() => {
                              setRefresh(!refresh);
                              setVisible(false);
                            })
                            .catch(err => console.log(err));
                        }}>
                        <Text style={{color: 'green'}}>Yakin</Text>
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WriteBoard', {id: val.id})
                  }
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    height: '30%',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    backgroundColor:
                      val.statusNote === 'PENTING'
                        ? '#FB2576'
                        : val.statusNote === 'LUMAYAN'
                        ? '#FEC260'
                        : val.statusNote === 'GATERLALU SIH'
                        ? '#35858B'
                        : '#5800FF',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingVertical: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Title : {val.status}
                    </Text>
                    <Text style={{color: 'white'}}>
                      {val.title.length > 15
                        ? val.title.slice(0, 15) + '...'
                        : val.title}
                    </Text>
                    {/* <Text style={{color: 'white'}}>{val.id}</Text> */}
                  </View>
                  <View style={{marginRight: 10}}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      {val.statusNote}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    // backgroundColor: 'pink',
                    width: '100%',
                    height: 140,
                    padding: 10,

                    borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <ScrollView scrollEnabled={true}>
                    <Text style={{textAlign: 'left', color: 'black'}}>
                      {/* {val.note.length > 120 */}
                      {/* ? val.note.slice(0, 120) + '...' */}
                      {val.note}
                    </Text>
                  </ScrollView>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    {/* {val.note.length > 120 ? (
                      <Text
                        onPress={() =>
                          navigation.navigate('WriteBoard', {id: val.id})
                        }
                        style={{
                          marginTop: 10,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        lihat selengkapnya...
                      </Text>
                    ) : null} */}
                    <Icon
                      onPress={() => {
                        setVisible(true);

                        setIdDelete(val.id);
                      }}
                      name="remove-circle"
                      size={30}
                      color="#FB2576"></Icon>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Icon
        name="add-circle"
        style={{position: 'absolute', right: 10, bottom: 40}}
        size={50}
        color={'#38E54D'}
        onPress={() => navigation.navigate('WriteBoard')}
      />
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    backgroundColor: '#100F0F',
    width: '100%',
    height: '100%',
  },
  fontWhite: {
    color: 'white',
  },
});

export default Home;
