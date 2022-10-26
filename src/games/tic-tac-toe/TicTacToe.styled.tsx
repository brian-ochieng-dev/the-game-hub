import styled from "styled-components";

export const Table = styled.div`
  height: 500px;
  width: 500px;
  align-items: center;
  display: grid;
  position: relative;
  grid-template-columns: repeat(3, auto);
`;

export const Cell = styled.div`
  font-size: 5rem;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: #7e6953;
  background: linear-gradient(145deg, #e2e8ec, #ffffff);
  box-shadow: 4px 4px 8px #cbcbcb, -4px -4px 8px #ffffff;
  margin: 12px;

  &:active {
    box-shadow: 2px 2px 4px #cbcbcb, -2px -2px px #ffffff;
  }
`;

export const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  line-height: 1.1;
  font-weight: 600;
  grid-column: span 3;
`;
