
import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
        
          <div className="col-md-5 border overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>
            <h5 style={{marginTop: '15px'}}><b>Upload Video</b></h5>
            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.videoTitle.value
              this.props.uploadVideo(title)
            }} >
              &nbsp;
              <div className="form-group">
                <input placeholder='Paste Video Link' id="exampleInputLink" className="form-control" type='text' onChange={this.props.captureFile} />
              </div>
                <div className="form-group">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { this.videoTitle = input }}
                    className="form-control"
                    placeholder="Enter Title..."
                    required />
                </div>
              <button type="submit" className="btn btn-success btn-block btn-sm">Upload!</button>
              &nbsp;
            </form>
            <div className="row row-content">
            { this.props.videos.map((video, key) => {
              return(
                
                  <div style={{    
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "center"
                    }} 
                    className="col-xl-6 col-lg-12 col-md-12 col-sm-12 my-4">
                    <div className="card" style={{width: '20rem', borderRadius: '15px'}} key={key} >
                      <div style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}} className="card-img-top">
                        <iframe
                            style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}
                            width="100%"
                            height="200"
                            src={`${video.hash}`}
                          >
                        </iframe>
                      </div>
                      <div className="card-body">
                        <div className="card-title">
                          <p>Title: <b>{video.title}</b></p>
                          <p>Video Number: <b>{video.id}</b></p>
                          <p>Upload Time: <small>{video.time.slice(0, 25)}</small></p>
                        </div>
                        <button class="btn btn-primary" onClick={() => this.props.changeVideo(video.hash, video.title, video.time, video.id)}>View</button>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
              )
            })}
            </div>
          </div>
          <div className="col-md-7">
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
                <iframe
                  style={{borderRadius: '15px'}}
                  src={`${this.props.currentHash}`}
                  controls
                >
                </iframe>
              </div>
              <br></br><hr></hr>
            <div>
              <h3 style={{marginTop: "2rem"}}><b>Title: {this.props.currentTitle}</b></h3>
              <p>Video Number: {this.props.videoNumber}</p>
              <p>Upload Time: {this.props.currentVideoTime}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;





















// https://www.youtube.com/watch?v=PpYaLhGS9y4
// https://drive.google.com/file/d/1i-VaP4x0ti-LzmvNw_EGYBe8rWmlOjJX/view?usp=share_link























// tp
