import React from "react";
import Http from "../../services/Http";
import Content from "../partials/Content";
import StudentList from "./List";
import Notify from "../partials/Notify";

export default function Students() {
  const axiosHttp = new Http();
  const [students, setStudents] = React.useState<any>([]);
  const [notifyShow, setNotifyShow] = React.useState<any>({
    enable: false,
    severity: "",
    body: "",
  });

  function getStudents() {
    axiosHttp
      .get<any>("api/v1/student")
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        //TODO: show error message to user.
        console.log("error");
      });
  }
  React.useEffect(() => {
    getStudents();
  }, []);

  const handleDeleteItems = (itemsIndex: number[]) => {
    axiosHttp
      .delete<any>("api/v1/student/delete", {
        data: {
          emails: itemsIndex,
        },
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setNotifyShow({
          enable: true,
          severity: "success",
          body: `تعداد ${res.data.deletedCount} دانشجو با موفقیت حذف شدند`,
        });
        resetNotifyShow();
        getStudents();
      })
      .catch((err) => {
        setNotifyShow({
          enable: true,
          severity: "error",
          body: "عملیات حذف موفقیت آمیز نبود",
        });
        resetNotifyShow();
      });
  };

  function resetNotifyShow() {
    setTimeout(
      () =>
        setNotifyShow({
          enable: false,
          severity: "warning",
          body: "",
        }),
      2000
    );
  }
  return (
    <Content title="لیست دانشجو ها">
      {notifyShow.enable && (
        <Notify severity={notifyShow.severity} body={notifyShow.body} />
      )}
      <StudentList rows={students} deleteItems={handleDeleteItems} />
    </Content>
  );
}
