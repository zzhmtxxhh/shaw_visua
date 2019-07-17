import React from "react";
import {Suspense} from 'react'
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import CheckBox from '@material-ui/core/Checkbox'
import Card from '@material-ui/core/Card';
import {CardHeader} from "@material-ui/core";
// import C3_example_Component from '../DashComponent/C3_example'


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("rgl-layouts",'layouts') || {lg:[],md:[],sm:[],xs:[],xxs:[]};
const originalCheckBox = getFromLS('layout-checkbox','checkbox') === undefined ? false :  getFromLS('layout-checkbox','checkbox')

const C3_example = React.lazy( () => import('../DashComponent/C3_example'));


export default class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentBreakPoint:"",
      layouts: [],
      CheckBox:originalCheckBox,
      chart_layout:[]
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  getChartInfo(i){

    const layouts = this.state.chart_layout;
    const result = layouts.filter(layout => layout.i === i)
    return result[0]
  }

  resetLayout() {
    this.setState({ layouts:
          {'sm':[], 'lg':[],'md':[],'xs':[],'xxs':[]
          } });
    this.setState({CheckBox:false})
    // this.setState({chart_layout:[]})
  }


  onRemoveItem(i){
    if(this.state.CheckBox === true){
    this.setState(prevState => {
      return {
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakPoint]: prevState.layouts[
            prevState.currentBreakPoint
          ].filter(( item ) => item.i !== i)
        }
      };
    });}
  }


  getNextId(currentBreakPoint){
    if(this.state.length === 0 || this.state.layouts.length ===0  || this.state.layouts[currentBreakPoint].length === 0 ){
      return 0
    }
    return  parseInt((_.maxBy(this.state.layouts[currentBreakPoint], (o) =>{
      return parseInt(o.i)
    })).i)+1
  }

  onAddItem(){
    const next_id = this.getNextId(this.state.currentBreakPoint).toString();
    this.getChartInfo(next_id);

    let item ={
      i:next_id,
      w:4,
      h:11,
      x:0,
      y:0,
    };

    this.setState(prevState => ({
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakPoint]: [
          ...prevState.layouts[prevState.currentBreakPoint],
          item
        ]
      }
    }));
  }



  componentDidMount() {
    this.setState({currentBreakPoint:this.getBreakPoint()});
    this.setState({layouts:JSON.parse(JSON.stringify(originalLayouts))});
    this.setState({chart_layout:[{i:'0',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'line',
                        },
                          {i:'1',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'spline',
                        },
                          {i:'2',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'step',
                        },
                         {i:'3',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'area',
                        },
                                   {i:'4',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'area-step',
                        },
                                   {i:'5',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'area-spline',
                        },
                                             {i:'6',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'bar'
                        },

                                             {i:'7',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'scatter',
                        },

                                             {i:'8',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'standford',
                        },

                                             {i:'9',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'pie',
                        },
                                                       {i:'10',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'donut',
                        },
                                                                 {i:'10',
                        url:'https://api.uwaterloo.ca/v2/wireless/usage.json?key=8dec25674e8325c71c1be798bcb5df82',
                        type:'gauge',
                        },


      ]

    })

    // this.setState({chart_layout:JSON.parse(JSON.stringify(originalChartLayouts))});


  }


  getBreakPoint(){
    if(window.innerWidth>=1200){
      return 'lg'
    }else if (window.innerWidth<1200 && window.innerWidth >=996){
      return 'md'
    }else if (window.innerWidth<996 && window.innerWidth >=768){
      return 'sm'
    }else if (window.innerWidth<768 && window.innerWidth >=480){
      return 'xs'
    }else if (window.innerWidth<480 && window.innerWidth >=0){
      return 'xxs'
    }
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts,"rgl-layouts");
    saveToLS("chart_layouts",this.state.chart_layout,"rgl-chart-layouts");
    saveToLS('checkbox',this.state.CheckBox,'layout-checkbox');
    this.setState({ layouts });

  }
  onBreakpointChange = (breakpoint) => {
    this.setState({currentBreakPoint:breakpoint})
  };



  generateDOM(){


    return _.map(this.state.layouts[this.state.currentBreakPoint], (l) =>{
      return(
      <div key={l.i} data-grid={{
        w:l.w,
        h:l.h,
        x:l.x,
        y:l.y,
        isDraggable:l.isDraggable,
        isResizable:l.isResizable,
        maxH:l.maxH,
        maxW:l.maxW,
        minH:l.minH,
        minW:l.minW,
        moved:l.moved,
        static:l.static,
        endpoint : l.endAdornment,
        chart_id : l.chart_id,
      }}>
        <Card style={{height:"inherit"}}>

          {(this.state.CheckBox) ? <div className={"ChartHolder"}>Resizable and Draggable
                <span className="remove" style={{
                  position: "absolute",
                  right: "2px",
                  top: 0,
                  cursor: "pointer"

                }} onClick={this.onRemoveItem.bind(this, l.i)}> x</span>

            <p> ID: {this.getChartInfo(l.i).i}</p><p> URL: {this.getChartInfo(l.i).url}</p><p> ChartType: {this.getChartInfo(l.i).type}</p>



          </div> :


              <Suspense fallback={<h1>"loading"+JSON.stringify(l.i))</h1>}>

                <CardHeader title={l.i +"  "+this.getChartInfo(l.i).type}/>

                <span className="remove" style={{
                  position: "absolute",
                  right: "2px",
                  top: 0,
                  cursor: "pointer"

                }} onClick={this.onRemoveItem.bind(this, l.i)}> x</span>

                <p>{l.endpoint}</p>
                <p>{l.chart_id}</p>


                <C3_example chart_type={this.getChartInfo(l.i).type}
                            chart_id={this.getChartInfo(l.i).i}
                            chart_url={this.getChartInfo(l.i).url}
                            isinteracted={this.state.CheckBox}/>
              </Suspense>
          }

        </Card>

      </div>

      )

    })
  }

  handleCheckBoxChange = event => {

    this.setState({CheckBox: event.target.checked},()=>{

      saveToLS('checkbox',this.state.CheckBox,'layout-checkbox');

    })

  }

  render() {
    return (
      <div>
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <button onClick ={() => this.onAddItem()}>Add</button>

        <CheckBox checked={this.state.CheckBox} onChange={this.handleCheckBoxChange} />


        <h1>{this.state.currentBreakPoint}</h1>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          isDraggable = {this.state.CheckBox}
          isResizable = {this.state.CheckBox}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={(layout, layouts) =>{
              this.onLayoutChange(layout, layouts)}
          }
        >
           {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}



function getFromLS(Itemkey,key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(Itemkey)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }

  return ls[key];
}

function saveToLS(key, value,ItemKey) {
  if (global.localStorage) {
    global.localStorage.setItem(
      ItemKey,
      JSON.stringify({
        [key]: value
      })
    );
  }
}

