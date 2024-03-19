
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { Table, Tag } from "antd";
import {React, useState} from "react";

import useRequireAuth from "../useRequireAuth";
 
const Order_Information = () => {

  useRequireAuth("/");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 

  const columns = [
    {
      title: 'Order ID',
      width: 100,
      dataIndex: 'order_id',
      key: '1',
      fixed: 'left',
      sorter: (a, b) => a.order_id - b.order_id,
    },
    // {
    //   title: 'Price',
    //   width: 100,
    //   dataIndex: 'Pride',
    //   key: '2',
    //   fixed: 'left',
    //   sorter: true,
    // },
    {
      title: 'Username',
      dataIndex: 'username',
      key: '3',
    },
    {
      title: 'Ordered Item',
      dataIndex: 'ordered_item',
      key: '4',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: '5',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: '6',
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: '7',
      render: (stage) => (
        <Tag color={stage === 'confirmed' ? 'green' : stage === 'cancelled'? 'red' : stage === 'pending' ? 'blue' : stage === 'reviewed' ? 'yellow' : null}>
          {stage}
        </Tag>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '8',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: '9',
    },
    // {
    //   title: 'Column 8',
    //   dataIndex: 'address',
    //   key: '8',
    // },
    {
      title: 'Amount',
      key: '10',
      fixed: 'right',
      width: 100,
    //   render: () => <a>price</a>,
    dataIndex: 'price'
    },
  ];

  const data = [
    {
      key: '1',
      order_id: '1',
      username: 'John 1',
      ordered_item: 'item 1',
      room: 'room 1',
      time: '1:10 p.m.',
      date: '3 March',
      stage: 'cancelled',
      price: '70 /-'
    }
  ];

  for(let i=2; i<=100; i++){
    data.push({
        key: `${i}`,
      order_id: `${i}`,
      username: `John ${i}`,
      ordered_item: `item ${i}`,
      room: `room ${i}`,
      time: `1:${10 + i} p.m.`,
      date: '3 March',
      stage: 'confirmed',
      price: `${70+i} /-`
    })
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Adjust as needed
  });
 
  return (
    <Box m="20px">
      <Header
        title="Order Information"
        subtitle="Order summary"
      />
      <Box
        m="40px 0 0 0"
        height="60vh"
        width="75vw"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#630944",
            borderBottom: "none",
            color: "#FFFFFF",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "silver",
            color: "#FFFFFF",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
      <Box
  m="20px 0 0 0"
  height="60vh"
  width="100%"
  sx={{
  }}
>
  {/* <DataGrid
    rows={mockDataContacts}
    columns={columns}
    components={{ Toolbar: GridToolbar }}
    disableColumnMenu
    disableColumnSelector
  /> */}
  <Table
                columns={columns}
                dataSource={data}
                // scroll={{
                //   x: 'calc(700px + 50%)',
                //   y: 380
                // }}
                scroll={{
                  x: 'max-content',
                  y: 'calc(100vh - 300px)' 
                }}  
                pagination={pagination}
                onChange={(pagination) => setPagination(pagination)}
            />

</Box>
      </Box>
    </Box>
  );
};
 
export default Order_Information;
 