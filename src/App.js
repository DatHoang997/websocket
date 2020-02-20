import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import Items from './mockdata/Items'
import Events from './mockdata/Events'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: Items,
      events: Events,
      valueInput: ""
    }
  }
  connect = async () => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))

    let {
      valueInput,
      events,
      items
    } = this.state
    //28588311
    console.log(valueInput)
    for (let i = valueInput - 5000; i <= valueInput; i++) {
      web3.eth.getBlock(i, true, function (error, result) {
        if (!error) {
          if (result != null && result.transactions != null) {
            items.forEach((item) => {
              result.transactions.forEach(function (e) {
                let id = e.input.slice(2, 10)
                let para = '0x' + e.input.slice(11)
                // if (accAddress === e.from || accAddress === e.to) {
                if (id !== "0x" && id === item.id) {
                  web3.eth.getTransactionReceipt(e.hash, function (err, receipt) {
                    if (!err && receipt.logs !== undefined && receipt.logs !== null) {
                      events.forEach((event) => {
                        for (let n = 0; n <= receipt.logs.length - 1; n++) {
                          if (event.code === receipt.logs[n].topics[0]) {
                            let ecut = event.event.indexOf('(')
                            let ename = event.event.slice(0, ecut + 1)
                            let eventparam = web3.eth.abi.decodeLog(
                              event.inputs,
                              receipt.logs[n].data,
                              receipt.logs[n].topics)
                            let elog = 'event' + ename
                            for (let i = 0; i < event.inputs.length + 1; i++) {
                              if (i > 0) {
                                let temp = elog + event.inputs[i - 1].name + ": " + eventparam[i - 1] + ", ";
                                elog = temp
                              }
                              if (i === event.inputs.length) {
                                elog = elog + ')'
                                elog = elog.replace(', )', ')')
                                console.log(elog, n, e.blockNumber)
                              }
                            }
                            let strip_comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                            let argument_names = /([^\s,]+)/g
                            let fnStr = item.function.replace(strip_comments, '')
                            let parameters = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(argument_names)
                            if (parameters === null)
                              parameters = []
                            let fcut = item.function.indexOf('(')
                            let fname = item.function.slice(0, fcut + 1)
                            let decode = web3.eth.abi.decodeParameters(parameters, para)
                            let flog = 'Function ' + fname
                            for (let i = 0; i < parameters.length; i++) {
                              if (i > 0) {
                                flog += parameters[i] + ': ' + decode[i] + ", ";
                              }
                              if (i === parameters.inputs.length) {
                                flog = flog + ')'
                                flog = flog.replace(', )', ')')
                                console.log(flog, n, e.blockNumber)
                              }
                            }
                          }
                        }
                      })
                    }
                  })
                }
                // }
              })
            })
          }
        }
      })
    }
  }

  _onchange = evt => {
    this.setState({
      valueInput: evt.target.value
    })
  }
  _handleKeyDown = evt => {
    if (evt.key === 'Enter') {
      this.setState({
        valueInput: evt.target.value
      }, () => {
        this.connect()
      })
    }
  }
  render() {
    return ( 
      <div className = "App" >
        <header className = "App-header" >
        <img src = {logo}className = "App-logo"alt = "logo" / >
        <p>
          <label > Block Number: 28588311 </label><br></br >
          <input type = "number" id = "input"onChange = {this._onchange} onKeyDown = {this._handleKeyDown}/><br></br >
          <button type = "submit" onClick = {this.connect}> Button </button>
        </p> 
        </header> 
      </div>
    )
  }
}

export default App