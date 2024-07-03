import 'tailwindcss/tailwind.css';
import React from "react";

export function BasicCheckBoxInput({id}){
  return (
    <input
      type="checkbox"
      id={id}
      className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
    />
  )
}

export function BasicInput({type, id, name}){
  return (<input
    type={type}
    id={id}
    name={name}
    autoFocus
    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
  />);

}

