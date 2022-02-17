import axios from "axios";
const { REACT_APP_API } = process.env;

export const GET_INFO = 'GET_INFO';
export const ADD_INFO = 'ADD_INFO';
export const UPDATE_INFO = 'UPDATE_INFO';
export const DELETE_INFO = 'DELETE_INFO';
export const GET_INFO_BY_ID = 'GET_INFO_BY_ID';


export const getRows = () => async (dispatch) => {
  const info = await axios.get(`${REACT_APP_API}`)
  console.log(info.data)
  return dispatch({
    type: GET_INFO,
    payload: info.data.results
  })
};

export const getRowById = (id) => async (dispatch) => {
  const info = await axios.get(`${REACT_APP_API}/${id}`)
return dispatch({
    type: GET_INFO_BY_ID,
    payload: info.data
});
};

export const createRow = (data) => async (dispatch) => {
    const info = await axios.post(`${REACT_APP_API}`, data)
  return dispatch({
      type: ADD_INFO,
      payload: info.data
  });
};

export const updateRow = ({id, datos}) => async (dispatch) =>{


    const info = await axios.put(`${REACT_APP_API}/${id}`, datos)
  return dispatch({
      type: UPDATE_INFO,
      payload: info.data
  });
};

export const deleteRow = (id) => async (dispatch) => {
    await axios.delete(`${REACT_APP_API}/${id}`)
  dispatch({
      type: DELETE_INFO
  });
  const info = await axios.get(`${REACT_APP_API}`)
  console.log(info.data)
  return dispatch({
    type: GET_INFO,
    payload: info.data.results
  })

};
