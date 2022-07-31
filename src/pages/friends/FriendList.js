import Friend from "./Friend";
import "./FriendList.css"

function FriendList({friendListPackage}) {
  const {currentUser, userFriends, setShowFriends} = friendListPackage
  const showFriends = userFriends.map(friend => <Friend key={friend.id} friend_id={friend.id} friendListPackage={friendListPackage} />)

  return (
    <div id="friend-list">
      <div className="list-header">
        <p>{currentUser.username.slice(0, 1).toUpperCase()}{currentUser.username.slice(1)}'s friend list</p>
        <div className="exit-button" onClick={() => setShowFriends(false)}>
          <p>x</p>
        </div>
      </div>
      {showFriends}
      <div id="add-friend">
        <img id="add-friend-img" src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/000000/external-add-friend-friendship-wanicon-two-tone-wanicon.png" alt="add-friend-img"/>
      </div>
    </div>
  );
}

export default FriendList;