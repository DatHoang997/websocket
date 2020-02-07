import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import Items from './mockdata/Items';

class App extends Component {
  constructor(props) {    
    super(props);
    this.state = {
        items: Items
    }
  }

  async componentDidMount() {
  this.connect("0x61caAD7b6814f8D7B60bfa62dd2fC1f4d49c0872",29140000,29140050)
  this.renderItem()
  }

  connect = (accAddress, startBlockNumber, endBlockNumber) => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"));
    let {items} = this.state;
    items.map ((item) => {
      for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        web3.eth.getBlock(i, true, function(error, result){
          if (!error) {
            if (result != null && result.transactions != null) {
              result.transactions.forEach( function(e) {
                let id = e.input.slice(2, 10);
                let para = '0x' + e.input.slice(11);
                // if (accAddress === e.from || accAddress === e.to) {
                  if (id !== "0x" && id === item.id) {
                    // console.log(item)
                    var str = item.function.replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\/\/(.)*/g, '')          
                    .replace(/{[\s\S]*}/, '') 
                    .replace(/=>/g, '') 
                    .trim(); 
                    var start = str.indexOf("(") + 1; 
                    var end = str.length - 1; 
                    var result = str.substring(start, end).split(", "); 
                    var params = []; 
                    result.forEach(element => { 
                      element = element.replace(/=[\s\S]*/g, '').trim(); 
                      if(element.length > 0) 
                        params.push(element); 
                    }); 
                    let para1 = params[0];
                    let para2 = params[1];
                    let para3 = params[2];
                    let para4 = params[3];
                    let para5 = params[4];
                    let count = params.length
                    if (count === 0) {
                      console.log(e.from, item.function)
                    }
                    if (count === 1) {
                      var decode = web3.eth.abi.decodeParameters([para1], para);
                      let a = item.function.indexOf('(')
                      let b = item.function.slice(0,a+1)
                      if(e.to === "0x0000000000000000000000000000000000023456") {
                        console.log('nexty ' + b+decode["0"]+')');
                      } 
                    }
                    if (item.count === '2') {
                      var decode1 = web3.eth.abi.decodeParameters([para1, para2], para);
                      console.log(item.function, decode1);
                    }
                    if (item.count === '3') {
                      var decode2 = web3.eth.abi.decodeParameters([para1, para2,para3, ], para);
                      console.log(item.function, decode2);
                    }
                    if (item.count === '4') {
                      var decode3 = web3.eth.abi.decodeParameters([para1, para2, para3, para4], para);
                      console.log(item.function, decode3);
                    }
                    if (item.count === '5') {
                      var decode4 = web3.eth.abi.decodeParameters([para1, para2, para3, para4, para5], para);
                      console.log(item.function, decode4);
                    }                                    
                  } else {
                  }
                // }
              })
            }
          }
        })
      }
    });
  }

  render() {
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {/* {this.state.blockNumber} */}
            {}
          </p>
        </header>
      </div>
    );
  }
}

export default App;