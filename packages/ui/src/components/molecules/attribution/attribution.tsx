'use client';

import type { FC } from 'react';
import { Avatar, Badge } from '../../atoms';


type AttributionProps = {
  name: string;
  avatarSrc?: string;
  role?: {
    label: string;
    variant: 'navy' | 'cyan' | 'yellow' | 'teal' | 'orange';
  };
};

export const Attribution: FC<AttributionProps> = ({
  name,
  avatarSrc,
  role,
}) => {
  return (
    <div
      className="
        inline-flex items-center
        gap-1.5 lg:gap-3
      "
    >
      <Avatar src={avatarSrc} alt={name} />

      <div className="flex flex-col items-start gap-1">
        <div
          className="
            font-normal
            text-[16px] leading-6
            lg:text-[18px] lg:leading-7
            text-(--text-headings)
          "
        >
          {name}
        </div>

        {role && (
          <div
            className="
              [&_span]:text-[12px]
              [&_span]:leading-4.5
              lg:[&_span]:text-[14px]
              lg:[&_span]:leading-6
            "
          >
            <Badge
              label={role.label}
              variant={role.variant}
            />
          </div>
        )}
      </div>
    </div>
  );
};