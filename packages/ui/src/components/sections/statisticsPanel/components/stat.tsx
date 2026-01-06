import { type FC } from 'react';

interface StatProps {
  value: string;
}

const Stat: FC<StatProps> = ({ value }) => {
  return <span>{value}</span>;
};

export default Stat;
