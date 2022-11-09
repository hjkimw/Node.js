import Layout from "./Layout";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Circle = styled.section`
  width: 300px;
  height: 300px;
  position: relative;

  article {
    width: 100%;
    height: 100%;
    background: pink;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.8);
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    animation: ani 15s linear infinite;
    animation-play-state: running;

    span {
      display: inline-block;
      position: absolute;
      font-family: Inconsolata, sans-serif;
      top: 50%;
      left: 50%;
      font-size: 20px;
      margin-top: -10px;
      margin-left: -5px;
    }
  }

  &:hover {
    p {
      animation-play-state: paused;
    }
  }

  @keyframes ani {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;

const MainList = styled.section`
  width: 100%;
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;

  article {
    width: 31%;
    height: 200px;
    background: #fff;
    padding: 40px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;

    h1 {
      width: 100%;
    }
    .info {
      width: 100%;
    }
  }
`;

function Main() {
  const txt = useRef(null);
  const [List, setList] = useState([]);

  useEffect(() => {
    txt.current.innerHTML = txt.current.innerText
      .split("")
      .map(
        (letter, idx) =>
          `<span style='transform:rotate(${
            idx * 5.5
          }deg) translateY(-150px)'>${letter}</span>`
      )
      .join("");

    const item = { count: 3 };
    axios
      .get(`/api/community/read/?count=${item.count}`)
      .then((res) => res.data.success && setList(res.data.communityList))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout name={"Main"}>
      <Circle>
        <article></article>
        <p ref={txt}>
          Lorem ipsum dolor sit amet consectur adipisicing elit. Cum, est?
        </p>
      </Circle>

      <MainList>
        {List.map((post) => (
          <article key={post._id}>
            <h2>
              <Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
            </h2>

            <div className="info">
              <p className="writer">Writer: {post.writer.displayName}</p>
              {post.createdAt === post.updatedAt ? (
                <p>Posted: {post.createdAt.split("T")[0]}</p>
              ) : (
                <p className="date">Updated: {post.updatedAt.split("T")[0]}</p>
              )}
            </div>
          </article>
        ))}
      </MainList>
    </Layout>
  );
}

export default Main;
