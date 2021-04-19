import { InputHTMLAttributes } from 'react'
import { useUID } from 'react-uid'
import VisuallyHidden from 'components/shared/atoms/visually-hidden'
import styled from 'styled-components'

const CustomInput = ({
  id,
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  const uid = id || useUID()
  return (
    <>
      <VisuallyHidden as="input" id={uid} {...rest} />
      <label htmlFor={uid} className={className}>
        {children}
      </label>
    </>
  )
}

const Styled = styled(CustomInput)`
  display: inline-block;
`

export default Styled
