import React from "react";

const directory = ({ pages }) => {
  return (
    <ul>
      {pages.map((page, index) => (
        <li key={index}>
          <a href={page}>{page}</a>
        </li>
      ))}
    </ul>
  );
};

export default directory;
