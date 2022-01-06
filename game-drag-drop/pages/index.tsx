import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from "@emotion/styled";

import styles from '../styles/Home.module.css'
import { DropResult, DragDropContext, Droppable, Draggable, ResponderProvided } from "react-beautiful-dnd";
import React, { ReactDOM, useState } from 'react';



const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
};




const Home2: NextPage = () => {
  interface IData {
    id: string,
    content: string
  }


  const getItems = (count: number): IData[] =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k}`,
      content: `item ${k}`
    }));

  const reorder = (list: IData[], startIndex: number, endIndex: number): IData[] => {
    const result: IData[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const grid: number = 8;
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  });

  const [items, setItems] = useState(getItems(10));

  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items2: IData[] = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(items2);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

}

const Home3: NextPage = () => {
  interface Quote {
    id: string,
    content: string
  };
  interface Quotes {
    quotes: Quote[];
  };

  interface QuoteIndex {
    quote: Quote,
    index: number
  };

  const initial: Quote[] = Array.from({ length: 10 }, (v, k) => k).map(k => {
    const custom: Quote = {
      id: `id-${k}`,
      content: `Quote ${k}`
    };
    return custom;
  });



  const reorder = (list: Quote[], startIndex: number, endIndex: number): Quote[] => {
    const result: Quote[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid: number = 8;

  const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
  `;

  function Quote({ quote, index }: QuoteIndex): JSX.Element {
    return (
      <Draggable draggableId={quote.id} index={index}>
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {quote.content}
          </QuoteItem>
        )}
      </Draggable>
    );
  };

  const QuoteList = React.memo(function QuoteList({ quotes }: any): JSX.Element {
    return quotes.map((quote: Quote, index: number) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });

  const [state, setState] = useState<Quotes>({ quotes: initial });

  function onDragEnd(result: DropResult, provided: ResponderProvided): void {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    //provided.announce('test');
    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );
    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext >
  );
}

export default Home3;