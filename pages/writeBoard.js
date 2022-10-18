import React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
  launchCamera,
  launchImageLibrary,
  includeBase64,
  maxWidth,
  minWidth,
} from 'react-native-image-picker';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {List, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

// import {useFocusEffect} from '@react-navigation/native';
import {
  ActivityIndicator,
  MD2Colors,
  Button,
  Dialog,
  Portal,
} from 'react-native-paper';
import {emoteSalah} from './readBoard';

const WriteBoard = ({route, navigation}) => {
  const [dataRead, setDataRead] = useState();
  const [colorFont, setColorFont] = useState('black');
  const [visible, setVisible] = useState(false);
  const [noteInput, setNoteInput] = useState({
    title: '',
    statusNote: '',
    note: '',
    images: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [emote, setEmote] = useState({
    icon: '',
    Text: '',
  });

  useEffect(() => {
    if (route.params) {
      setIsLoading(true);
      const displayData = async () => {
        console.log(route.params.id);
        const result = await firestore()
          .collection('NoteData')
          .doc(route.params.id)
          .get();
        const datas = result.data();
        setDataRead(datas);
        setNoteInput({
          ...noteInput,
          title: datas.title,
          statusNote: datas.statusNote,
          note: datas.note,
          images: datas.images,
        });
        setIsLoading(false);
      };
      displayData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const addNote = async () => {
    if (
      noteInput.note === '' ||
      noteInput.statusNote === '' ||
      noteInput.title === ''
    ) {
      let haha = emoteSalah[Math.floor(Math.random() * 3)];
      setEmote(haha);
      setVisible(true);
    } else {
      await firestore()
        .collection('NoteData')
        .add(noteInput)
        .then(() => {
          navigation.navigate('Home');
        });
    }
  };

  const updateNote = async () => {
    if (
      noteInput.note === '' ||
      noteInput.statusNote === '' ||
      noteInput.title === ''
    ) {
      let haha = emoteSalah[Math.floor(Math.random() * 3)];
      setEmote(haha);
      setVisible(true);
    } else {
      await firestore()
        .collection('NoteData')
        .doc(route.params.id)
        .update({
          title: noteInput.title,
          statusNote: noteInput.statusNote,
          note: noteInput.note,
          images: noteInput.images,
        })
        .then(() => {
          alert('succes update');
          navigation.navigate('Home');
        });
    }
  };
  // console.log(noteInput);

  const getCamera = async () => {
    const option = {
      // includeBase64: true,
      maxWidth: 150,
      minWidth: 150,
    };
    try {
      await launchCamera(option).then(result => {
        // console.log(result);
        if (result.didCancel) {
          alert('gajadi');
        } else {
          // console.log(typeof result.assets);
          let blob = result.assets;

          setNoteInput({
            ...noteInput,
            images: [...noteInput.images, blob[0]],
          });
        }
      });
    } catch (error) {
      console.log(error, 'hshs');
    }
  };

  const styles = StyleSheet.create({
    textAreaContainer: {
      padding: 5,
    },
    textArea: {
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      textAlign: 'left',
      backgroundColor: 'white',
      color: colorFont,
      borderRadius: 10,
      padding: 10,
    },
  });

  const DeleteImage = id => {
    alert(id);
    const TempImage = noteInput.images.filter(temp => temp.fileName != id);
    console.log(TempImage, 'hah');
    setNoteInput({
      ...noteInput,
      images: TempImage,
    });
  };

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
    <View style={{width: '100%', backgroundColor: 'black', height: '100%'}}>
      <Icon
        name={route.params ? 'refresh-circle' : 'add-circle'}
        style={{position: 'absolute', right: 10, bottom: 10, zIndex: 10}}
        size={70}
        color={route.params ? '#7978FF' : '#FB2576'}
        onPress={() => {
          route.params ? updateNote() : addNote();
        }}
      />

      <ScrollView>
        <View
          style={{
            display: 'flex',

            alignItems: 'center',
          }}>
          <View style={{width: '95%'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginTop: 10,
                fontWeight: 'bold',
              }}>
              Status Note
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}>
              {[
                {name: 'PENTING', colortemp: '#FB2576'},
                {name: 'LUMAYAN', colortemp: '#FEC260'},
                {name: 'GATERLALU SIH', colortemp: '#35858B'},
                {name: 'GAPENTING BET', colortemp: '#5800FF'},
              ].map((val, index) => (
                // <Text>{val.color}</Text>
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                    // paddingHorizontal: 10,
                    paddingRight: 15,
                    backgroundColor: val.colortemp,
                    borderRadius: 20,
                  }}>
                  <RadioButton
                    value={val.name}
                    color="white"
                    uncheckedColor="white"
                    status={
                      noteInput.statusNote === val.name
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      setNoteInput({
                        ...noteInput,
                        statusNote: val.name,
                      })
                    }
                  />
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {val.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={{
                color: 'white',
                marginVertical: 9,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Title...
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: colorFont,
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 10,
              }}
              placeholder="Masukan Title"
              value={noteInput.title}
              multiline={true}
              onChangeText={e => setNoteInput({...noteInput, title: e})}
            />
            <View style={styles.textAreaContainer}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginVertical: 9,
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Note...
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  {[
                    {colortemp: '#FB2576'},
                    {colortemp: '#FEC260'},
                    {colortemp: '#35858B'},
                    {colortemp: '#5800FF'},
                    {colortemp: 'black'},
                  ].map((val, index) => (
                    // <Text>{val.color}</Text>
                    <TouchableOpacity
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: 5,
                        // paddingHorizontal: 10,

                        backgroundColor: 'white',
                        borderRadius: 20,
                      }}>
                      <RadioButton
                        onPress={() => {
                          setColorFont(val.colortemp);
                        }}
                        value={val.colortemp}
                        color={val.colortemp}
                        uncheckedColor={val.colortemp}
                        status={
                          colorFont === val.colortemp ? 'checked' : 'unchecked'
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something..."
                placeholderTextColor="black"
                numberOfLines={noteInput.note.split(`\n`).length + 10}
                value={noteInput.note}
                multiline={true}
                onChangeText={e => setNoteInput({...noteInput, note: e})}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 30,
                  justifyContent: 'space-around',
                }}>
                <Button
                  onPress={getCamera}
                  icon="camera"
                  mode="contained"
                  color="#FB2576">
                  Camera Mpa
                </Button>
                <Button icon="file" mode="contained" color="#35858B">
                  File Mpa
                </Button>
              </View>
              <View>
                {noteInput.images.length != 0 ? (
                  noteInput.images.map((val, index) => (
                    <View
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        style={{position: 'relative', zIndex: 10}}
                        onPress={() => DeleteImage(val.fileName)}>
                        <Icon
                          name="close-circle"
                          style={{
                            top: 20,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            backgroundColor: 'white',
                          }}
                          size={30}
                          color="red"
                        />
                      </TouchableOpacity>
                      <Image
                        style={{
                          width: '100%',
                          height: 400,
                          borderRadius: 10,
                          borderColor: 'black',
                          borderWidth: 1,
                          margin: 3,
                        }}
                        source={{uri: val.uri}}
                      />
                    </View>
                  ))
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      marginTop: 20,
                    }}>
                    Tyda Ada Gambar
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>Dari Bege untuk Mpaa</Text>
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
            <Image source={emote.icon} style={{width: 100, height: 100}} />
            <Text
              style={{
                marginTop: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 17,
                color: 'white',
              }}>
              {/* Mpaa ini kamu yakin mo di apus, siapa tau penting lohhh */}
              {emote.Text}
            </Text>
          </View>

          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>
              <Text style={{color: 'red'}}>Liat Lagi Pokonya</Text>
            </Button>
            {/* <Button
                        onPress={async () => {
                          await firestore()
                            .collection('NoteData')
                            .doc(val.id)
                            .delete()
                            .then(() => {
                              setRefresh(!refresh);
                              setVisible(false);
                            })
                            .catch(err => console.log(err));
                        }}>
                        <Text style={{color: 'green'}}>Yakin</Text>
                      </Button> */}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WriteBoard;
