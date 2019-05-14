import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import { Camera, Permissions } from 'expo';
import Rocket from '../node_modules/rocketbase-npm/src/index';

export default class App extends Component<any, any> {
    static navigationOptions = {
        title: 'Capture'
    };

    state = {
        switchValue: false,
        hasCameraPermission: undefined,
        type: Camera.Constants.Type.back,
        imageuri: '',
        result: undefined,
        url: '',
        processing: false
      };

    camera: any;

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }

      cameraChange = () => {
        this.setState({
          imageuri: '',
          url: '',
          type:
            this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
        });
      }

      snap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          if (photo) {
            this.setState({ imageuri: photo.uri });
          }
        }
      }

      upload = () => {
          this.setState({
              processing: true
          });
          let rocket = new Rocket();
          rocket.land(this.props.navigation.getParam('slug', 'NO SLUG'))
                .then((model: any) => {
                    console.log('Rocket Landed');
                    if (model) {
                        model.run(this.state.imageuri).then((result: any) => {
                            this.setState({
                                imageuri: `data:image/gif;base64,${result.visualization}`,
                                result: result.output,
                                processing: false
                            });
                        });
                    }
                });
      }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === undefined) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return (
            <View>
              <Text>No access to camera</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <View style={styles.switchview}>
                <Text>Show camera</Text>
                <Switch
                  onValueChange={value => {
                    this.setState({ switchValue: value });
                  }}
                  value={this.state.switchValue}
                  style={styles.switch}
                />
              </View>
              {this.state.switchValue ? (
                <View style={styles.cameraview}>
                  {this.state.imageuri !== '' ? (
                    <Image
                      source={{
                        uri: this.state.imageuri
                      }}
                      style={styles.uploadedImage}
                      resizeMode='contain'
                    />
                  ) : (
                    <Camera
                      style={styles.camera}
                      type={this.state.type}
                      ref={(ref: any) => {
                        this.camera = ref;
                      }}
                    >
                      <View style={styles.camerabuttonview}>
                        <TouchableOpacity
                          style={styles.cameraButtons}
                          onPress={this.cameraChange}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              marginBottom: 10,
                              color: 'white'
                            }}
                          >
                            Flip
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Camera>
                  )}
                </View>
              ) : (
                <View style={styles.cameraview}>
                  {this.state.url !== '' ? (
                    <Text>Uploaded url : {this.state.url}</Text>
                  ) : undefined}
                  <Text>Camera off</Text>
                </View>
              )}
              {this.state.switchValue ? (
                <View style={styles.buttonsView}>
                  {this.state.imageuri === '' ? (
                    <View style={styles.captureButtonView}>
                      <TouchableOpacity
                        style={styles.cameraButtons}
                        onPress={this.snap}
                      >
                        <Text
                          style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                        >
                          Capture
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : undefined}
                  <View style={styles.captureButtonView}>
                  {this.state.result ?
                    <ScrollView style={styles.resultView}>
                        <Text>
                            {JSON.stringify(this.state.result)}
                        </Text>
                    </ScrollView>
                    :
                    <TouchableOpacity
                      style={styles.cameraButtons}
                      onPress={this.upload.bind(this)}
                      disabled={this.state.processing}
                    >
                      <Text
                        style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                      >
                        {this.state.processing ? 'PROCESSING' : '🚀 Upload'}
                      </Text>
                    </TouchableOpacity>
                  }
                  </View>
                </View>
              ) : undefined}
            </View>
          );
        }
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1dd1a1',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    switchview: {
    //   marginTop: 15,
      backgroundColor: 'white',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      marginBottom: 5
    },
    switch: {
      padding: 5
    },
    cameraview: {
      height: 350,
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    camera: {
      height: '95%',
      width: '95%',
      backgroundColor: 'white',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    camerabuttonview: {
      height: '100%',
      backgroundColor: 'transparent'
    },
    cameraButtons: {
      borderColor: '#fff',
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      margin: 5
    },
    captureButtonView: {
      height: 200
    },
    buttonsView: {
      height: 200,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    uploadedImage: {
      height: '90%',
      width: '90%',
      padding: 10
    },
    resultView: {
        padding: 10
    }
  });
