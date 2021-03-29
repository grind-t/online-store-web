import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

export interface RadioButtonProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
}

const Content = styled.span.attrs((props) => ({
  className: props.className,
}))`
  display: inline-block;
  padding: 0.5rem 1.43rem;
  font-weight: bold;
  line-height: 1.35;
  letter-spacing: 0.015em;
  color: #c4c4c4;

  input:checked + &,
  input:hover + & {
    border-radius: 0.35rem;
    background: white;
    box-shadow: 0 0.14rem 0.28rem rgba(0, 0, 0, 0.04);
    color: black;
  }

  input:focus + & {
    outline: 1px solid black;
  }
`

export default function RadioButton({
  label,
  className,
  ...rest
}: RadioButtonProps) {
  return (
    <label>
      <input type="radio" className="sr-only" {...rest} />
      <Content className={className}>{label}</Content>
    </label>
  )
}
