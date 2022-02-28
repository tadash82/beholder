import React from "react";

function NewOrderButton() {
  return (
    <button
      id="btnNewOrder"
      className="btn btn-primary animate-up-2"
      data-bs-toggle="modal"
      data-bs-target="#modalOrder"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-xs me-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
      New Order
    </button>
  );
}

export default NewOrderButton;
