

import type { FC } from 'react';
import { Icon } from '../../atoms';
import { badgeStyles } from './styles';

type BadgeProps = {
  tone?: 'primary' | 'secondary';
  label?: string;
  icon?: string;
  iconPosition?: 'start' | 'end';
};

const BadgeIcon: FC<{icon: string}> = ({ icon }) =>
  icon && (
    <div className="">
      <Icon icon={icon} className="size-2.5 md:size-[14px]" />
    </div>
  );

const Badge: FC<BadgeProps> = ({ tone, label, icon, iconPosition }) => (
  <div className={badgeStyles({ tone, iconPosition: icon && iconPosition ? iconPosition : undefined })}>
    {icon && iconPosition === 'start' && <BadgeIcon icon={icon} />}
    {label}
    {icon && iconPosition === 'end' && <BadgeIcon icon={icon} />}
  </div>
);

export default Badge;
