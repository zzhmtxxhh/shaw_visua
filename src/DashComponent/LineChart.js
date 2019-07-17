import muze from 'muze';
import 'muze/dist/muze.css';
import React from 'react'
import {getData} from '../getData'

function getwidth(string){


    return parseInt(string.split(',')[0].split(':')[1])
}
function getheigth(string){

    return parseInt(string.split(',')[1].split(':')[1])
}

export default class Example extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            l:this.props.l,
            w:this.props.w
        }
    }


    componentDidMount() {
        console.log()


        const schema = [
            {
                name: 'Name',
                type: 'dimension'
            },
            {
                name: 'Maker',
                type: 'dimension'
            },
            {
                name: 'Horsepower',
                type: 'measure',
                defAggFn: 'avg'
            },
            {
                name: 'Origin',
                type: 'dimension'
            }
        ]


// Prepare the data
        const data = [
            {
                "Name": "chevrolet chevelle malibu",
                "Maker": "chevrolet",
                "Horsepower": 130,
                "Origin": "USA"
            },
            {
                "Name": "buick skylark 320",
                "Maker": "buick",
                "Horsepower": 165,
                "Origin": "USA"
            },
            {
                "Name": "datsun pl510",
                "Maker": "datsun",
                "Horsepower": 88,
                "Origin": "Japan"
            }
        ]



const DataModel = muze.DataModel;
const dm = new DataModel(data, schema);

// Create a global environment to share common configs across charts
const env = muze();
// Create a new canvas instance from the global environment
const canvas = env.canvas();
canvas
  .data(dm)
  .rows(["Horsepower"]) // Fields drawn on Y axis
  .columns(["Origin"]) // Fields drawn on X axis
  .width(getwidth(this.props.size))
  .height(getheigth(this.props.size))
  .mount("#chart"+this.props.domID);

    }



    render(){

// Specify an element to mount on using a CSS selector
        return(
            <div style={{width:'auto' ,height:"auto"}}>
                <h1>{this.props.domID}</h1>
                <p>{JSON.stringify(this.props.size[0])}</p>
                {/*<p>{parseInt(this.props.h)*100}</p>*/}

                <div id={"chart" + this.props.domID }></div>
            </div>
        )
    }
}