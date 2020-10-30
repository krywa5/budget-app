import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize'


const GlobalStyle = createGlobalStyle`
  ${normalize}

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    
    li + li {
      margin-left :${({ theme }) => theme.spacing.xs}px;
    }
  }
`;

export default GlobalStyle;