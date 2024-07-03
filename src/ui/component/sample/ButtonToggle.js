import React from 'react';
import 'tailwindcss/tailwind.css';
import './ButtonToggle.css';

function ButtonToggle() {
  return (
    <div class="grid place-items-center">
      <label class="flex items-center relative cursor-pointer select-none">
        <input
          type="checkbox"
          class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-gray-800 focus:ring-blue-500"
        />
        <span class="absolute text-xs uppercase right-1">OFF</span>
        <span class="absolute text-xs uppercase right-8">ON</span>
        <span class="w-7 h-7 absolute rounded-full transition-all bg-gray-200" />
      </label>
    </div>
  );
}

export default ButtonToggle;
