import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BtnSet = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.article`
  width: 100%;
  padding: 30px 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
`;

function List() {
  const btnSet = useRef(null);
  const [Sort, setSort] = useState("new");
  const [List, setList] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const item = {
      sort: Sort,
    };
    axios
      .post("/api/community/read", item)
      .then((res) => {
        if (res.data.success) {
          setList(res.data.communityList);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));

    if (Sort === "new") {
      btnSet.current?.children[0].classList.add("on");
      btnSet.current?.children[1].classList.remove("on");
    } else {
      btnSet.current?.children[1].classList.add("on");
      btnSet.current?.children[0].classList.remove("on");
    }
  }, [Sort]);

  return (
    <Layout name={"List"}>
      <BtnSet ref={btnSet}>
        <button onClick={() => setSort("new")}>최신순</button>
        <button onClick={() => setSort("")}> 게시순</button>
      </BtnSet>
      {Loaded ? (
        List.map((post) => {
          return (
            <Item key={post._id}>
              <h2>
                {/* 글목록의 링크 URL, 글 고유번호를 params로 전달 */}
                <Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
              </h2>

              <p>Writer: {post.writer.displayName}</p>
              {post.createdAt === post.updatedAt ? (
                <p>Posted: {post.createdAt.split("T")[0]}</p>
              ) : (
                <p>Updated: {post.updatedAt.split("T")[0]}</p>
              )}
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
