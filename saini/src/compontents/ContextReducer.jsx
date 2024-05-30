import React, { useReducer } from 'react'
import { useContext } from 'react';
import { createContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {

      case "ADD":
        return [...state, { ...action.payload, qty: 1 }]; // Initialize qty to 1 when adding a new item
      case "REMOVE":
        let newArr = [...state];
        newArr.splice(action.index, 1);
        return newArr;

      case "UPDATE":
        let arr = [...state];
        arr = arr.map((item, index) => {
          if (item.id === action.id) {
            console.log(item.qty, parseInt(action.qty), action.price + item.price);
            return { ...item, qty: (parseInt(action.qty) || 0) + (item.qty || 0), price: action.price + item.price };
          }
          return item;
        });
        return arr;

      case "DROP":
        let empArray =[]
        return empArray

      default:
        console.log("Error in Reducer");
        return state;
    }
  };
  

export const CartProvider=({children})=>{

    const[state,dispatch] = useReducer(reducer,[])

    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart =() =>useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartDispatchContext);
