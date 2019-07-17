import React from 'react';
// import Drawer_Bar from './Components/Header'
import {Suspense} from 'react'
import './App.css';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Drawer_Bar = React.lazy(()=> import('./Components/Header'))


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};


export default class App extends  React.Component{

  constructor(props){
    super(props)


  }



  render(){
    return (
    <div >
      <Suspense fallback={<h1>Loading....</h1>}>
        <Drawer_Bar />
      </Suspense>
    </div>
  );
  }
}


