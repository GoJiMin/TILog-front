import Button from "./ui/Button";

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
  const showButton = userId && userId !== searchUserId;
  const text = isFollowing ? "팔로잉" : "팔로우";
  const type = isFollowing ? "following" : "follow";
  return (
    <>
      {showButton && (
        <Button text={text} type={type} onClick={() => {}} size={"small"} />
      )}
    </>
  );
}
