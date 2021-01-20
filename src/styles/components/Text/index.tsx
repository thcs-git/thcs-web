import styled from 'styled-components';

export const Title = styled.h3`
  color: var(--primary);
  margin-bottom: 30px;
  font-weight: 600;
`;

export const ElegibleLabel = styled.span`
  color: var(--success);
`;

export const NotElegibleLabel = styled.span`
  color: var(--danger);
`;

export const HighComplexityLabel = styled.span`
  color: var(--danger);
`;

export const MediumComplexityLabel = styled.span`
  color: var(--warning);
`;

export const LowerComplexityLabel = styled.span`
  color: var(--success);
`;

export const NoComplexityLabel = styled.span`
  color: var(--gray);
`;
