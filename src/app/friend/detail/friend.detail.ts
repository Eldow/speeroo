import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'friend-detail',
  templateUrl: './friend.detail.html',
  styleUrls: ['./friend.detail.css']
})


export class FriendDetail implements OnInit{
  @Input()
  friend: User;
  @Input()
  peer: any;
  mediaStream: any;

  constructor(public userService: UserService) {

  }

  ngOnInit(){
    this.userService.getUserByUserId(this.friend.userId).subscribe(data => {
      this.friend.peerId = data.peerId;
    })

    let conn = this.peer.connect(this.friend.peerId);
    /*this.peer.on('connection', function(dataConn) {
      console.log(dataConn);
    });

    conn.on('open', function() {
      // Receive messages
      conn.on('data', function(data) {
        console.log('Received', data);
      });

      // Send messages
      conn.send('Hello!');
    });*/
    conn.on('open', function(){
      console.log("connect to peer");
      conn.send("Hello");
      console.log('data sent');
    });

    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        console.log("received complete: ", Date());
      });
    });

  }

  public call(friend:User){
    let call = this.peer.call(friend.peerId, this.mediaStream);
  }

  public answer(friend:User){
    this.peer.on('call', function(call) {
      call.answer(this.mediaStream);
    });
  }

  public decline(friend:User){
    this.peer.on('call', function(call) {
      call.close();
    });
  }

  public isCalling(){
    return true;
  }
}
