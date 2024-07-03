import 'tailwindcss/tailwind.css';
import React from "react";
import {Link} from "react-router-dom";


export function BasicLinkButton({w, text, destination, title, textColor, bgColor}){

  return (
    <Link to={`/${destination}`}>
      <BasicButton type={"button"} title={title} w={w} text={text} textColor={textColor} bgColor={bgColor}/>
    </Link>
  )

}

export function BasicButton({w, text, type, title, textColor, bgColor}){

  if(textColor == null){
    textColor = 'white';
  }

  if(bgColor == null){
    bgColor = 'blue-500';
  }

  const className = `w-${w} px-4 py-2 text-${text} font-semibold text-${textColor} transition-colors duration-300 bg-${bgColor} rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4`;
  return (
    <button
      type={type}
      // className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"

      className={className}
    >
      {title}
    </button>
  )
}

