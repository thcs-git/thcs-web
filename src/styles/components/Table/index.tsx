import styled from 'styled-components';

interface ITableCellInterface {
  center?: boolean
}

interface IComplexityStatus {
  status?: string;
}

export const Table = styled.table`
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-spacing: 0;
  margin-bottom: 40px;

  & td, & th {
    padding: 10px;
  }
`;

export const Td = styled.td<ITableCellInterface>`
  text-align: ${props => props.center ? 'center' : 'left'};
  border-top: 1px solid #ccc;
`;

export const ComplexityStatus = styled.div<IComplexityStatus>`
  color: ${(props) => {
    switch (props.status) {
      case 'Baixa Complexidade':
        return `var(--success)`;
      case 'Alta Complexidade':
        return `var(--danger)`;
      case 'Média Complexidade':
        return `var(--yellow)`;
      default:
        return `var(--black)`;
    }
  }};

  display: flex;
  align-items: center;
  justify-items: center;
`;

export const Th = styled.td<ITableCellInterface>`
    font-weight: normal;
    color: #666;
    text-align: ${props => props.center ? 'center' : 'left'}
`;
