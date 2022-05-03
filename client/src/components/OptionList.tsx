import React, { useState } from 'react';
import OptionCloud from './OptionCloud';
import '../App.css';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'; 

export default function OptionList(){

  const { clouds} = useSelector((state: RootStateOrAny) => ({
    clouds: state.options.clouds,
  }));
  
  const getOptionClouds = () =>{
    let content:any = [];

    clouds.map((cloud:any)=>{
      content.push(<OptionCloud color={cloud.color} id={cloud.id} key={cloud.id} />);
    })
    return content;
  };

  return(
    <div>
    {/* <div style={{marginBottom: '130px'}}> */}
      {getOptionClouds()}
    </div>
  )
}