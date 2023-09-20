import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Aprender React" },
  { id: 2, text: "Aprender VITE" },
  { id: 3, text: "Aprender FAF" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleDragEnd = (result) => {
    // console.log()
    if (!result.destination) {
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyArray = [...todos];
    const [reorderedItems] = copyArray.splice(startIndex, 1);
    copyArray.splice(endIndex, 0, reorderedItems);
    setTodos(copyArray);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>TODO APP</h1>
      <Droppable droppableId="todos">
        {(dropProvider) => (
          <ul ref={dropProvider.innerRef} {...dropProvider.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(dragProvide) => (
                  <li
                    ref={dragProvide.innerRef}
                    {...dragProvide.dragHandleProps}
                    {...dragProvide.draggableProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {dropProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default App;
