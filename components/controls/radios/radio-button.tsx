import { accessible } from 'components/accessibility'
import { font14 } from 'components/typography'
import styled from 'styled-components'

const CustomRadio = styled.input.attrs({
  type: 'radio',
})`
  ${accessible}

  & + span {
    display: inline-block;
    padding: 0.5rem 1.43rem;
    color: #c4c4c4;
    ${font14}
    font-weight: bold;
  }

  &:checked + span,
  &:hover + span {
    border-radius: 0.35rem;
    background: white;
    box-shadow: 0 0.14rem 0.28rem rgba(0, 0, 0, 0.04);
    color: black;
  }

  &:focus + span,
  &:active + span {
    outline: 1px solid black;
  }
`

interface RadioButtonProps {
  label: string
  name: string
}

const RadioButton = ({ label, name }: RadioButtonProps) => {
  return (
    <label>
      <CustomRadio name={name} />
      <span>{label}</span>
    </label>
  )
}

export default RadioButton
export type { RadioButtonProps }
