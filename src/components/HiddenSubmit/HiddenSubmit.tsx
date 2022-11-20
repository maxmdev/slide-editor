import * as React from 'react';
import styled from 'styled-components';

const HiddenSubmitButton = styled.button`
  display: none;
`;

export const HiddenSubmit = () => {
  return <HiddenSubmitButton type="submit" />;
};
