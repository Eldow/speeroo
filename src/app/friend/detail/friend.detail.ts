import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'friend-detail',
  templateUrl: './friend.detail.html',
  styleUrls: ['./friend.detail.css']
})

export class FriendDetail implements OnInit{
  @ViewChild('myVideo') myVideo: any;
  @ViewChild('theirVideo') theirVideo: any;
  @Input() friend: User;
  @Input() peer: any;
  n = <any>navigator;
  w = <any>window;
  isCalling: boolean;
  callAccepted: boolean;
  currentCall: any;

  constructor(public userService: UserService) {}

  ngOnInit(){
    this.myVideo = this.myVideo.nativeElement;
    this.theirVideo = this.theirVideo.nativeElement;
    this.isCalling = false;
    this.callAccepted = false;
    this.n.getUserMedia =  ( this.n.getUserMedia || this.n.webkitGetUserMedia
       || this.n.mozGetUserMedia || this.n.msGetUserMedia );

    // Send stream to my video container
    this.n.getUserMedia({audio: true, video: true}, stream => {
      this.myVideo.src = URL.createObjectURL(stream);
      this.w.localStream = stream;
    }, err => { console.log(err); });

    // Fill the peerId of each friend
    this.userService.getUserByUserId(this.friend.userId).subscribe(data => {
      this.friend.peerId = data.peerId;
    });

    // Log errors
    this.peer.on('error', err => {
      console.log('Peer error', err);
    });

    // Always listen for incoming calls
    this.peer.on('call', call => {
      this.isCalling = true;
      this.currentCall = call;
      call.answer(this.w.localStream);
      this.currentCall.on('stream', stream => {
        this.theirVideo.src = URL.createObjectURL(stream);
      }, err => {
        console.log('Failed to get stream', err);
      });
    });

  }

  // Call a friend
  public call(friend:User){
    this.callAccepted = true;
    this.currentCall = this.peer.call(friend.peerId, this.w.localStream);
    this.displayTheirStream();
  }

  // Answer a call
  public answer(){
    this.callAccepted = true;
    this.currentCall.answer(this.w.localStream);
    this.displayTheirStream();
  }

  // Display your friend's stream
  private displayTheirStream(){
    console.log(this.currentCall);

  }

  // Decline a call
  public decline(){
    this.currentCall.close();
    this.callAccepted = false;
    this.isCalling = false;
  }
}
