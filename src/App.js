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
  // this.setState({blockNumber: await connect()})
  this.connect()
  }
  connect = () => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://ws.nexty.io"));
    // var a = web3.eth.getBalance("0x045bfe22453a9ca06aff4bdc5d7f5870eba121bd")
    // console.log(a);


    // web3.eth.subscribe("newBlockHeaders", async (error, event) => {
    //   if (!error) {
    //     var blockNumber = event.number;
    //     console.log(event.number);
    //     this.setState({
    //       blockNumber: event.number
    //     })
    //     return event.number;
    //   }
    //   console.log(error, "loi");
    //   return blockNumber;
    //   });

      var subscription = web3.eth.subscribe('logs', {
        address: '0xbFC7889c6e2FF3d026f15752aaB47440d5FaA6eE',
        topics: ['0xa8126f7572bb1fdeae5b5aa9ec126438b91f658a07873f009d041ae690f3a193']
    }, function(error, result){
        if (!error)
            console.log(result);
    })

    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });

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
            {/* {this.state.blockNumber} */}
            {}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
