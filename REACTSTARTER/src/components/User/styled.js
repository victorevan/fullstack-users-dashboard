import styled from 'styled-components';
import { Card, List } from 'semantic-ui-react';

export const UserList = styled(List)`
`;

UserList.Content = styled(List.Content)`
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 8px;
`;

UserList.Content.Wrapper = styled.div`
  position: relative;
  flex: 1 1;
  display: flex;
  align-items: center;

  .description {
    justify-content: center;
  }

  button {
    position: absolute;
    right: 0;
  }
`;

export const UserCard = styled(Card)`
`;

UserCard.Content = styled(Card.Content)`
  ${({ center }) => center && `
    display: flex;
    justify-content: center;
  `}
`;