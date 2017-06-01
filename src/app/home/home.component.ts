import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public router: Router, public auth: AuthService) {
  }

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
