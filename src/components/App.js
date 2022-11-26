import React, { Component } from 'react';
import Youtube from '../abis/Youtube.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Youtube.networks[networkId]
    if(networkData) {
      const youtube = new web3.eth.Contract(Youtube.abi, networkData.address)
      this.setState({ youtube })
      const videosCount = await youtube.methods.videoCount().call()
      this.setState({ videosCount })

      console.log(this.state.videosCount);

      // Load videos, sort by newest
      for (var i=videosCount; i>=1; i--) {
        const video = await youtube.methods.videos(i).call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }

      //Set latest video with title to view as default 
      const latest = await youtube.methods.videos(videosCount).call()
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title
      })
      this.setState({ loading: false})
    } else {
      window.alert('Youtube contract not deployed to detected network.')
    }
  }

  captureFile = event => {
    event.preventDefault()
    let url_link = event.target.value;
    console.log(url_link);

    let positionGoogle = url_link.search("google");
    let positionYoutube = url_link.search("youtube");
    if (positionGoogle != -1) {
      // do drive thing
      let viewPosition = url_link.search("view");

      url_link = url_link.slice(0, viewPosition) + "preview" 
      this.setState({buffer: url_link})
    } else if (positionYoutube != -1) {
      // do youtube thing
      url_link = url_link.slice(0, 24) + "embed/" + url_link.slice(32, )
      this.setState({buffer: url_link})
    } else {
      alert("Wrong URL entered")
    }
    console.log(this.state.buffer);
  }


  uploadVideo = title => {
    console.log("Submitting file to IPFS...")
    let uploadTime = Date().toLocaleString()
    this.setState({currentVideoTime: uploadTime});
    this.state.youtube.methods.uploadVideo(this.state.buffer, title, uploadTime).send({ from: this.state.account })
  }

  changeVideo = (hash, title, time, id) => {
    this.setState({'currentHash': hash});
    this.setState({'currentTitle': title});
    this.setState({'currentVideoTime': time})
    this.setState({'videoNumber': id})
  }

  constructor(props) {
    super(props)
    this.state = {
      buffer: '',
      account: '',
      youtube: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null,
      currentVideoTime: null,
      videoNumber: null
    }

    this.uploadVideo = this.uploadVideo.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.changeVideo = this.changeVideo.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar 
          account={this.state.account}
        />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              videos={this.state.videos}
              uploadVideo={this.uploadVideo}
              captureFile={this.captureFile}
              changeVideo={this.changeVideo}
              currentHash={this.state.currentHash}
              currentTitle={this.state.currentTitle}
              currentVideoTime = {this.state.currentVideoTime}
              videoNumber = {this.state.videoNumber}
            />
        }
      </div>
    );
  }
}

export default App;