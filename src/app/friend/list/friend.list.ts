import { Component, OnInit, ViewChild } from '@angular/core';
import { FriendlistService } from '../friendlist.service';
import { Friendlist } from '../friendlist.class';
import { User } from '../../user/user.class';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'friend-list',
  templateUrl: './friend.list.html',
  styleUrls: ['./friend.list.css']
})

export class FriendList {

  @ViewChild('myVideo') myVideo: any;
  @ViewChild('theirVideo') theirVideo: any;
  n = <any>navigator;
  w = <any>window;

  friendlist: Friendlist
  peer = new Peer({host: 'speeroo.herokuapp.com', secure:true, port:443, path: '/peerjs' });
  id: any;
  //peer = new Peer({key: 'l23p62b0pco9a4i'});
  response : any;

  constructor(public friendlistService : FriendlistService,
    public router: Router, public auth: AuthService,
    public userService: UserService) {
  }

  ngOnInit(){
    // Vars
    this.myVideo = this.myVideo.nativeElement;
    this.theirVideo = this.theirVideo.nativeElement;
    this.n.getUserMedia =  ( this.n.getUserMedia || this.n.webkitGetUserMedia
       || this.n.mozGetUserMedia || this.n.msGetUserMedia );
    let profile = JSON.parse(localStorage.getItem('profile'));
    // Store the peerId in database
    this.peer.on('open', id => {
      this.id = id;
      this.userService.updateUser({"name": profile.nickname,
       "userId": profile.user_id, "peerId": id})
       .subscribe(response => {this.response = response});
    });
    // Log errors
    this.peer.on('error', err => {
      console.log('Peer error', err);
    });
    // Always listen for incoming calls
    this.peer.on('call', call => {
      this.n.getUserMedia({audio: true, video: true}, stream => {
        this.myVideo.src = URL.createObjectURL(stream);
        this.w.localStream = stream;
        call.answer(this.w.localStream);
      }, err => { console.log('Get media error', err); });

      call.on('stream', stream => {
        this.theirVideo.src = URL.createObjectURL(stream);
      }, err => {
        console.log('Failed to get stream', err);
      });
    });
    // Connect to friend
    this.peer.on('connection', conn => {
      conn.on('data', data => {
        console.log('Connection data', data);
      });
    });
    // Retrieve the friendlist
    this.friendlistService.retrieveFriendlist(profile.user_id).subscribe(data => {
      if(data._body == "null") {
        console.log("New friendlist needs to be created");
        this.friendlistService.createFriendlist({"owner": { "name": profile.nickname,
        "userId": profile.user_id }}).subscribe(data => {
          this.friendlist = data;
        })
      } else {
        console.log("Friendlist has been found");
        this.friendlist = data.json();
      }
    });
  }

  public onFriendCalled(friend: User){
    let conn = this.peer.connect(friend.peerId, {reliable:true});

    conn.on('open', () => {
      conn.send('Hi!');
    });
    conn.on('error', function(err) {
        console.log('Error', err)
    });
    conn.on('data', function(data) {
        console.log('Received', data);
    });

    this.n.getUserMedia({audio: true, video: true}, stream => {
      this.myVideo.src = URL.createObjectURL(stream);
      let call = this.peer.call(friend.peerId, stream);
      call.on('stream', stream => {
        this.theirVideo.src = URL.createObjectURL(stream);
      }, err => {
        console.log('Failed to get stream', err);
      });
    }, err => { console.log('Get media error', err); });
  }

  public addFriend(friend: User){
    this.friendlist.list.push(friend);
    this.friendlistService.updateFriendlist(this.friendlist).subscribe(data => {
      console.log(data);
    });
  }
}
