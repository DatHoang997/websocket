import React, {
  Component
} from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import Items from './mockdata/items'
import Events from './mockdata/events'
import Accs from './mockdata/accs'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: Items,
      events: Events,
      accs: Accs,
      valueInput: ""
    }
  }
  connect = async () => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))

    let {
      valueInput,
      items,
      accs
    } = this.state
    //28588311
    console.log(valueInput)
    for (let i = valueInput ; i <= valueInput; i++) {
      web3.eth.getBlock(i, true, function (error, result) {
        if (!error) {
          console.log(result)
          if (result != null && result.transactions != null) {
            items.forEach((item) => {
              result.transactions.forEach(function (e) {
                let id = e.input.slice(2, 10)
                let para = '0x' + e.input.slice(11)
                console.log(para)
                if (id !== "0x" && id === item.id) {
                  let strip_comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                  let argument_names = /([^\s,]+)/g
                  let fnStr = item.function.replace(strip_comments, '')
                  let parameters = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(argument_names)
                  console.log(parameters)
                  if (parameters === null)
                    parameters = []
                  let fcut = item.function.indexOf('(')
                  let decode = web3.eth.abi.decodeParameters(parameters, para)
                  accs.forEach((acc) => {
                    if (acc.address === e.from || acc.address === e.to) {
                      let flog = 'Function ' + acc.name + ' ' + 'trade ('

                      for (let i = 0; i < parameters.length; i++) {
                        if (i > 0) {
                          flog += parameters[i] + ': ' + decode[i] + ", ";
                        }
                        if (i === parameters.length - 1) {
                          flog = flog + ')'
                          flog = flog.replace(', )', ')')
                          console.log(flog, e.blockNumber)
                        }
                      }
                    }
                  })
                }
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