import React from "react";

const ChatList = ({ chatList, classes }) => {
  return (
    <div>
      {chatList.map((chat, i) => {
        return chat.from === "server:entrance" ? (
          <div className={classes.server} key={i}>
            <span className={classes.entrance}>{chat.msg}</span>
            <span>님이 입장하셨습니다</span>
          </div>
        ) : (
          <div
            className={classes.flex}
            key={i}
            // eslint-disable-next-line
            className={classes.messageWrapper}
          >
            <div className={classes.chatFrom}>{chat.from} :</div>
            <div className={classes.chatMsg}>{chat.msg}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
