import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ShareButtons } from "../../molecules";

type ProfileType = "bio" | "speaker";

export interface ProfileProps {
  type?: ProfileType;
  name: string;
  description: string;
  image: string;
  shareButtons?: {
    pathName: string;
    title: string;
  };
  className?: string;
}

export const Profile: FC<ProfileProps> = ({
  type = "bio",
  name,
  description,
  image,
  shareButtons,
  className,
}) => {
  const isBio = type === "bio";

  return (
    <div
      className={twMerge(
        "flex flex-col gap-6 border border-(--stroke-secondary) bg-(--surface-secondary-background) p-6 sm:p-8",
        className
      )}
    >
      <div
        className={twMerge(
          "flex flex-col items-start sm:flex-row",
          isBio ? "gap-8 " : "gap-6 items-center" 
        )}
      >
        <div
          className={twMerge(
            "overflow-hidden rounded-full shrink-0",
            isBio
              ? "h-22.5 w-22.5 sm:h-44.5 sm:w-44.5"
              : "h-32 w-32" 
          )}
        >
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover block"
          />
        </div>

        <div>
          <p
            className={twMerge(
              "text-(--text-headings)",
              isBio ? "text-display-2xl text-[30px]!" : "text-display-xl text-[24px]!"
            )}
          >
            {name}
          </p>

          <p
            className={twMerge(
              " text-(--text-body-dark)",
              isBio ? "text-sm mt-6" : "text-lg mt-4"
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {isBio && shareButtons && (
        <div className="border-t border-(--stroke-secondary) pt-6">
          <ShareButtons
            pathName={shareButtons.pathName}
            title={shareButtons.title}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
