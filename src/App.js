import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {

  state = {
    isConnected: false,
    id: null
  }
  socket = null

  componentWillMount() {

    this.socket = io('https://codi-server.herokuapp.com');

    this.socket.on('connect', () => {
      this.setState({isConnected:true})
    })

    this.socket.on('pong!',()=>{
      console.log('the server answered!')
    })

    this.socket.on('pong!',(additionalStuff)=>{
      console.log('server answered!', additionalStuff)
    })

    this.socket.on('disconnect', () => {
      this.setState({ isConnected: false })
    })

    /** this will be useful way, way later **/
    this.socket.on('room', old_messages => console.log(old_messages))

    this.socket.on('youare',(answer)=>{
      this.setState({id:answer.id})
    })


  }

  componentWillUnmount() {
    this.socket.close()
    this.socket = null
  }

  render() {
    return (<div className="App">
      <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
      {/* add: */}
      <div>id: {this.state.id}</div>
      <button onClick={()=>this.socket.emit('ping!')}>ping</button>
      {/* and also add: */}
      <button onClick={()=>this.socket.emit('whoami')}>Who am I?</button>
    </div>);
  }

}

export default App;