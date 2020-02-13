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
  this.connect("0x61caAD7b6814f8D7B60bfa62dd2fC1f4d49c0872",28587311,28588311)
  }

  connect = async (accAddress, startBlockNumber, endBlockNumber) => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"));


    let {items} = this.state;
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
      web3.eth.getBlock(i, true, function(error, result){
        if (!error) {
          // console.log(result);
          if (result != null && result.transactions != null) {
              items.forEach ((item) => {
                result.transactions.forEach( function(e) {
                  let id = e.input.slice(2, 10);
                  let para = '0x' + e.input.slice(11);
                  // if (accAddress === e.from || accAddress === e.to) {
                    if (id !== "0x" && id === item.id) {
                      console.log(e,e.blockNumber)
                      web3.eth.getTransactionReceipt(e.hash, function(err, receipt) {
                        if (!err && receipt.logs!== undefined&& receipt.logs!== null) {
                          // console.log(receipt.logs[2].data, receipt.blockNumber)
                          
                          // for (var j = 0; j<=receipt.logs.length-1; j++) {
                          //   // console.log(receipt.logs[2].topics)
                          //   var lo = web3.eth.abi.decodeLog([{"name": "_id", "type": "bytes32"}], receipt.logs[j].data, [receipt.logs[j].topics]);
                          //   console.log('log' + j, ":" + ' ' + lo['0'])
                          // }
                        }
                      })
                      var strip_comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
                      var argument_names = /([^\s,]+)/g;

                      var fnStr = item.function.replace(strip_comments, '');
                      var parameters = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(argument_names);
                      if(parameters === null)
                      parameters = [];
                      let para1 = parameters[0];
                      let para2 = parameters[1];
                      let para3 = parameters[2];
                      let para4 = parameters[3];
                      let para5 = parameters[4];
                      let count = parameters.length
                      let a = item.function.indexOf('(')
                      let b = item.function.slice(0,a+1)
                      if (count === 0) {
                        console.log(e.from, item.function)
                      }
                      if (count === 1) {
                        var decode = web3.eth.abi.decodeParameters([para1], para);
                        // if(e.to === "0x0000000000000000000000000000000000023456") {
                          console.log('dev '+ b + decode["0"]+')',e.blockNumber);
                        // } 
                      }
                      if (count === 2) {
                        var decode1 = web3.eth.abi.decodeParameters([para1, para2], para);
                        // if(e.to === "0x0000000000000000000000000000000000023456") {
                          console.log('dev '+ b + decode1["0"]+', '+decode1["1"]+')',e.blockNumber);
                        // } 
                      }
                      if (count === 3) {
                        var decode2 = web3.eth.abi.decodeParameters([para1, para2, para3], para);
                        // if(e.to === "0x0000000000000000000000000000000000023456") {
                          console.log('dev '+ b + decode2["0"]+', '+decode2["1"]+', '+decode2["2"]+')',e.blockNumber);
                        // }                     
                      }
                      if (count === 4) {
                        var decode3 = web3.eth.abi.decodeParameters([para1, para2, para3, para4], para);
                        // if(e.to === "0x0000000000000000000000000000000000023456") {
                          console.log('dev '+ b + decode3["0"]+', '+decode3["1"]+', '+decode3["2"]+', '+decode3["3"]+')',e.blockNumber);
                        // }                     
                      }
                      if (count === 5) {
                        var decode4 = web3.eth.abi.decodeParameters([para1, para2, para3, para4, para5], para);
                        // if(e.to === "0x0000000000000000000000000000000000023456") {
                          console.log('dev '+ b + decode4["0"]+', '+decode4["1"]+', '+decode4["2"]+', '+decode4["3"]+', '+decode4["4"]+')',e.blockNumber);
                        // }                     
                      }                                    
                    } else {
                  }
                // }
              })
            });
          }
        }
      })
    }
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