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
  mediaStream: any;
  n = <any>navigator;
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
      this.mediaStream = stream;
    }, err => { console.log(err); });

    // Fill the peerId of each friend
    this.userService.getUserByUserId(this.friend.userId).subscribe(data => {
      this.friend.peerId = data.peerId;
    });

    // Test if connection opened
    this.peer.on('open', function(){
      console.log(this.peer.id);
    });

    // Log errors
    this.peer.on('error', err => {
      console.log(err);
    });

    // Always listen for incoming calls
    this.peer.on('call', call => {
      this.isCalling = true;
      this.currentCall = call;
    });
  }

  // Call a friend
  public call(friend:User){
    this.callAccepted = true;
    this.isCalling = true;
    this.currentCall = this.peer.call(friend.peerId, this.mediaStream);
    this.currentCall.on('stream', function(stream){
      this.theirVideo.src = URL.createObjectURL(stream);
    });
  }

  // Answer a call
  public answer(friend:User){
    this.callAccepted = true;
    this.isCalling = true;
    this.currentCall.answer(this.mediaStream);
    this.currentCall.on('stream', function(stream){
      this.theirVideo.src = URL.createObjectURL(stream);
    });
  }

  // Decline a call
  public decline(friend:User){
    this.currentCall.close();
    this.callAccepted = false;
    this.isCalling = false;
  }
}
