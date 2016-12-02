import React, { Component } from 'react';
import { AppRegistry, Image, Text, View } from 'react-native';

class AwesomeProject extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}} />
    );
  }
}

class Greeting extends Component{
    render(){
        return (
            <Text>Hello {this.props.name}</Text>
        );   
    }
}

class LotsOfGreetings extends Component{
    render(){
        return (
        // View 常用作其他组件的容器，来帮助控制布局和样式。
            <View style={{alignItems:'center'}}>
            <Greeting name="JavaScript"/>
            <Greeting name="JAVA"/>
            <Greeting name="Android"/>
            <Greeting name="Python"/>
            <Greeting name="Kotline"/>
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
/**
    Props（属性）
用于定制组件创建时的各种参数称为props(属性),以Image为例，创建图片时传入一个名为source的props来指定图片显示的地址，以及使用style的props来控制尺寸。
    注意{pic}外围有一层括号，我们需要用括号来把pic这个变量嵌入到JSX语句中。括号的意思是括号内部为一个js变量或表达式，需要执行后取值。因此我们可以把任意合法的JavaScript表达式通过括号嵌入到JSX语句中。
    自定义的组件也可以使用props。通过在不同的场景使用不同的属性定制，可以尽量提高自定义组件的复用范畴。只需在render函数中引用this.props，然后按需处理即可。



*/