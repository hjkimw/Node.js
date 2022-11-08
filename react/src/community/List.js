import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.article`
  width: 100%;
  padding: 30px 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
`;

function List() {
  const [List, setList] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post("/api/community/read")
      .then((res) => {
        if (res.data.success) {
          setList(res.data.communityList);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    console.log(List);
  }, [List]);

  /*
  useEffect(() => {
    List.length !== 0 && setLoaded(true);
  }, [List])
  */

  return (
    <Layout name={"List"}>
      {Loaded ? (
        List.map((post) => {
          return (
            <Item key={post._id}>
              <h2>
                {/* 글목록의 링크 URL, 글 고유번호를 params로 전달 */}
                <Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
              </h2>

              <span>Writer: {post.writer.displayName}</span>
            </Item>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}

export default List;
