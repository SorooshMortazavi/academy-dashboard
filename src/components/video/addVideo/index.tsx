import React from "react";
import Content from "../../partials/Content";
import AddVideo from "./AddVideo";
import Context from "../context";

export default function index() {
  return (
    <Content title="اضافه کردن ویدیو جدید">
      <Context>
        <AddVideo />
      </Context>
    </Content>
  );
}
