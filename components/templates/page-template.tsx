import styled from 'styled-components';

const pageMargin = 10;

const PageTemplate = styled.div`
  min-height: calc(100vh - ${pageMargin * 2}px);
  margin: ${pageMargin}px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

export default PageTemplate;
export { pageMargin };
