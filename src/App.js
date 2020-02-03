import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

// var connect = () => {
//   const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"));

//   web3.eth.subscribe("newBlockHeaders", async (error, event) => {
//   // if (error) return console.error(error);
//   //   console.log('Successfully subscribed!', event.number);
//   // })
//   // .on('data', (event) => {
//   // console.log('data: ', event);
//   // });
//     if (!error) {
//       var blockNumber = event.number;
//       console.log(event.number);
//       return event.number;
//     }
//     console.log(error);
//     return blockNumber;
//     });
// }
// var connect = () => {
//   var web3 = new Web3(Web3.givenProvider || "ws://178.238.233.73:8546");

//   var blockNumber = web3.eth.getBlockNumber();
//   return blockNumber;
// }

class App extends Component {
  state = {blockNumber: 0}
  async componentDidMount() {
  this.connect()
  }


  connect = () => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"));
      var subscription = web3.eth.subscribe('logs', {
        address: '0x57AaeF34Ea26b7dD3E1d9b1EE6C251FD464246B9',
        topics: ['0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c']
    }, function(error, result){
        if (!error)
            console.log(result);
    })

    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });

    // end event
    web3._provider.on('end', (eventObj) => {
      console.log(eventObj);
    })
  }
  

  render() {
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
