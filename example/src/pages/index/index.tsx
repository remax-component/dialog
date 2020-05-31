import * as React from "react";
import { View, Button } from "remax/one";
import Dialog from "@remax-component/dialog";
import "@remax-component/dialog/dist/assets/index.css";

export default () => {
  const [visible, setVisible] = React.useState(false);
  const footer = (
    <Button
      onTap={(e) => {
        console.log(e);
        setVisible(false);
      }}
    >
      确定
    </Button>
  );
  return (
    <View>
      <Button onTap={() => setVisible(true)}>Normal</Button>
      <Dialog
        maskTransitionName="fade"
        visible={visible}
        title="对话框标题"
        transitionTimeout={200}
        onClose={(e) => {
          console.log(e);
          setVisible(false);
        }}
        footer={footer}
      >
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
