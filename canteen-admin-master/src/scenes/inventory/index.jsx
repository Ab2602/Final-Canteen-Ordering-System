
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Table, Tag } from "antd";
import {React, useEffect, useState} from "react";
import useRequireAuth from "../useRequireAuth";
 
const Inventory = () => {

  const [isHovered, setIsHovered] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const columns = [
    {
      title: 'Item ID',
      width: 100,
      dataIndex: 'item_id',
      key: '1',
      fixed: 'left',
      sorter: (a, b) => a.item_id - b.item_id,
    },
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: '3',
    },
    {
      title: 'Type',
      dataIndex: 'type_for_item',
      key: '4',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: '5',
    },
    {
      title: 'Status',
      dataIndex: 'item_status',
      key: '6',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'inactive'? 'red' : null}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: '7',
      render: (image, index) => {
        const isHovered = hoveredIndex === index;
        return(
          <img src={image}  style={{height: '30px',
          transition: "transform 0.2s", 
          transform: isHovered ? "scale(1.55)" : "scale(1)",
          
        }} onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}  />
        )
      }
    },
    {
      title: 'Price',
      key: '10',
      fixed: 'right',
      width: 100,
    dataIndex: 'price'
    },
  ];

const [Itemdata, setItemdata] = useState([]);
const [flag, setFlag] = useState(false);

const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, 
  });


useEffect(() => {
    let location = localStorage.getItem('location');
    if(location === 'BIA'){
      location = 'bud'
    }
    else if(location === 'PIA'){
      location = 'pud';
    }
    else if(location === 'SANAND'){
      location = 'sgj';
    }

    const token = localStorage.getItem("token");
    const fetchUserProfile = async () => {
        console.log("inside");
        try {
            const response = await fetch('http://localhost:5000/admin/getitems', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ location }),
              });
          if (response.ok) {
            const data = await response.json();
            setItemdata(data.data);
          } else {
            throw new Error("Failed to fetch Item data.");
          }
        } catch (error) {
        //   setError(error.message);
        alert(error)
        }
      };
  
      fetchUserProfile();
    
  }, [])

return (
  
  <Box m="20px">
  <Header
    title="Available items"
    subtitle="List of Available Items"
  />
  <Box
    m="40px 0 0 0"
    height="75vh"
  >
  <Box
m="40px 0 0 0"
height="60vh"
sx={{
}}
>
      <Table
          columns={columns}
          dataSource={Itemdata}
          scroll={{
            x: 'max-content',
            y: 'calc(100vh - 260px)' 
          }}  
          pagination={pagination}
          onChange={(pagination) => setPagination(pagination)}
      />

</Box>
      </Box>
    </Box>
      
)
};
 
export default Inventory;
 