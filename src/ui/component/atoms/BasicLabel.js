import 'tailwindcss/tailwind.css';
import React from "react";

export function BasicLabel({labelFor, title}){
  return (<label htmlFor={labelFor} className="text-sm font-semibold text-gray-500">{title}</label>)
}
