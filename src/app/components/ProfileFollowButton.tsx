"use client";

import { ProfileUser, SearchUser } from "../model/user";
import Button from "./ui/Button";
import useProfile from "../utils/hooks/profile";
import { useState } from "react";
import { revalidateProfile } from "../utils/actions/profile";
import PulseSpinner from "./ui/PulseSpinner";

type Props = {
  user: ProfileUser | SearchUser;
};

export default function ProfileFollowButton({ user }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const { userid, id } = user;
  const { user: loggedInUser, toggleFollow } = useProfile();
  const showButton = loggedInUser && loggedInUser.id !== id;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find(
      (followingUser) => followingUser.userid === userid
    );

  const text = isFollowing ? "팔로잉" : "팔로우";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(id, !isFollowing);
    setIsFetching(false);
    revalidateProfile(userid);
  };

  return (
    <>
      {showButton && (
        <div className="w-full relative">
          {isFetching && <PulseSpinner />}
          <Button
            disabled={isFetching}
            text={text}
            onClick={handleFollow}
            type={isFollowing ? "following" : "follow"}
          />
        </div>
      )}
    </>
  );
}
