import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class AwesomeProject extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

// 注意，这里用引号括起来的'AwesomeProject'必须和你init创建的项目名一致
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
// 示例代码中的import、from、class、extends、以及() =>箭头函数等新语法都是ES2015中的特性
// jsx语法
// <Text>Hello world!</Text>, 其中<Text>是内置的组件。
/**
    上面的代码定义了一个名为AwesomeProject的新组件（Component），并且使用了名为AppRegistry的内置模块进行了“注册”操作。
在编写ReactNative应用时，App的最终界面，其实也就是各式各样的组件的组合。组件本身结构唯一必须的就是在render方法中返回一些用于渲染结构的JSX语句。
AppRegistry模块则是用来告知React Native哪一个组件被注册为整个应用的根容器。一般在整个应用里AppRegistry.registerComponent这个方法只会调用一次。
*/