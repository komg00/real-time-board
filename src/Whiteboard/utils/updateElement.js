import { createElement } from "./createElement";
import { toolTypes } from "../../constants";
import { store } from "../../store/store";
import { setElements } from "../whiteboardSlice";
import { emitElementUpdate } from "../../socketConn/socketConn";

export const updateElement = (
  { id, x1, x2, y1, y2, type, index },
  elements
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

      emitElementUpdate(updatedElement);
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

      const updatePencilElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatePencilElement);
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};
