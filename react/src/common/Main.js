import Layout from './Layout';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';

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
`

function Main() {
  const txt = useRef(null);

  useEffect(() => {
    txt.current.innerHTML = txt.current.innerText
      .split('')
      .map((letter, idx) => `<span style='transform:rotate(${idx * 5.5}deg) translateY(-150px)'>${letter}</span>`)
      .join('');
  }, [])

  return (
    <Layout name={'Main'}>
      <Circle>
        <article></article>
        <p ref={txt}>Lorem ipsum dolor sit amet consectur adipisicing elit. Cum, est?</p>
      </Circle>
    </Layout>
  );
}

export default Main;
