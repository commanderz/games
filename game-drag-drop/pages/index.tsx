import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled, { StyledComponent } from "@emotion/styled";

import styles from '../styles/Home.module.css'
import { DropResult, DragDropContext, Droppable, Draggable, ResponderProvided, resetServerContext, DroppableProvided, DraggableProvided, DraggableLocation } from "react-beautiful-dnd";
import React, { useEffect, ReactDOM, useState } from 'react';




/*const Home: NextPage = () => {
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


*/

/*const Home2: NextPage = () => {
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
*/

const Home3: NextPage = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  useEffect(() => {
    setIsBrowser(process.browser);//заплатка для SSR+Drag-N-Drop
    //console.log('setIsBrowser = ' + isBrowser);
  }, []);
  interface Quote {
    id: string,
    content: string
  };
  interface Quotes {
    quotes: Quote[];
    selected: Quote[];
  };

  interface QuoteIndex {
    quote: Quote,
    index: number
  };

  const items: Quote[] = [

    {
      id: 'ta-1',
      content: 'Get stuff',
    },
    {
      id: 'ta-2',
      content: 'Get shoes',
    },
    {
      id: 'ta-3',
      content: 'Get books',
    },
  ];


  function initial(len: number, offset: number): Quote[] {
    return (
      Array.from({ length: len }, (v, k) => k).map(k => {
        const custom: Quote = {
          id: `id-${k + offset}`,
          content: `Quote ${k + offset}`
        };
        return custom;
      })
    );
  };




  const reorder = (list: Quote[], startIndex: number, endIndex: number): Quote[] => {
    const result: Quote[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid: number = 13;

  //div Образующий flex колонки
  const QuoteItemDev: StyledComponent<any, any, any> = styled.div`
  display: flex;
  user - select: none;
  flex - direction: row;
  align - content: stretch;
  justify - content: center;
  align - items: stretch;
  flex - wrap: wrap;
`;
  const QuoteItem: StyledComponent<any, any, any> = styled.div``/*`
  width: 200px;
  height: 50px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
  background-color:  lightblue;
  `*/;

  function Quote({ quote, index }: QuoteIndex): JSX.Element {
    return (
      <>{isBrowser ?
        <Draggable draggableId={quote.id
        } index={index} >
          {provided => (
            <QuoteItem className="card"
              ref={provided.innerRef}
              {...func2(provided)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {quote.content}
            </QuoteItem>
          )
          }
        </Draggable >
        : null}</>
    );
  };

  const QuoteList = React.memo(function QuoteList({ quotes }: any): JSX.Element {
    return quotes.map((quote: Quote, index: number) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });
  const QuoteSelectedList = React.memo(function QuoteList({ selected }: any): JSX.Element {
    return selected.map((quote: Quote, index: number) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });


  const [state, setState] = useState<Quotes>({ quotes: initial(10, 0), selected: initial(5, 10) });
  const id2List = {
    droppable: 'quotes',
    droppable2: 'selected'
  };
  function getList(id: string): Quote[] {
    if (id === 'droppable') { return state.quotes }
    else
      if (id === 'droppable2') { return state.selected }
      else return [];
    //return state[id2List[id]]; 
  };

  const move = (source: Quote[], destination: Quote[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: Quotes = { quotes: [], selected: [] };
    if (droppableSource.droppableId === 'droppable') {
      result.quotes = sourceClone;
      result.selected = destClone;
    } else
      if (droppableSource.droppableId === 'droppable2') {
        result.quotes = destClone;
        result.selected = sourceClone;
      }


    return result;
  };

  function onDragEnd(r: DropResult): void {
    if (!r.destination) {
      return;
    }
    if ((r.destination.index === r.source.index) && (r.destination.droppableId === r.source.droppableId)) {
      console.log('do nothing');
      return;
    }
    if (r.destination.droppableId === r.source.droppableId) {
      console.log('move src = ' + r.source.droppableId + ', idx=' + r.source.index);
      console.log('move dest = ' + r.destination.droppableId + ', idx=' + r.destination.index);
      const quote = reorder(
        //state.quotes,
        getList(r.source.droppableId),
        r.source.index,
        r.destination.index
      );
      console.log(quote);
      if (r.source.droppableId === 'droppable') {
        setState({ quotes: quote, selected: state.selected });
      } else
        if (r.source.droppableId === 'droppable2') {
          setState({ quotes: state.quotes, selected: quote });
        }
    } else {
      const result = move(
        getList(r.source.droppableId),
        getList(r.destination.droppableId),
        r.source,
        r.destination
      );
      setState(result);
    }

  }

  function func1(provided: DroppableProvided) { //console.log('drop contex=' + provided.droppableProps['data-rbd-droppable-context-id'] + ", id=" + provided.droppableProps['data-rbd-droppable-id']); return null; 
  };
  function func2(provided: DraggableProvided) { //console.log('drag contex=' + provided.draggableProps['data-rbd-draggable-context-id'] + ', id=' + provided.draggableProps['data-rbd-draggable-id']); return null; 
  };

  return (
    <>{isBrowser ?
      <DragDropContext onDragEnd={onDragEnd} dragHandleUsageInstructions=" test123"  >
        <QuoteItemDev>
          <Droppable droppableId="droppable" mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical"  >
            {provided => (
              <div {...func1(provided)} ref={provided.innerRef} {...provided.droppableProps} >
                <QuoteList quotes={state.quotes} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="droppable2" mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical"  >
            {provided => (
              <div {...func1(provided)} ref={provided.innerRef} {...provided.droppableProps} >
                <QuoteList quotes={state.selected} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </QuoteItemDev>
      </DragDropContext >
      : null}</>
  );
}

export default Home3;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  //console.log('reset on server side!');
  //resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  return { props: { data: [] } }
}

/*
export async function getStaticProps() {
  console.log('reset on server side!');
  resetServerContext();   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  return {
    props: {
      data: [],
    },
  };
}*/