import { useState } from "react";
import Button from "./ui/Button";
import { revalidateSearch } from "../utils/actions/search";
import useSearch from "../utils/hooks/search";
import PulseSpinner from "./ui/PulseSpinner";

type Props = {
  userId: string;
  searchUserId: string;
  isFollowing: boolean;
};

export default function SearchFollowButton({
  userId,
  searchUserId,
  isFollowing,
}: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const showButton = userId && userId !== searchUserId;
  const text = isFollowing ? "팔로잉" : "팔로우";
  const type = isFollowing ? "following" : "follow";

  const { toggleFollow } = useSearch();

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(searchUserId, !isFollowing);
    setIsFetching(false);
    revalidateSearch(searchUserId);
  };
  return (
    <>
      {showButton && (
        <div className="relative">
          {isFetching && <PulseSpinner size="small" />}
          <Button
            disabled={isFetching}
            text={text}
            onClick={handleFollow}
            size={"small"}
            type={type}
          />
        </div>
      )}
    </>
  );
}
