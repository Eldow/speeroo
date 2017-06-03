import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user/user.class';

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

  ngOnInit(){
    let conn = this.peer.connect(this.friend.peerId);
    console.log("init");
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
