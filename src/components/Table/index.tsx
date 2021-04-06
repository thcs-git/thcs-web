import React, { ReactNode, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '../Button';
import { MenuFilter as Menu, Th} from './styles';

interface ICellProps {
  name: string, align: 'right' | 'left' | 'center', width?:string

}

interface ITableProps {
  tableCells: ICellProps[];
  hasFilter?: boolean;
  fieldsFilter?: Array<string>;
  onChangeFilter?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}


const TableComponent = (props: ITableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.tableCells.map((cell, index) => (
              <TableCell key={`cell_${index}`} align={cell.align} style={{width:`${cell.width}`}} >{cell.name}</TableCell>
            ))}

            {props.hasFilter && (
              <Th>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} size="small">
                  <FilterListIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <p>Filtrar resultados por</p>
                  {props.fieldsFilter?.map((field, fieldIndex) => (
                    <li key={`fields_filter_${fieldIndex}`}>
                      <Checkbox name={field} onChange={props.onChangeFilter} />
                      {field}
                    </li>
                  ))}
                </Menu>
              </Th>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(TableComponent);
