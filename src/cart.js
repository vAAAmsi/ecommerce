// import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import {  GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, IconButton } from '@mui/material';
import { green } from '@mui/material/colors';
import {  GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './table.css'
import { Add, Close, Difference, PlusOne, Router } from '@mui/icons-material';
import { Routes,Route,Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function Cart(){
    const navigate=useNavigate();
    const location=useLocation();
    var [rows,setRows]=useState([])

    var [total,setTotal]=useState(0);
    // console.log("rows is",rows)
    useEffect(()=>{
        console.log("location state is",location.state)
        setRows(Object.keys(location.state).length>0?location.state:[])
    },[])
    const calculateTotal=()=>{
        var t=0;
        rows.map((data,index)=>{
            t=t+parseInt(data.Buy)*data.Price;
        })
        setTotal(t);
        // console.log("to/tal is",total)
    }
    useEffect(()=>{
        calculateTotal();
    })
    const columns = React.useMemo(
        () => [
          { field: 'Product',
       headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
          headername: 'Photo',
          width: 350,
          flex:1,
          renderCell: (params) => {
            // console.log("hello",params)
            return(
                <div className="cart-product" >
                    <IconButton  onClick={()=>{handleRemoveItems(params.row.id)}} ><Close/></IconButton>
                <img src={params.row.Photo} style={{width:100,height:100}} />
                    <div>{params.row.Name}</div>
                    </div>
                )
          },
        
        },
        {
          field: 'Price',
       headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
          headername: 'Price',
          width:100,
          renderCell:(params)=>(
            <div>${params.row.Price}.00</div>

          )
        },
        {
            field:'Quantinty',
          headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
            headername:'Buy',
            width:150,
            renderCell: (params) =>{
              return(
                (
                  <div style={{display:'flex',gap:10,alignItems:'center'}}>
                       <IconButton   onClick={()=>{handleDecrement(params.id)}}><RemoveIcon/></IconButton>
                        <div>{params.row.Buy}</div>
                       <IconButton onClick={()=>{handleIncrement(params.id)}}   ><Add/></IconButton>
                  </div>
              )
              )
            }
        },
        {
            field: 'Sub total',
         headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
            headername: 'Price',
            width:100,
            renderCell:(params)=>{
                return(
                    <div>${parseInt(params.row.Buy)*params.row.Price}.00</div>
                  )
            }
          }
        ],
      )
      const handleIncrement=(id)=>{
        setRows(current =>
            current.map(obj => {
              if (obj.id === id) {
                console.log(parseInt(obj.Buy))

                return {...obj, Buy:parseInt(obj.Buy)>=0?parseInt(obj.Buy)+1:0};
              }
              
              return obj;
            }),
          );
          calculateTotal();
      }
      const handleDecrement=(id)=>{
        setRows(current =>
            current.map(obj => {
              if (obj.id === id) {
                return {...obj, Buy:parseInt(obj.Buy)>= 0?parseInt(obj.Buy)-1:0};
              }
      
              return obj;
            }),
          );
          
          calculateTotal();

    }
    const handleRemoveItems=(id)=>{
        //  console.log("id is",id)
         var moidfiedData=rows.filter((data)=>{return data.id!=id})
         setRows(moidfiedData)
    }
    return(
        <div>
        <div className="mainC">
       <div className="cartcontainer">
       <DataGrid
        rows={rows.length>0?rows:[]}
        columns={columns}
        pStockSize={5}
        rowsPerPStockOptions={[5]}
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

      />
       </div>
       <div className="carttotal">
        {/* <div className="va"> */}
        <div className="rt">
        <div className="ar1" style={{fontSize:25}}>Cart totals</div>
        </div>
        {/* </div> */}
        <div className="va1">
        <div className="ar2" style={{fontSize:15}}>subtotal</div>
        </div>
        <hr style={{width:'100%'}}></hr>
        <div className="ra">
        <div className="main">
        <div className="carttotal1">
        <div className="va" style={{fontSize:20}}>Total  </div>
        <div>{total}</div>
        </div>
        </div>
        </div>
        <div className="mbutton">
        <Button className="button" variant="contained"  onClick={async()=>{
            if(total>0){

           await  Swal.fire({
                title:'Success',
                text:"order placed successfully",
                icon:'success'
             })
             navigate('/')
            }else{
                await  Swal.fire({
                    title:'error',
                    text:"please order anything",
                    icon:'error'
                 })
            }

        }} >Proceed To Checkout</Button>
        </div>
       </div>
           </div>
        </div>
    )
}
export default Cart;