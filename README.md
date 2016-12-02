###导读
这是一篇关于react学习的文章，进而会对react native以及weex进行相关实践。

react相关： http://www.ruanyifeng.com/blog/2015/03/react.html
ECMAScript 6 入门： http://es6.ruanyifeng.com/#README
react native参考资料： http://reactnative.cn/
weex参考资料： https://github.com/alibaba/weex

#react native本地浏览器调试
react-native start
输入http://localhost:8081/index.android.bundle?platform=android 看看是否可以看到打包后的脚本(js代码)。如果能看到脚本文件内容说明packager已经启动。
保持packager开启，打开另外一个命令行窗口，然后再工程目录下运行
react-native run-android
就可以在模拟器或者真机上看到应用启动了。