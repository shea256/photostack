import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';

import probe from 'probe-image-size'
import http from 'http'
import sizeOf from 'image-size'

class App extends Component {
  constructor(props) {
    super(props)

    let imageURLs = [
      "https://farm3.staticflickr.com/2567/5697107145_a4c2eaa0cd_o.jpg",
      "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
      "https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg",
      "https://farm6.staticflickr.com/5023/5578283926_822e5e5791_b.jpg"
    ]

    this.state = {
      photos: [],
      imageURLs: imageURLs,
      photoswipeOptions: {
        mainClass: 'pswp--minimal--dark',
        barsSize: { top:0, bottom:0 },
        captionEl: false,
        fullscreenEl: false,
        shareEl: false,
        bgOpacity: 0.85,
        tapToClose: true,
        tapToToggleControls: false     
      }
    }

    this.renderPhotos = this.renderPhotos.bind(this)
  }

  componentWillMount() {
    this.renderPhotos()
  }

  getThumbnailContent(item) {
    let ratio = item.w / item.h
    let height = 250
    let width = height * ratio
    return (
      <img src={item.thumbnail} width={width} height={height}/>
    )
  }

  renderPhotos() {
    let photos = this.state.photos

    this.state.imageURLs.forEach((imageURL) => {
      probe(imageURL).then((result) => {
        photos.push({
          src: imageURL,
          thumbnail: imageURL,
          w: result.width,
          h: result.height,
          title: ""
        })
        this.setState({
          photos: photos
        })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Photostack</h2>
        </div>
        <div style={{ margin: '10px' }}>
          <PhotoSwipeGallery
            items={this.state.photos}
            options={this.state.photoswipeOptions}
            thumbnailContent={this.getThumbnailContent}/>
        </div>
      </div>
    )
  }
}

export default App