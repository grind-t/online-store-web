import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  min-height: 3rem;
  padding: 0 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;

  :focus {
    outline: none;
  }

  :invalid {
    border: 1px solid red;
  }

  ::placeholder {
    color: #cacaca;
    text-align: center;
  }
`;

export default Input;
