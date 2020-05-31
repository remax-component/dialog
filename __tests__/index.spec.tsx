import "expect-puppeteer";
import React from "react";
import Dialog from "../src/";
import { render } from "@remax/runtime";
import Container from "@remax/runtime/cjs/Container";
import { View } from "remax/one";

const p = {
  setData(state: any, callback: Function) {
    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }
    });
  },
  $batchedUpdates(callback: Function) {
    callback();
  },
  $spliceData(state: any, callback: Function) {
    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }
    });
  },
};

describe("Dialog", () => {
  class SimpleDialog extends React.Component {
    render() {
      return <Dialog title="233" visible />;
    }
  }

  it("can render", () => {
    const container = new Container(p);
    render(<SimpleDialog />, container);
    expect(container.root).toMatchSnapshot();
  });
});
