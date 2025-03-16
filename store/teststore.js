import { create } from "zustand";

const store = create((set)=>({
  count:0,
  increment: ()=>set((state)=>{
    return state.count + 1
  }),
  decrement:()=>set((state)=>{
    return state.count - 1
  })
}))

const {increment, decement}= store();
