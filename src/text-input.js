'use strict';
import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, StyleSheet,View } from 'react-native';

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}

class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}

class UselessTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
     <View style={{
       backgroundColor: this.state.text,
       borderBottomColor: '#000000',
       borderBottomWidth: 1 }}
     >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
       />
     </View>
    );
  }
}

var TextEventsExample = React.createClass({
    // 这种初始化state的方式不建议使用，推荐state.js的写法。
  getInitialState: function() {
    return {
      curText: '<No Event>',
      prevText: '<No Event>',
      prev2Text: '<No Event>',
    };
  },

  updateText: function(text) {
    this.setState((state) => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
      };
    });
  },

  render: function() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter text to see events"
          autoCorrect={false}
          onFocus={() => this.updateText('onFocus')}
          onBlur={() => this.updateText('onBlur')}
          onChange={(event) => this.updateText(
            'onChange text: ' + event.nativeEvent.text
          )}
          onEndEditing={(event) => this.updateText(
            'onEndEditing text: ' + event.nativeEvent.text
          )}
          onSubmitEditing={(event) => this.updateText(
            'onSubmitEditing text: ' + event.nativeEvent.text
          )}
          style={styles.singleLine}
        />
        <Text style={styles.eventLabel}>
          {this.state.curText}{'\n'}
          (prev: {this.state.prevText}){'\n'}
          (prev2: {this.state.prev2Text})
        </Text>
      </View>
    );
  }
});

//AppRegistry.registerComponent('AwesomeProject', () => TextEventsExample);

class AutoExpandingTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', height: 0};
  }
  render() {
    return (
      <TextInput
        multiline={true}
        onChange={(event) => {
          this.setState({
            text: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height,
          });
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
      />
    );
  }
}

//AppRegistry.registerComponent('AwesomeProject', () => AutoExpandingTextInput);

class RewriteExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    var limit = 20;
    var remainder = limit - this.state.text.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          maxLength={limit}
          onChangeText={(text) => {
            this.setState({text});
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, {color: remainderColor}]}>
          {remainder}
        </Text>
      </View>
    );
  }
}

// AppRegistry.registerComponent('AwesomeProject', () => RewriteExample);

class TokenizedTextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Hello #World'};
  }
  render() {

    //define delimiter
    let delimiter = /\s+/;

    //split string
    let _text = this.state.text;
    let token, index, parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    //highlight hashtags
    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>;
      } else {
        return text;
      }
    });

    return (
      <View>
        <TextInput
          multiline={true}
          style={styles.multiline}
          onChangeText={(text) => {
            this.setState({text});
          }}>
          <Text>{parts}</Text>
        </TextInput>
      </View>
    );
  }
}

// AppRegistry.registerComponent('AwesomeProject', () => TokenizedTextExample);

var BlurOnSubmitExample = React.createClass({
  focusNextField(nextField) {
    this.refs[nextField].focus();
  },

  render: function() {
    return (
      <View>
        <TextInput
          ref="1"
          style={styles.singleLine}
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={styles.singleLine}
          keyboardType="email-address"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <TextInput
          ref="3"
          style={styles.singleLine}
          keyboardType="url"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('4')}
        />
        <TextInput
          ref="4"
          style={styles.singleLine}
          keyboardType="numeric"
          placeholder="blurOnSubmit = false"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('5')}
        />
        <TextInput
          ref="5"
          style={styles.singleLine}
          keyboardType="numbers-and-punctuation"
          placeholder="blurOnSubmit = true"
          returnKeyType="done"
        />
      </View>
    );
  }
});

AppRegistry.registerComponent('AwesomeProject', () => BlurOnSubmitExample);

var styles = StyleSheet.create({
  multiline: {
    height: 60,
    fontSize: 16,
    padding: 4,
    marginBottom: 10,
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
  },
  singleLineWithHeightTextInput: {
    height: 30,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

exports.title = '<TextInput>';
exports.description = 'Single and multi-line text inputs.';
exports.examples = [
  {
    title: 'Auto-focus',
    render: function() {
      return (
        <TextInput
          autoFocus={true}
          style={styles.singleLine}
          accessibilityLabel="I am the accessibility label for text input"
        />
      );
    }
  },
  {
    title: "Live Re-Write (<sp>  ->  '_')",
    render: function() {
      return <RewriteExample />;
    }
  },
  {
    title: 'Auto-capitalize',
    render: function() {
      var autoCapitalizeTypes = [
        'none',
        'sentences',
        'words',
        'characters',
      ];
      var examples = autoCapitalizeTypes.map((type) => {
        return (
          <TextInput
            key={type}
            autoCapitalize={type}
            placeholder={'autoCapitalize: ' + type}
            style={styles.singleLine}
          />
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Auto-correct',
    render: function() {
      return (
        <View>
          <TextInput
            autoCorrect={true}
            placeholder="This has autoCorrect"
            style={styles.singleLine}
          />
          <TextInput
            autoCorrect={false}
            placeholder="This does not have autoCorrect"
            style={styles.singleLine}
          />
        </View>
      );
    }
  },
  {
    title: 'Keyboard types',
    render: function() {
      var keyboardTypes = [
        'default',
        'email-address',
        'numeric',
        'phone-pad',
      ];
      var examples = keyboardTypes.map((type) => {
        return (
          <TextInput
            key={type}
            keyboardType={type}
            placeholder={'keyboardType: ' + type}
            style={styles.singleLine}
          />
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Blur on submit',
    render: function(): ReactElement { return <BlurOnSubmitExample />; },
  },
  {
    title: 'Event handling',
    render: function(): ReactElement { return <TextEventsExample />; },
  },
  {
    title: 'Colors and text inputs',
    render: function() {
      return (
        <View>
          <TextInput
            style={[styles.singleLine]}
            defaultValue="Default color text"
          />
          <TextInput
            style={[styles.singleLine, {color: 'green'}]}
            defaultValue="Green Text"
          />
          <TextInput
            placeholder="Default placeholder text color"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="Red placeholder text color"
            placeholderTextColor="red"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="Default underline color"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="Blue underline color"
            style={styles.singleLine}
            underlineColorAndroid="blue"
          />
          <TextInput
            defaultValue="Same BackgroundColor as View "
            style={[styles.singleLine, {backgroundColor: 'rgba(100, 100, 100, 0.3)'}]}>
            <Text style={{backgroundColor: 'rgba(100, 100, 100, 0.3)'}}>
              Darker backgroundColor
            </Text>
          </TextInput>
          <TextInput
            defaultValue="Highlight Color is red"
            selectionColor={'red'}
            style={styles.singleLine}>
          </TextInput>
        </View>
      );
    }
  },
  {
    title: 'Text input, themes and heights',
    render: function() {
      return (
        <TextInput
          placeholder="If you set height, beware of padding set from themes"
          style={[styles.singleLineWithHeightTextInput]}
        />
      );
    }
  },
  {
    title: 'fontFamily, fontWeight and fontStyle',
    render: function() {
      return (
        <View>
          <TextInput 
            style={[styles.singleLine, {fontFamily: 'sans-serif'}]}
            placeholder="Custom fonts like Sans-Serif are supported"
          />
          <TextInput 
            style={[styles.singleLine, {fontFamily: 'sans-serif', fontWeight: 'bold'}]}
            placeholder="Sans-Serif bold"
          />
          <TextInput 
            style={[styles.singleLine, {fontFamily: 'sans-serif', fontStyle: 'italic'}]}
            placeholder="Sans-Serif italic"
          />
          <TextInput 
            style={[styles.singleLine, {fontFamily: 'serif'}]}
            placeholder="Serif"
          />
        </View>
      );
    }
  },
  {
    title: 'Passwords',
    render: function() {
      return (
        <View>
          <TextInput
            defaultValue="iloveturtles"
            secureTextEntry={true}
            style={styles.singleLine}
          />
          <TextInput
            secureTextEntry={true}
            style={[styles.singleLine, {color: 'red'}]}
            placeholder="color is supported too"
            placeholderTextColor="red"
          />
        </View>
      );
    }
  },
  {
    title: 'Editable',
    render: function() {
      return (
        <TextInput
           defaultValue="Can't touch this! (>'-')> ^(' - ')^ <('-'<) (>'-')> ^(' - ')^"
           editable={false}
           style={styles.singleLine}
         />
      );
    }
  },
  {
    title: 'Multiline',
    render: function() {
      return (
        <View>
          <TextInput
            autoCorrect={true}
            placeholder="multiline, aligned top-left"
            placeholderTextColor="red"
            multiline={true}
            style={[styles.multiline, {textAlign: "left", textAlignVertical: "top"}]}
          />
          <TextInput
            autoCorrect={true}
            placeholder="multiline, aligned center"
            placeholderTextColor="green"
            multiline={true}
            style={[styles.multiline, {textAlign: "center", textAlignVertical: "center"}]}
          />
          <TextInput
            autoCorrect={true}
            multiline={true}
            style={[styles.multiline, {color: 'blue'}, {textAlign: "right", textAlignVertical: "bottom"}]}>
            <Text style={styles.multiline}>multiline with children, aligned bottom-right</Text>
          </TextInput>
        </View>
      );
    }
  },
  {
    title: 'Fixed number of lines',
    platform: 'android',
    render: function() {
      return (
        <View>
          <TextInput numberOfLines={2}
            multiline={true}
            placeholder="Two line input"
          />
          <TextInput numberOfLines={5}
            multiline={true}
            placeholder="Five line input"
          />
        </View>
      );
    }
  },
  {
    title: 'Auto-expanding',
    render: function() {
      return (
        <View>
          <AutoExpandingTextInput
            placeholder="height increases with content"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render: function() {
      return <TokenizedTextExample />;
    }
  },
  {
    title: 'Return key',
    render: function() {
      var returnKeyTypes = [
        'none',
        'go',
        'search',
        'send',
        'done',
        'previous',
        'next',
      ];
      var returnKeyLabels = [
        'Compile',
        'React Native',
      ];
      var examples = returnKeyTypes.map((type) => {
        return (
          <TextInput
            key={type}
            returnKeyType={type}
            placeholder={'returnKeyType: ' + type}
            style={styles.singleLine}
          />
        );
      });
      var types = returnKeyLabels.map((type) => {
        return (
          <TextInput
            key={type}
            returnKeyLabel={type}
            placeholder={'returnKeyLabel: ' + type}
            style={styles.singleLine}
          />
        );
      });
      return <View>{examples}{types}</View>;
    }
  },
];

//AppRegistry.registerComponent('AwesomeProject', () => UselessTextInputMultiline);
/**
    注意有些属性仅在multiline为true或者为false的时候有效。此外，当multiline=false时，为元素的某一个边添加边框样式（例如：borderBottomColor，borderLeftWidth等）将不会生效。为了能够实现效果你可以使用一个View来包裹TextInput。
    autoCapitalize enum('none', 'sentences', 'words', 'characters') 

控制TextInput是否要自动将特定字符切换为大写：

characters: 所有的字符。
words: 每个单词的第一个字符。
sentences: 每句话的第一个字符（默认）。
none: 不自动切换任何字符为大写。
autoCorrect bool 

如果为false，会关闭拼写自动修正。默认值是true。

autoFocus bool 

如果为true，在componentDidMount后会获得焦点。默认值为false。

blurOnSubmit bool 

如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。注意：对于多行输入框来说，如果将blurOnSubmit设为true，则在按下回车键时就会失去焦点同时触发onSubmitEditing事件，而不会换行。

defaultValue string 

提供一个文本框中的初始值。当用户开始输入的时候，值就可以改变。

在一些简单的使用情形下，如果你不想用监听消息然后更新value属性的方法来保持属性和状态同步的时候，就可以用defaultValue来代替。

editable bool 

如果为false，文本框是不可编辑的。默认值为true。

keyboardType enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') 

决定弹出的何种软键盘的，譬如numeric（纯数字键盘）。

这些值在所有平台都可用：

default
numeric
email-address
maxLength number 

限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。

multiline bool 

如果为true，文本框中可以输入多行文字。默认值为false。

onBlur function 

当文本框失去焦点的时候调用此回调函数。

onChange function 

当文本框内容变化时调用此回调函数。

onChangeText function 

当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。

onEndEditing function 

当文本输入结束后调用此回调函数。

onFocus function 

当文本框获得焦点的时候调用此回调函数。

onLayout function 

当组件挂载或者布局变化的时候调用，参数为{x, y, width, height}。

onSubmitEditing function 

此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此属性不可用。

placeholder string 

如果没有任何文字输入，会显示此字符串。

placeholderTextColor string 

占位字符串显示的文字颜色。

secureTextEntry bool 

如果为true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为false。

selectTextOnFocus bool 

如果为true，当获得焦点的时候，所有的文字都会被选中。

selectionColor string 

设置输入框高亮时的颜色（在iOS上还包括光标）

style Text#style 

译注：这意味着本组件继承了所有Text的样式。

value string 

文本框中的文字内容。

TextInput是一个受约束的(Controlled)的组件，意味着如果提供了value属性，原生值会被强制与value属性保持一致。在大部分情况下这都工作的很好，不过有些情况下会导致一些闪烁现象——一个常见的原因就是通过不改变value来阻止用户进行编辑。如果你希望阻止用户输入，可以考虑设置editable={false}；如果你是希望限制输入的长度，可以考虑设置maxLength属性，这两个属性都不会导致闪烁。

iosclearButtonMode enum('never', 'while-editing', 'unless-editing', 'always') 

是否要在文本框右侧显示“清除”按钮。

iosclearTextOnFocus bool 

如果为true，每次开始输入的时候都会清除文本框的内容。

iosenablesReturnKeyAutomatically bool 

如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false。

ioskeyboardAppearance enum('default', 'light', 'dark') 

指定键盘的颜色。

iosonKeyPress function 

当一个键被按下的时候调用此回调。被按下的键会作为参数传递给回调函数。会在onChange之前调用。

iosreturnKeyType enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call')

决定“确定”按钮显示的内容。

iosselectionState DocumentSelectionState 

参见DocumentSelectionState.js，可以控制一个文档中哪段文字被选中的状态。

androidnumberOfLines number 

设置输入框的行数。当multiline设置为true时使用它，可以占据对应的行数。

androidunderlineColorAndroid string 

文本框的下划线颜色(译注：如果要去掉文本框的边框，请将此属性设为透明transparent)。

方法
isFocused(): boolean 

返回值表明当前输入框是否获得了焦点。

clear() 

清空输入框的内容。
*/