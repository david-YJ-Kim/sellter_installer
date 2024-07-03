import React from "react";
import {BasicInput} from "../../atoms/BasicInput";
import {BasicButton} from "../../atoms/BasicButton";

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <BasicInput type={'input'} id={'filter'} name={'filter'} />
      <BasicButton w={30} text={'xs'} type={'button'} title={'Search'} />
    </form>
  );
}

export default Search;
