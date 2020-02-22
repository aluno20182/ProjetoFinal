import {ActivityIndicator} from 'react-native';
import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
const LoadingIcon = ({isIconAnimating}) => (
    <ActivityIndicator size="large" color="#0000ff" animating={isIconAnimating} />
  );
class Load extends React.Component {
    state = {

      iconAnimating: true,
      imageURL: '',
    };

  componentDidMount() {
    fetch('./load.gif')
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        this.setState({
          iconAnimating: false,
          imageURL: jsonResponse.message,
        });
      })
      .catch(error => {
        console.log('Error loading dog data: ' + error);
      });
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
          <Image source={{uri:this.state.imageURL}} style={{width:350,height:300}}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Load;