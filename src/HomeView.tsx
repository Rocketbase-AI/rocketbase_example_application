import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class App extends Component<any, any> {
    static navigationOptions = {
        title: 'Home'
    };

    state = {
        slug: undefined
    };

    handleSubmit() {
        if (this.state.slug) {
            this.props.navigation.navigate('Capture', {
                slug: this.state.slug
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h2 style={styles.title}>RocketBase </Text>
                <Text h2 style={styles.title}>Example App</Text>
                <Text h3 style={styles.inputTitle}>Enter Rocket Name</Text>
                <TextInput
                    style={styles.rocketSlugInput}
                    placeholder='Enter a valid Rocket Slug'
                    onChangeText={(text) => this.setState({slug: text})}
                />
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={this.handleSubmit.bind(this)}>
                    <Ionicons
                        size={200}
                        name='ios-camera'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1dd1a1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30
  },
  title: {
      height: 50
  },
  inputTitle: {
      height: 40
  },
  rocketSlugInput: {
      height: 60,
      width: '80%'
  },
  cameraButton: {
      alignItems: 'center'
  }
});
