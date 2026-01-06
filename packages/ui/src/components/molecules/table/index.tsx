
import type { FC } from 'react';
import { tableHeaderStyle } from './styles';

export type TableProps = {
  _type: string;
  _key: string;
  headers?: {_key: string, alignment?: 'left' | 'center', text?: string}[];
  rows?: {_key: string, cells?: {_key: string, content?: string}[]}[];
};

const TableModule: FC<TableProps> = ({ headers, rows }) => (
  <table className="w-full border-separate border-spacing-0 rounded-lg bg-primary">
    <thead>
      {headers && (
        <tr>
          {headers.map((row, index) => (
            <th
              key={row._key}
              className={tableHeaderStyle({ isFirst: index === 0, isLast: index === headers.length - 1, alignment: row.alignment })}
            >
              <span className="font-medium text-heading-invert">{row.text}</span>
            </th>
          ))}
        </tr>
      )}
    </thead>
    {rows && (
      <tbody>
        {rows.map((row, index) => (
          <tr key={row._key}>
            {row.cells &&
              row.cells.map(cell => (
                <td key={`cell-${row._key}-${cell._key}`} className={`px-2 py-4 text-md leading-normal text-copy ${index === 0 ? '' : 'border-t border-neutral-200 dark:border-purple-500'}`}>
                  {cell.content}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    )}
  </table>
);

export default TableModule;
