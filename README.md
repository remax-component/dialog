# rmc-dialog

Remax 的对话框组件

![image](https://user-images.githubusercontent.com/20639676/83356165-baa4b600-a396-11ea-8438-52bfca2f1115.png)

## 安装

```sh
yarn add @remax-component/dialog
# 或者
npm i @remax-component/dialog
```

## 使用

```js
import React from "react";
import { View } from "remax/one";
import Checkbox from "@remax-component/dialog";
import "@remax-component/dialog/dist/assets/index.css"; // 亦可引入其它样式

export default () => {
  return (
    <View>
      <Dialog title="一个标题" visible>
        <View style={{ height: "100PX", overflow: "scroll" }}>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
          <View>Scroll</View>
        </View>
      </Dialog>
    </View>
  );
};
```

## API

| 名称                                         | 类型                                 | 默认值         | 描述                                                                                                         |
| -------------------------------------------- | ------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------ |
| prefixCls                                    | `string`                             | `'rmc-dialog'` | className 前缀                                                                                               |
| zIndex                                       | `number | undefined`                 | `undefined`    | 对话框 zIndex;                                                                                               |
| title 和 footer 和 children                  | `ReactNode`                          | `null`         | 对话框各部分的内容                                                                                           |
| transitionName 和 maskTransitionName         | `string|undefined`                   | `undefined`    | 对话框内容和底层遮罩的 CSS 动画名称，见                                                                      |
| transitionDuration 和 maskTransitionDuration | `number | undefined`                 | `undefined`    | 对话框内容和遮罩动画的过渡时间。如果只指定`transitionDuration`，`maskTransitionDuration`会使用与前者相同的值 |
| maskClosable                                 | `boolean | undefined`                | `true`         | 点击遮罩层是否可关闭                                                                                         |
| onClose                                      | `((e: TapEvent) => any) | undefined` | `undefined`    | 引起关闭的事件触发时的回调（目前仅有点击遮罩会触发)                                                          |

## TODO

- [ ]补充更多测试用例
- [ ] 网页端 Demo

## License

MIT
