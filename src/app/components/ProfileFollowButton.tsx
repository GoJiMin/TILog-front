"use client";

import { ProfileUser, SearchUser } from "../model/user";
import Button from "./ui/Button";
import useProfile from "../utils/hooks/profile";

type Props = {
  user: ProfileUser | SearchUser;
};

export default function ProfileFollowButton({ user }: Props) {
  const { userid, id } = user;
  const { user: loggedInUser } = useProfile();
  const showButton = loggedInUser && loggedInUser.id !== id;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find(
      (followingUser) => followingUser.userid === userid
    );

  const text = isFollowing ? "팔로잉" : "팔로우";

  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={() => {}}
          type={isFollowing ? "following" : "follow"}
        />
      )}
    </>
  );
}
