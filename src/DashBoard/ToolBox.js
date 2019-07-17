import React from "react";
import _ from "lodash";
import C3_example from '../DashComponent/C3_example'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class ToolBoxItem extends React.Component {
  render() {
    return (
      <div
        className="toolbox__items__item"
        style={{backgroundColor:"lightgrey"}}
        onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
      >
        {this.props.item.i}
      </div>

    );
  }
}
class ToolBox extends React.Component {
  render() {
    return (
      <div className="toolbox" >
        <span className="toolbox__title">Toolbox</span>
        <div className="toolbox__items" >
          {this.props.items.map(item => (
            <ToolBoxItem
              key={item.i}
              item={item}
              onTakeItem={this.props.onTakeItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default  class ShowcaseLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout()
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.initialLayout },
    toolbox: { lg: [] }
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

//
//
//   generateC3COM(){
//     return (
//         <div key={"1"} className=""  style={{backgroundColor:"lightgrey"}}>
//
//
//           <span className="text">
//               <p>"1"</p>
//
//             <C3_example/>
//
//             </span>
//
//
//         </div>
//     )
// }

  generateDOM() {
    console.log("Generage DOM")
    console.log(this.state.layouts[this.state.currentBreakpoint])
    return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
      return (
        <div key={l.i} className={l.static ? "static" : ""} style={{backgroundColor:"lightgrey"}}>
          <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
            -
          </div>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {l.i}
            </span>
          ) : (
            <span className="text">
              <p>{l.i}</p>
              <p>width:{l.w} heigth:{l.h} x:{l.x} y:{l.y}</p>

            </span>


          )}
          <h1>apple</h1>
          <C3_example/>

        </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
       console.log("onBreakPointChange")
    this.setState(prevState => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]:
          prevState.toolbox[breakpoint] ||
          prevState.toolbox[prevState.currentBreakpoint] ||
          []
      }
    }));
  };

  onCompactTypeChange = () => {
       console.log("onTCompactChange")
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical" ? null : "horizontal";
    this.setState({ compactType });
  };

    onCreateNewComponent = () => {
    let element = this.state.layouts[this.state.currentBreakpoint]
    let newid = this.getNextID().toString()
    let new_el = {

    i:newid,

    }
    element.push(new_el)

    this.setState(this.state.layouts[this.state.currentBreakpoint]=element);
    console.log("fkkkk");
    console.log(this.state.layouts)


  }

  onTakeItem = item => {
      console.log("onTakeItem")
    this.setState(prevState => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i)
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item
        ]
      }
    }));
  };

  onPutItem = item => {
    console.log("onlayoutChange")
    this.setState(prevState => {
      return {
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i)
        }
      };
    });

  };


  getNextID = () =>{
    let pre = -1
    this.state.layouts[this.state.currentBreakpoint].forEach((e)=>{
      console.log((e.i))
      if (parseInt(e.i) > pre){
        pre = parseInt(e.i)
      }
    })
      console.log(pre+1)
      return pre+1
  }




  onLayoutChange = (layout, layouts) => {
    console.log("onLayhange")
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  };


  onNewLayout = () => {

    const size = this.state.currentBreakpoint
    if(size === "lg"){
      this.setState({
      layouts: { lg: generateLayout() },
      toolbox: { lg: [] }
    });
    }else if (size === "md"){
      this.setState({
      layouts: { md: generateLayout() },
      toolbox: { md: [] }
    });

    }    else if (size === "sm"){
      this.setState({
      layouts: { sm: generateLayout() },
      toolbox: { sm: [] }
    });

    }else if (size === "xs"){
      this.setState({
      layouts: { xs: generateLayout() },
      toolbox: { xs: [] }
    });


    }
    else if (size === "xxs"){
      this.setState({
      layouts: { xxs: generateLayout() },
      toolbox: { xxs: [] }
    });

    }

  };

  render() {
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>

        <ToolBox
          items={this.state.toolbox[this.state.currentBreakpoint] || []}
          onTakeItem={this.onTakeItem}
        />

        <p>{JSON.stringify(this.state.layouts)}</p>

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={true}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}

        </ResponsiveReactGridLayout>
      </div>
    );
  }
}




function generateLayout(){
  return [
    //   {
    // x:0,
    // y:0,
    // minH:5,
    // minW:5,
    // w:2,
    // h:10,
    // i:'0',
    // static:false
    // }
  ]
}

