import { createElement } from ".";
import { toolTypes } from "../../constants";
import { emitElementUpdate } from "../../socketConn/socketConn";
import { store } from "../../store/store";
import { setElements } from "../whiteboardSlice";

export const updatePencilElementWhenMoving = (
  { index, newPoints },
  elements,
  roomId
) => {
  const elementsCopy = [...elements];

  elementsCopy[index] = {
    ...elementsCopy[index],
    points: newPoints,
  };

  const updatedPencilElement = elementsCopy[index];

  store.dispatch(setElements(elementsCopy));
  emitElementUpdate(roomId, updatedPencilElement);
};

export const updateElement = (
  { id, x1, x2, y1, y2, type, index, text },
  elements,
  roomId
) => {
  // copy 만들어서 새료운 배열의 요소로 대체
  const elementsCopy = [...elements];

  switch (type) {
    case toolTypes.LINE:
    case toolTypes.RECTANGLE:
      const updatedElement = createElement({
        id,
        x1,
        y1,
        x2,
        y2,
        toolType: type,
      });

      elementsCopy[index] = updatedElement;

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(roomId, updatedElement);
      break;
    case toolTypes.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [
          ...elementsCopy[index].points,
          {
            x: x2,
            y: y2,
          },
        ],
      };

      const updatedPencilElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(roomId, updatedPencilElement);
      break;
    case toolTypes.TEXT:
      const textWidth = document
        .getElementById("canvas")
        .getContext("2d")
        .measureText(text).width;

      const textHeight = 24;

      elementsCopy[index] = {
        ...createElement({
          id,
          x1,
          y1,
          x2: x1 + textWidth,
          y2: y1 + textHeight,
          toolType: type,
          text,
        }),
      };

      const updatedTextElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(roomId, updatedTextElement);
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};
