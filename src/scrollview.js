import React, { Component } from 'react';
import{ AppRegistry, ScrollView, Image, Text, View } from 'react-native'

class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
      return(
        <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Image source={require('./img/java.png')} />
          <Image source={require('./img/java.png')} />
          <Image source={require('./img/java.png')} />
          <Image source={require('./img/java.png')} />
          <Image source={require('./img/java.png')} />
          <Text style={{fontSize:96}}>If you like</Text>
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/js.png')} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/objectc.png')} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/java.png')} />
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/java.png')} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/objectc.png')} />
          <Image source={require('./img/java.png')} />
          <Image source={require('./img/js.png')} />
          <Image source={require('./img/objectc.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}
AppRegistry.registerComponent('AwesomeProject', () => IScrolledDownAndWhatHappenedNextShockedMe);