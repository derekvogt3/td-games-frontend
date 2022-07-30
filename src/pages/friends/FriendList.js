import Friend from "./Friend";
import "./FriendList.css"

function FriendList({friendListPackage}) {
  const {userFriends} = friendListPackage
  const showFriends = userFriends.map(friend => <Friend key={friend.id} friend={friend} />)

  return (
    <div id="friend-list">
      {showFriends}
      <div id="add-friend">
        <img id="add-friend-img" src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/000000/external-add-friend-friendship-wanicon-two-tone-wanicon.png" alt="add-friend-img"/>
      </div>
    </div>
  );
}

export default FriendList;