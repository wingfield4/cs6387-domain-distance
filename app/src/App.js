import { useState } from 'react';
import styled from 'styled-components';

import api from './utilities/api';
import processDomains from './utilities/processDomains';

const App = () => {
  const [domainsText, setDomainsText] = useState('');
  const [domains, setDomains] = useState([]);
  const [results, setResults] = useState(null);

  const handleChangeDomainsText = (newDomainsText) => {
    setDomainsText(newDomainsText);
    setDomains(processDomains(newDomainsText));
  }

  const handleSubmit = async () => {
    const results = await api.analyzeDomains(domains)
      .then(res => {
        setResults(res.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  return (
    <Container>
      <LeftContainer>
        <h1>Domain-analyzer</h1>
        <DomainsTextArea
          value={domainsText}
          onChange={e => handleChangeDomainsText(e.target.value)}
        /><br />
        <button
          onClick={handleSubmit}
          disabled={domains.length === 0}
        >
          Check Domains
        </button>
      </LeftContainer>
      <RightContainer>
        <h3>Results</h3>
        <Divider />
        {results && 
          results.map((result, index) => (
            <ResultContainer key={index}>
              <span><b>{result.checkedDomain}</b> != {result.safeDomain}</span><br />
              <span style={{ fontSize: 12 }}>
                Levenshtein Distance: {result.distance}
              </span>
            </ResultContainer>
          ))
        }
      </RightContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LeftContainer = styled.div`
  min-width: 360px;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const RightContainer = styled.div`
  min-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, .34);
  margin-bottom: 16px;
`;

const DomainsTextArea = styled.textarea`

`;

const ResultContainer = styled.div`
  padding: 8px;
  background-color: rgba(255, 80, 80, .3);
`;
