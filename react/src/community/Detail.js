import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';

const DetailWrap = styled.div`
  width: 100%;
  padding: 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.02);
`

function Detail() {
  const params = useParams();
  const [Detail, setDetail] = useState(null);

  const item = {
    num: params.num
  }

  useEffect(() => {
    axios.post('/api/community/detail', item)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.detail);
          setDetail(res.data.detail);
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <Layout name={'Detail'}>
      {Detail && (
        <DetailWrap>
          <h2>{Detail.title}</h2>
          <p>{Detail.content}</p>
        </DetailWrap>
      )}
    </Layout>
  );
}

export default Detail;
