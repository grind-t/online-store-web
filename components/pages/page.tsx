import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  height: 9.29rem;
  border-bottom: 1px solid #f7f7f7;
`

const Page = styled.div`
  margin: 10px;
  min-height: calc(100vh - 20px);
  background-color: #ffffff;
  border-radius: 10px;
`
export { Page as default, Header }
