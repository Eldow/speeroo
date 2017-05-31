import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  n = <any>navigator;
  peer : any;

  ngOnInit() {
    this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
    this.n.getUserMedia({video:true, audio:true}, this.gotMedia.bind(this), function(){});
  }

  gotMedia(stream: any){
    var peer1 = new SimplePeer({ initiator: true, stream: stream })
    var peer2 = new SimplePeer()

    peer1.on('signal', function (data) {
      peer2.signal(data)
    })

    peer2.on('signal', function (data) {
      peer1.signal(data)
    })

    peer2.on('stream', function (stream) {
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video')
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  }

}
