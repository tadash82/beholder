import React from "react";

/**
 *
 * @returns props.data
 * symbols
 * basePrecision
 * quotePrecision
 * minNotional
 * minLotSize]
 * isFavorite
 * onClick
 */
function SymbolRow(props) {
  return (
    <tr>
      <td className="text-gray-900">
        {props.data.symbol}
        {props.data.isFavorite ? (
          <svg
            className="icon icon-xs"
            xmlns="http://www.w3.org/2000/svg"
            fill="yellow"
            viewBox="0 0 24 24"
            stroke="orange"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ) : (
          <></>
        )}
      </td>
      <td className="text-gray-900">{props.data.basePrecision}</td>
      <td className="text-gray-900">{props.data.quotePrecision}</td>
      <td className="text-gray-900">{props.data.minNotional}</td>
      <td className="text-gray-900">{props.data.minLotSize}</td>
      <td className="text-gray-900">
        <button
          id={"edit" + props.data.symbol}
          className="btn btn-secondary animete-up-2"
          width={32}
          data-bs-toggle="modal"
          data-bs-target="#modalSymbol"
          onClick={props.onClick}
        >
          <svg
            id={"edit" + props.data.symbol}
            className="icon icon-xs"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={props.onClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default SymbolRow;
