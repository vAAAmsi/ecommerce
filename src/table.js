import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {  GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, IconButton } from '@mui/material';
import { green } from '@mui/material/colors';
import {  GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './table.css'
import { Router } from '@mui/icons-material';
import { Routes,Route,Link,useNavigate } from 'react-router-dom';


const rows = [
    { 
        id: 1, 
        Photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV3lcfLT7Qd04_y41FKdt3a8sRwY1U_3uQ4A&usqp=CAU',
        Name: 'woo ninga',
        Color: 'pink', 
        Stock: 'In stock',
        Buy:0,
        // height:400,
        Price:35
      
      },

    { 
        id: 2,
        Photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV3lcfLT7Qd04_y41FKdt3a8sRwY1U_3uQ4A&usqp=CAU',
        Name: 'woo logo', 
         Color: 'blue',
          Stock: 'In stock',
          Buy:0,
          Price:35 },
    { 
        id: 3,
        
        Name: 'woo ninga',
        Photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXN2smsvQY1419EDpLK_UieKJ2OykYyVnTZg&usqp=CAU',
          Color: 'pink', 
          Stock: 'In stock',
          Buy:0,
          Price:35
         },
    { 
        id: 4,
        Photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUbeRN__VOGbdc655ceGQkMyRqTmwZogU8g&usqp=CAU',
        Name: 'Ninga sssilhouette',
        Color: 'black',
        Stock: 'In stock',
        Buy:0,
        Price:35 },
  
    
    
  ];
  export default function Table()
{
 
  const [age, setAge] = React.useState('');
  const [selectedData,setSelectedData]=useState({})
  const [rowsData,setRowsData]=useState(rows)
  const handleChangeCategory = (event) => {
    setAge(event.target.value );
  };
  const router=useNavigate();
  function addtocart(){
    router('/Cart',{state:selectedData});
  };
  const columns = React.useMemo(
    () => [
      { field: 'Photo',
   headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
      headername: 'Photo',
      width: 200,
      renderCell: (params) => <img src={params.value} style={{width:100,height:100}} />,
    
    },
    {
      field: 'Name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
      headername: 'Name',
      width: 150,
      
    },
    {
      field: 'Color',
   headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
      headername: 'Color',
      width: 150,
      
    },
    {
      field: 'Stock',
   headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
      headername: 'Stock',
      // color:green,
      width: 110,
    //   editable: true,
    },
    {
      field: 'Price',
   headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
      headername: 'Price',
      width:100,
      renderCell:(params)=>{
        return(
          <div>${params.row.Price}.00</div>
        )
      }
    },
    {
        field:'Buy',
      headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
        headername:'Buy',
        width:150,
        renderCell: (params) =>{
          return(
            (
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                  <input style={{height:30,width:30}}  min="0"
                  onChange={(e)=>{handleChangeCount(e.target.value,params.id)}}
                  value={params.row.Buy} type="number" ></input>
                   <IconButton style={{backgroundColor:'black',color:'white',height:50,width:50}}><AddShoppingCartIcon/></IconButton>
              </div>
          )
          )
        }
    },
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 100,
            backgroundColor:'red',
            color:'white'
      },
    ],
  );
  const handleChangeCount=(val,id)=>{
    setRowsData(current =>
      current.map(obj => {
        if (obj.id === id) {
          return {...obj, Buy:val};
        }

        return obj;
      }),
    );
  }
    return(
        <div  className='table-container'  >
          <div  className='table-header-container' >
     <div className='select-main-container' >
         <div>
         <FormControl className='select-container'>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Category"
          onChange={handleChangeCategory}
        >
          <MenuItem value={10}>All</MenuItem>
          <MenuItem value={20}>Hoodies</MenuItem>
          <MenuItem value={30}>Shirts</MenuItem>
        </Select>
      </FormControl>
         </div>
         <div>
         <FormControl className='select-container'>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Size"
          onChange={handleChangeCategory}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
         </div>
     </div>
     <div  className='right-container' >
         <div>      <TextField id="outlined-basic" label="Search" variant="outlined" /></div>
         <div>
          <Button onClick={addtocart}  variant="contained" >Add To Cart</Button>
         </div>
     </div>
          </div>
          <div style={{width:'100%',height:'500px'}} >
        <DataGrid
        rows={rowsData}
        columns={columns}
        pStockSize={5}
        rowsPerPStockOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        rowHeight={100}
        sx={{
          '& .super-app-theme--header':{
            fontWeight:'bold',
            fontSize:16,
            backgroundColor:'red',
            color:'white'
          }
        }}
        onSelectionModelChange={(ids) => {
          console.log(ids);
         const tempSelectedData= rowsData.filter((data,index)=>{return ids.includes(data.id)} );
         setSelectedData(tempSelectedData)
        }}

      />
        </div>
          </div>
    )
}
//  Table;