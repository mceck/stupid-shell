import styled from 'styled-components';
import { shellColors } from '../shell-colors';

export const FormErr = styled.span`
  color: #ff4141;
  display: inline-block;
`;

export const ShellLabel = styled.label`
  display: block;
  margin-top: 20px;
  color: #dedede;
`;

export const FormGroup = styled.div`
  :hover {
    input,
    textarea {
      border-color: #ffffff;
    }
    label {
      color: #ffffff;
    }
  }

  input,
  textarea {
    :focus,
    :active {
      border-color: #ffffff;
    }
  }
`;

export const ShellInput = styled.input<{ $error: boolean }>`
  width: 260px;
  margin-right: 10px;
  border: none;
  background: none;
  outline: none;
  color: #eaeaea;
  font-size: 0.75rem;
  font-weight: 700;
  border-bottom: 2px solid
    ${({ $error }) => ($error ? shellColors.red : '#dedede')};
`;

export const ShellTextarea = styled.textarea<{ $error: boolean }>`
  width: 260px;
  margin-right: 10px;
  border: none;
  background: none;
  outline: none;
  color: #eaeaea;
  font-size: 0.75rem;
  font-weight: 700;
  border-bottom: 2px solid
    ${({ $error }) => ($error ? shellColors.red : '#dedede')};
`;

export const ShellButton = styled.button`
  padding: 2px 15px;
  margin: 20px 10px 20px 0;
  border: none;
  outline: none;
  background-color: #eaeaea;
  color: #1f1e1e;
  cursor: pointer;
  :not(:disabled):hover {
    background-color: #ffffff;
  }
`;
