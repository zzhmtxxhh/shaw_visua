import React from 'react'
import ReactDOM from 'react-dom'
import c3 from 'c3'
import "../../node_modules/c3/c3.css";
import Modal from "../Components/modal"
import ButtonAppBar from "../Components/Header";

const apikey = '8dec25674e8325c71c1be798bcb5df82';

export default class Chart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        showModal:false,
        chart_id : this.props.chart_id,
        chart_url : this.props.chart_url,
        column1: ['data1', ],
        column2: ['data2',],
        chart_type: this.props.chart_type,
        isinteracted:!this.props.isinteracted
    };
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  mouseover = (d) => {



      console.log(d);

  };

  toggleModal = () =>{
      this.setState({showModal: !this.state.showModal,})
  }

  onClickHandler = (d,element) =>{

      console.log('data',d);

      alert("dataReceieve",d)

  };


  renderChart() {

    c3.generate({
        padding:{
            right:70,
            left:70
        },
        point:{
            r:2
        },

      bindto: "#chart"+this.state.chart_id,
      data: {
        columns: [this.state.column1, this.state.column2],
          type:this.state.chart_type,
          onclick:this.onClickHandler
      },
      interaction: {
            enabled: this.state.isinteracted
        },

    subchart: {
        show: true
    },
        legend:{
            position:'right'
        }
    });



  }


    componentDidMount() {

      const response = (async () =>{
          try{
              let res = await fetch(this.state.chart_url,{mode:'cors'});
              console.log("async")
              console.log(res.json().then(myJson =>{
                          const col1 = myJson.data.map(
            item => item.rates.upload
        )
        const col2 = myJson.data.map(
            item => item.rates.download
        )
        that.setState({column1:['data1'].concat(col1)})
        that.setState({column2: ['data2'].concat(col2)})
              } ))


          }catch (e) {
              console.log(e)
          }
      })();

      const that  = this;

  }

  componentDidUpdate() {
    this.renderChart();
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
      return true
  }


    render() {


    return (

      <div>
        <div id={"chart"+this.state.chart_id}> </div>
          {/*<input type={"button"} value={"Click Me"} onClick={this.toggleModal}/>*/}

          {/*{ReactDOM.createPortal(<Modal className = "Modaldemo" open={this.state.showModal} onClose = {this.toggleModal}>*/}
          {/*    Test Modal*/}
          {/*</Modal>,document.body)}*/}


      </div>
    );
  }
}