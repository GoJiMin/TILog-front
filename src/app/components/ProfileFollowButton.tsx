"use client";

import useSWR from "swr";
import { HomeUser, ProfileUser, SearchUser } from "../model/user";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser | SearchUser;
};

export default function ProfileFollowButton({ user }: Props) {
  const { userid, id } = user;
  const { data: loggedInUser } = useSWR<HomeUser>("/api/profile");
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
