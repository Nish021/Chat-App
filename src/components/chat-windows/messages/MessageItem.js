import React from "react";
import ProfileAvatar from "../../dashboard/ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import { Link } from "react-router-dom";
import PresenceDot from "../../PresenceDot";
import IconBtnControl from "./IconBtnControl";
import { auth } from "../../../misc/firebase";
import { useMediaQuery } from "../../../misc/custom-hooks";

const MessageItem = ({ message, handleLike }) => {
  const { author, createdAt, text, likes, likeCount } = message;
  // const [selfRef, isHovered] = useHover();
  // const isMobile = useMediaQuery("(max-width: 992px)");
  // const canShowIcons = isMobile;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />

        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        {/* <span className="ml-2">{author.name}</span> */}
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
        <TimeAgo
          datetime={createdAt}
          className="font-formal text-black-45 ml-2"
        />

        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />

        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
      </div>

      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
