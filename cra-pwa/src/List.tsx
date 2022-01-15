import './List.css';
import React, { useEffect, useState } from 'react';
//import styled from '@emotion/styled/types/base';
import styled, { StyledComponent } from '@emotion/styled';
import { DraggingStyle, NotDraggingStyle, DropResult, DragDropContext, Droppable, Draggable, ResponderProvided, resetServerContext, DroppableProvided, DraggableProvided, DraggableLocation, DragStart } from "react-beautiful-dnd";


enum eTaskStage {//етап виконання: Створено, Заплановано, Завершено
    tsCreated = 'Список всіх справ',
    tsPlaned = 'Заплановані справи',
    tsFinished = 'Завершені справи'
}
const id2List = {
    droppable1: 'created',
    droppable2: 'planed',
    droppable3: 'finished'
};

interface iTaskType {
    key: string;
    id: string;
    taskName: string;
    taskType: string;
    //taskStage: eTaskStage | null;//етап виконання: Створено, Заплановано, Завершено
}

interface iTasks {
    created: iTaskType[];
    planed: iTaskType[];
    finished: iTaskType[];
}

/*interface iInputData {
    value: string;
    onChange: any;
    onSetValue: React.Dispatch<SetStateAction<string>>;
};*/
const grid: number = 8;
const QuoteItem: StyledComponent<any, any, any> = styled.div`
  width: auto;
  height: auto;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
  background-color: lightblue;
  `;

/*function QuoteItem(): StyledComponent<any, any, any> {
    return (styled.div`
  width: auto;
  height: auto;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
  background-color: lightblue;
  `);
};*/


const STORAGE_KEY_TODOLIST: string = 'TodoList';
const STORAGE_KEY_FORM: string = 'TodoForm';
const EMPTY_FORM: iTaskType = { key: '', id: '', taskName: '', taskType: '' /*, taskStage: null*/ };
const EMPTY_TABLE: iTasks = { created: [], planed: [], finished: [] };
const generateId = () => new Date().getTime().toString();
//const todolist: iTaskType[] = [];


//====================================================================================================================
function List() {
    const [formValues, setFormValues] = useState<iTaskType>(EMPTY_FORM);
    const [tableValues, setTableValues] = useState<iTasks>(EMPTY_TABLE); //через (loadTask()) -  теж працює;

    const handleAddTodo: React.MouseEventHandler = (e: React.MouseEvent) => {
        //console.log('eventClick');
        if (!!formValues.id) {
            tableValues.created.push(formValues);
            setTableValues({ created: tableValues.created, planed: tableValues.planed, finished: tableValues.finished });
            setFormValues(EMPTY_FORM);
        }
    }

    const handleFormChange = (field: string, value: string | number | null) => {
        setFormValues({ ...formValues, [field]: value, id: generateId(), taskType: 'label' /*, taskStage: eTaskStage.tsCreated*/ })
        //console.log('fv=' + formValues.id+', eventChange=' + value);
    }

    useEffect(() => {
        const formString: string | null = localStorage.getItem(STORAGE_KEY_FORM);
        const newForm: iTaskType = formString ? JSON.parse(formString) : EMPTY_FORM;
        setFormValues(newForm);

        const tableString: string | null = localStorage.getItem(STORAGE_KEY_TODOLIST);
        const newTable: iTasks = tableString ? JSON.parse(tableString) : EMPTY_TABLE;
        setTableValues({ created: newTable.created, planed: newTable.planed, finished: newTable.finished });
        //console.log('READ ' + STORAGE_KEY_FORM + ' ,' + STORAGE_KEY_TODOLIST + ', table =' + tableString);

        //regServiceWorker();
    }, []);

    /*function regServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('service-worker.js').then(function (registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function (err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                }).catch(function (err) {
                    console.log(err)
                });
            });
        } else {
            console.log('service worker is not supported');
        }
    }*/

    useEffect(() => { saveForm(formValues); }, [formValues]);
    useEffect(() => { saveTable(tableValues); }, [tableValues]);
    function saveForm(formData: iTaskType) { localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData)); /*console.log('saveF=' + JSON.stringify(formData))*/ };
    function saveTable(tableData: iTasks) { localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(tableData)); /*console.log('saveT=' + JSON.stringify(tableData))*/ };


    const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : null,

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        //width: 300
    });

    function reorder(list: iTaskType[], startIndex: number, endIndex: number): iTaskType[] {
        const result: iTaskType[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;

    };
    function move(source: iTaskType[], destination: iTaskType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation): iTasks {
        //console.log('source=' + source?.length + ', destination=' + destination?.length);
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result: iTasks = EMPTY_TABLE; //tableValues;
        result.created = Array.from(tableValues.created);
        result.planed = Array.from(tableValues.planed);
        result.finished = Array.from(tableValues.finished);
        if (droppableSource.droppableId === 'droppable1') {
            result.created = sourceClone;
        } else
            if (droppableSource.droppableId === 'droppable2') {
                result.planed = sourceClone;
            } else
                if (droppableSource.droppableId === 'droppable3') {
                    result.finished = sourceClone;
                }

        if (droppableDestination.droppableId === 'droppable1') {
            result.created = destClone;
        } else
            if (droppableDestination.droppableId === 'droppable2') {
                result.planed = destClone;
            } else
                if (droppableDestination.droppableId === 'droppable3') {
                    result.finished = destClone;
                }
        //console.log('created=' + result.created.length + ', planed=' + result.planed.length + ', finish=' + result.finished.length);

        return result;
    };



    function getList(id: string): iTaskType[] {
        if (id === 'droppable1') { return tableValues.created }
        else
            if (id === 'droppable2') { return tableValues.planed }
            else
                if (id === 'droppable3') { return tableValues.finished }
                else return [];
        //return tableValues[id2List[id]];
    };
    function saveList(id: string, arr: iTaskType[]) {
        if (id === 'droppable1') {
            setTableValues({ created: arr, planed: tableValues.planed, finished: tableValues.finished });
        } else
            if (id === 'droppable2') {
                setTableValues({ created: tableValues.created, planed: arr, finished: tableValues.finished });
            } else
                if (id === 'droppable3') {
                    setTableValues({ created: tableValues.created, planed: tableValues.planed, finished: arr });
                }
    }
    function onDragStart(s: DragStart, r: ResponderProvided) {
        //s.draggableId
        //s.source.droppableId
    }

    function onDragEnd(r: DropResult): void {
        if (!r.destination) {
            return;
        }
        if ((r.destination.index === r.source.index) && (r.destination.droppableId === r.source.droppableId)) {
            //console.log('do nothing');
            return;
        }
        if (r.destination.droppableId === r.source.droppableId) {
            //console.log('move src = ' + r.source.droppableId + ', idx=' + r.source.index+', move dest = ' + r.destination.droppableId + ', idx=' + r.destination.index);
            const quote = reorder(
                //state.quotes,
                getList(r.source.droppableId),
                r.source.index,
                r.destination.index
            );
            //console.log(quote);
            saveList(r.source.droppableId, quote);


        } else {
            //console.log('move2 src = ' + r.source.droppableId + ', idx=' + r.source.index + ', move2 dest = ' + r.destination.droppableId + ', idx=' + r.destination.index);
            const result: iTasks = move(
                getList(r.source.droppableId),
                getList(r.destination.droppableId),
                r.source,
                r.destination
            );

            setTableValues({ created: result.created, planed: result.planed, finished: result.finished });

        }
    }

    //=========================================================================================================================
    function Table(p: any): JSX.Element { //{ numStage: number }
        //const len = tableValues.length - 1;
        //console.log('numStage=' + p.numStage);
        let tableStage: eTaskStage | null = null;
        let newlist: iTaskType[] = [];
        if (p.numStage === 1) { tableStage = eTaskStage.tsCreated; newlist = tableValues.created; } else
            if (p.numStage === 2) { tableStage = eTaskStage.tsPlaned; newlist = tableValues.planed; } else
                if (p.numStage === 3) { tableStage = eTaskStage.tsFinished; newlist = tableValues.finished; }




        /*tableValues.filter((value) => {
            //console.log('arr=' + array.length + ' ts1=' + value.taskStage + ', ts2=' + tableStage);
            if (value.taskStage === tableStage) { newlist.push(value); }
        });*/

        //console.log('new=' + newlist?.length);
        //=========================================================================================================

        return (
            <div className={p.classNamez}>
                <h4 className="styleh3" > {tableStage?.toString()}</h4>
                <div className="div0">
                    {
                        <Droppable droppableId={"droppable" + p.numStage} mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical" >
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}{...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}

                                >
                                    {newlist?.length > 0 ?
                                        newlist.map((item: iTaskType, index: number) => (
                                            <Draggable draggableId={item.id} index={index} key={item.id} disableInteractiveElementBlocking={true} >
                                                {(provided, snapshot) => (
                                                    <QuoteItem className="divitem"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}

                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        {item.taskName}
                                                    </QuoteItem>
                                                )}
                                            </Draggable>
                                        ))
                                        : <div className="divitem grayed">{'<Порожньо>'}</div>
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    }
                </div>
            </div >
        );
    };
    //=====================================================================================================================================

    return (
        <div className="wrapper" >

            <div className="header">
                <div > <h3 className="styleh3">{"Нова задача"}</h3>
                    <QuoteItem className="divitem">
                        <input className={"styleinput"} value={formValues.taskName} onChange={e => handleFormChange('taskName', e.target.value)} ></input>
                        <button className={"btn"} disabled={!formValues.taskName} onClick={handleAddTodo}>{"Створити задачу"}</button>
                    </QuoteItem>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}  >
                <Table numStage={1} classNamez={'content1'} />

                <Table numStage={2} classNamez={'content2'} />

                <Table numStage={3} classNamez={'content3'} />
            </DragDropContext >

        </div >
    );

}
export default List;