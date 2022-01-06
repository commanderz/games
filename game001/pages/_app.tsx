import React, { useState, Component } from "react";
//import "./App.css";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { isDataView } from 'util/types';
import { randomInt } from 'crypto';

import { Accordion, Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
//function MyApp({ Component, pageProps }: AppProps) {
//  return <Component {...pageProps} />
//}












// App.tsx
// Kindacode.com

/*
const PHOTO_URL =
  "https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg";

const MyApp: React.FunctionComponent = () => {
  // The content of the target box
  const [content, setContent] = useState<string>("Drop Something Here");

  // This function will be triggered when you start dragging
  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: string
  ) => {
    event.dataTransfer.setData("text", data);
  };

  // This function will be triggered when dropping
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    setContent(data);
  };

  // This makes the third box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div
        className="box1"
        onDragStart={(event) => dragStartHandler(event, PHOTO_URL)}
        draggable={true}
      >
        <img src={PHOTO_URL} alt="Cute Dog" />
      </div>

      <div
        className="box2"
        onDragStart={(event) => dragStartHandler(event, "Kindacode.com")}
        draggable={true}
      >
        <h2>Kindacode.com</h2>
      </div>

      <div className="box3" onDragOver={allowDrop} onDrop={dropHandler}>
        {content.endsWith(".jpeg") ? <img src={content} /> : <h2>{content}</h2>}
      </div>
    </div>
  );
};*/

interface iDropList {
  source: any;
  target: any;
}


function MyApp({ Component, pageProps }: AppProps) {
  //const MyApp: React.FunctionComponent = () => {
  let DRAG_THRESHOLD: number, Draggable, DropTarget, DropTargets, Example, LEFT_BUTTON: number, SourceObject //, SourceObjects, div, p,
  //indexOf = [].indexOf;

  //({ div, p } = React.DOM);

  LEFT_BUTTON = 0;

  DRAG_THRESHOLD = 3; // pixels

  /*document.addEventListener('DOMContentLoaded', function () {
    return React.renderComponent(Example(), document.body);
  });*/

  const [currentDragItem, setcurrentDragItem] = useState(null);
  const [lastDrop, setlastDrop] = useState<iDropList>({ source: null, target: null });
  /*function funExample() {
    function getInitialState(): any {
      return {
        currentDragItem: null
      };
    }
  }*/




  function onDragStart(details: any): any {
    setcurrentDragItem(details);
    return currentDragItem;
    //return this.setState({ currentDragItem: details });

  }

  function onDragStop(): any {
    setcurrentDragItem(null);
    return currentDragItem;

  };
  function onDrop(target: any): any {
    setlastDrop({ source: currentDragItem, target })
    return lastDrop;
  };

  function dropDescription() {
    let drop: any;
    if (drop = lastDrop) {
      return {
        className: 'drop-description',
        children: `Dropped source ${drop.source.type}-${drop.source.index} on target ${drop.target.index}`
      }
    }
  }
  /*      dropDescription: function () {
            var drop;
            if (drop = this.state.lastDrop) {
              return p({
                className: 'drop-description',
                children: `Dropped source ${drop.source.type}-${drop.source.index} on target ${drop.target.index}`
              });
            }
          }
        });*/

  function SourceObjects() {



  }
  /*      
          SourceObjects = React.createClass({
            render: function () {
              var i, object;
              return div({
                className: 'dnd-source-objects',
                children: (function () {
                  var j, len, ref, results;
                  ref = this.objects();
                  results = [];
                  for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    object = ref[i];
                    results.push(SourceObject({
                      type: object.type,
                      index: i + 1,
                      children: i + 1,
                      onDragStart: this.props.onDragStart,
                      onDragStop: this.props.onDragStop
                    }));
                  }
                  return results;
                }).call(this)
              });
            },
            objects: function () {
              var i;
              return _.flatten([
                (function () {
                  var j,
                    results;
                  results = [];
                  for (i = j = 0; j <= 2; i = ++j) {
                    results.push({
                      type: 'green'
                    });
                  }
                  return results;
                })(),
                (function () {
                  var j,
                    results;
                  results = [];
                  for (i = j = 0; j <= 2; i = ++j) {
                    results.push({
                      type: 'blue'
                    });
                  }
                  return results;
                })()
              ]);
            }
          });
*/

  /*        
            SourceObject = React.createClass({
              render: function () {
                return Draggable({
                  className: `dnd-source-object ${this.props.type}`,
                  children: this.props.children,
                  onDragStart: this.props.onDragStart,
                  onDragStop: this.props.onDragStop,
                  dragData: this.dragData
                });
              },
              dragData: function () {
                return {
                  type: this.props.type,
                  index: this.props.index
                };
              }
            });
          
            Draggable = React.createClass({
              getInitialState: function () {
                return {
                  mouseDown: false,
                  dragging: false
                };
              },
              render: function () {
                return this.transferPropsTo(div({
                  style: this.style(),
                  className: `dnd-draggable ${this.state.dragging ? 'dragging' : void 0}`,
                  children: this.props.children,
                  onMouseDown: this.onMouseDown
                }));
              },
              style: function () {
                if (this.state.dragging) {
                  return {
                    position: 'absolute',
                    left: this.state.left,
                    top: this.state.top
                  };
                } else {
                  return {};
                }
              },
              onMouseDown: function (event) {
                var pageOffset;
                if (event.button === LEFT_BUTTON) {
                  event.stopPropagation();
                  this.addEvents();
                  pageOffset = this.getDOMNode().getBoundingClientRect();
                  return this.setState({
                    mouseDown: true,
                    originX: event.pageX,
                    originY: event.pageY,
                    elementX: pageOffset.left,
                    elementY: pageOffset.top
                  });
                }
              },
              onMouseMove: function (event) {
                var base, base1, deltaX, deltaY, distance;
                deltaX = event.pageX - this.state.originX;
                deltaY = event.pageY - this.state.originY;
                distance = Math.abs(deltaX) + Math.abs(deltaY);
                if (!this.state.dragging && distance > DRAG_THRESHOLD) {
                  this.setState({
                    dragging: true
                  });
                  if (typeof (base = this.props).onDragStart === "function") {
                    base.onDragStart(typeof (base1 = this.props).dragData === "function" ? base1.dragData() : void 0);
                  }
                }
                if (this.state.dragging) {
                  return this.setState({
                    left: this.state.elementX + deltaX + document.body.scrollLeft,
                    top: this.state.elementY + deltaY + document.body.scrollTop
                  });
                }
              },
              onMouseUp: function () {
                this.removeEvents();
                if (this.state.dragging) {
                  this.props.onDragStop();
                  return this.setState({
                    dragging: false
                  });
                }
              },
              addEvents: function () {
                document.addEventListener('mousemove', this.onMouseMove);
                return document.addEventListener('mouseup', this.onMouseUp);
              },
              removeEvents: function () {
                document.removeEventListener('mousemove', this.onMouseMove);
                return document.removeEventListener('mouseup', this.onMouseUp);
              }
            });
          
            DropTargets = React.createClass({
              render: function () {
                var i, target;
                return div({
                  className: 'dnd-drop-targets',
                  children: (function () {
                    var j, len, ref, results;
                    ref = this.targets();
                    results = [];
                    for (i = j = 0, len = ref.length; j < len; i = ++j) {
                      target = ref[i];
                      results.push(DropTarget({
                        target: target,
                        index: i,
                        currentDragItem: this.props.currentDragItem,
                        onDrop: this.props.onDrop
                      }));
                    }
                    return results;
                  }).call(this)
                });
              },
              targets: function () {
                return [
                  {
                    accepts: ['blue']
                  },
                  {
                    accepts: ['green']
                  },
                  {
                    accepts: ['blue',
                      'green']
                  },
                  {
                    accepts: []
                  }
                ];
              }
            });
          
            DropTarget = React.createClass({
              getInitialState: function () {
                return {
                  hover: false
                };
              },
              render: function () {
                return div({
                  className: this.classes(),
                  children: 'accepts ' + this.acceptsDescription(),
                  onMouseEnter: () => {
                    return this.setState({
                      hover: true
                    });
                  },
                  onMouseLeave: () => {
                    return this.setState({
                      hover: false
                    });
                  },
                  onMouseUp: this.onDrop
                });
              },
              classes: function () {
                return ['dnd-drop-target', `${this.props.target.accepts.join(' ')}`, this.active() ? 'active' : void 0, this.active() && this.props.currentDragItem.type === 'green' ? 'active-green' : void 0, this.active() && this.props.currentDragItem.type === 'blue' ? 'active-blue' : void 0, this.disabled() ? 'disabled' : void 0, this.state.hover ? 'hover' : void 0].join(' ');
              },
              active: function () {
                var item, ref;
                item = this.props.currentDragItem;
                return item && (ref = item.type, indexOf.call(this.props.target.accepts, ref) >= 0);
              },
              disabled: function () {
                var item, ref;
                item = this.props.currentDragItem;
                return item && (ref = item.type, indexOf.call(this.props.target.accepts, ref) < 0);
              },
              acceptsDescription: function () {
                if (this.props.target.accepts.length > 0) {
                  return this.props.target.accepts.join(' & ');
                } else {
                  return 'nothing';
                }
              },
              onDrop: function () {
                var base;
                if (this.active()) {
                  return typeof (base = this.props).onDrop === "function" ? base.onDrop({
                    index: this.props.index + 1
                  }) : void 0;
                }
              }
            });
          */
  /*        render: function () {
              return div({
                className: `dnd-example ${this.state.currentDragItem ? 'dragging' : void 0}`,
                children: [
                  SourceObjects({
                    onDragStart: this.onDragStart,
                    onDragStop: this.onDragStop
                  }),
                  DropTargets({
                    currentDragItem: this.state.currentDragItem,
                    onDrop: this.onDrop
                  }),
                  this.dropDescription()
                ]
              });
            },*/


  /*interface iData {
    name: string;
    serialNumber: number;
  }

  const data = [
    "Oles",
    "Denys",
    'Kolya',
    "Max"
  ];

  const [first, ...others] = data;
  //const arr2: iData = { others, [name]: others };


  const arr: iData[] = [];
  data.forEach(x => { if (x != 'Oles') { arr.push({ name: x, serialNumber: Math.round(Math.random() * 1000) }) } });



  for (let i = 0; i < arr.length; i++) {
    console.log('arr[' + i + ']=' + arr[i].name + ', ' + arr[i].serialNumber);
  }
*/

  return (

    <div>
      <Accordion>
        <Card>
          <Accordion.Header as={Card.Header} eventKey="0">
            TAB 1
          </Accordion.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>This is first tab body</Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Header as={Card.Header} eventKey="1">
            TAB 2
          </Accordion.Header>

          <Accordion.Collapse eventKey="1">
            <Card.Body>This is second tab body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>

  );
};












export default MyApp;