import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;  
    outline: none;
    box-sizing: border-box;
    border:1px solid red;
  }
  body{
    font-family: 'Rubik', sans-serif;
 
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    width: 6px;
    background: #bbb;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: purple;
  }
`;
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: 500ms;
`;
export const Button = styled.button`
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  outline: none;
  box-shadow: 6px 6px 12px ${({ theme }) => theme.shadow.bottom},
    -6px -6px 12px ${({ theme }) => theme.shadow.top};
  margin: 3rem;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
export default GlobalStyle;
