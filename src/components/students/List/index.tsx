import React from "react";
import MUIDataTable from "mui-datatables";
import { connect } from "http2";
import ConfirmDialog from "../../partials/ConfirmDialog";

interface Data {
  name: string;
  mobile: string;
  email: string;
  createdAt: string;
  coursesCount: number;
}
interface ListProps {
  rows: Data[];
  deleteItems: Function;
}
interface IDialogState {
  open: boolean;
  data: string[];
}
const handleCellClick = (e: any) => {
  console.log(e);
};

export default function List({ rows, deleteItems }: ListProps) {
  const [dialogOpen, setDialogOpen] = React.useState<IDialogState>({
    open: false,
    data: [],
  });

  const handleRowsDelete = (e: any, data: any): void | false => {
    let emailData:string[]=[]
    e.data.forEach((element:any) => {
     emailData.push(rows[element['dataIndex']].email) 
    });
    setDialogOpen({ open: true, data:emailData });
    return false;
  };

  const handleDialog = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteItems(dialogOpen.data);
    }
    setDialogOpen({ data: [], open: false });
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <ConfirmDialog
        dialogTitle="پاک کردن دانشجو"
        dialogBody={`برای پاک کردن ${dialogOpen.data.length} دانشجو اطمینان دارید`}
        isOpen={dialogOpen.open}
        handleConfirm={handleDialog}
      />
      <MUIDataTable
        title={"دانشجو ها"}
        data={rows}
        columns={[
          { label: "نام", name: "name" },
          { label: "موبایل", name: "mobile" },
          { label: "ایمیل", name: "email" },
          { label: "تاریخ ایجاد", name: "createdAt" },
          { label: "تعداد دوره ها", name: "coursesCount" },
        ]}
        options={{
          onRowClick: handleCellClick,
          onRowsDelete: handleRowsDelete,
          textLabels: {
            body: {
              noMatch: "متاسفانه موردی یافت نشد",
              toolTip: "Sort",
              columnHeaderTooltip: (column) => `مرتب سازی برای ${column.label}`,
            },
            pagination: {
              next: "صفحه ی بعدی",
              previous: "صفحه ی قبلی",
              rowsPerPage: "تعداد آیتم ها",
              displayRows: "از",
            },
            toolbar: {
              search: "جستجو",
              downloadCsv: "دانلود CSV",
              print: "چاپ",
              viewColumns: "ستون ها",
              filterTable: "فیلتر ها",
            },
            filter: {
              all: "همه",
              title: "فیلتر ها",
              reset: "بازنشانی",
            },
            viewColumns: {
              title: "نمایش ستون ها",
              titleAria: "نمایش/مخفی",
            },
            selectedRows: {
              text: "ستون انتخاب شد",
              delete: "حذف",
              deleteAria: "حذف شود",
            },
          },
          rowsPerPageOptions: [10, 25, 50],
        }}
      />
    </div>
  );
}
