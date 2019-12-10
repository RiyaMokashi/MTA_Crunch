import React from 'react';
import ReactDOM from 'react-dom'

class Mta extends React.Component{
    constructor(){
        super();
        this.state = {color:'blue'};
    }


    render(){
        return<h2> MTA {this.state.color} Crunch </h2>;
    }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

ReactDOM.render(<Mta />, document.getElementById('root'));
