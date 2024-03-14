type Props = {
  icon: React.ReactElement;
  isSelected?: boolean;
  type: string;
};

type IconType = Record<string, string>;

const iconStyle: IconType = {
  header: "px-[32px] py-[20px] transition-all hover:bg-neutral-200 rounded-md",
  action: "w-[68px] h-[68px]",
};

export default function Icon({ icon, isSelected, type }: Props) {
  return (
    <div
      className={`${iconStyle[type]} ${
        isSelected ? "text-black" : "text-neutral-400"
      }`}
    >
      {icon}
    </div>
  );
}
