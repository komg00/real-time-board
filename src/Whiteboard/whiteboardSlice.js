import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKeys: {}, // apiKey별로 데이터를 저장
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    setToolType(state, action) {
      state.tool = action.payload;
    },
    setElements: (state, action) => {
      const { apiKey, elements } = action.payload;
      state.apiKeys[apiKey] = {
        ...state.apiKeys[apiKey],
        elements,
      };
    },
    updateElement: (state, action) => {
      const { apiKey, elementData } = action.payload;
      const elements = state.apiKeys[apiKey]?.elements || [];
      const index = elements.findIndex((el) => el.id === elementData.id);

      if (index === -1) {
        elements.push(elementData);
      } else {
        elements[index] = elementData;
      }

      state.apiKeys[apiKey].elements = elements;
    },
    setApiKey: (state, action) => {
      const { apiKey } = action.payload;
      if (!state.apiKeys[apiKey]) {
        state.apiKeys[apiKey] = { elements: [] };
      }
    },
    clearWhiteboard: (state, action) => {
      const { apiKey } = action.payload;

      if (state.spaces[apiKey]) {
        state.spaces[apiKey].elements = [];
      }
    },
  },
});

export const { setApiKey, updateElement, setElements, clearWhiteboard } =
  whiteboardSlice.actions;

export default whiteboardSlice.reducer;
