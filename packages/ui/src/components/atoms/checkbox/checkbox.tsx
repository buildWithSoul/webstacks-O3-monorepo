"use client";

import { useEffect, useRef } from "react";

type CheckboxProps = {};

export const Checkbox = ({}: CheckboxProps) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="peer appearance-none border h-4 w-4 border-(--stroke-primary) accent-(--surface-card) checked:bg-(--surface-card)"
      />

      <svg
        className="absolute top-1.5 left-[3px] h-2.25 w-2.75  pointer-events-none hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
        strokeWidth={4}
      >
        <path
          d="M9.34961 0.176758C9.49553 0.176758 9.63607 0.234707 9.73926 0.337891C9.84222 0.440999 9.90034 0.580845 9.90039 0.726562C9.90039 0.872487 9.84244 1.01303 9.73926 1.11621L3.73926 7.11621C3.6882 7.16731 3.62728 7.20769 3.56055 7.23535C3.49378 7.26303 3.42189 7.27734 3.34961 7.27734C3.27757 7.27732 3.20622 7.26288 3.13965 7.23535C3.07303 7.20774 3.01195 7.16718 2.96094 7.11621L0.335938 4.49121C0.232753 4.38803 0.174805 4.24749 0.174805 4.10156C0.17486 3.95571 0.232803 3.81603 0.335938 3.71289C0.439072 3.60976 0.57876 3.55181 0.724609 3.55176C0.870534 3.55176 1.01107 3.60971 1.11426 3.71289L3.34961 5.94824L8.96094 0.337891C9.06407 0.234756 9.20376 0.176813 9.34961 0.176758Z"
          fill="#1A1A1A"
          stroke="#1A1A1A"
          stroke-width="0.35"
        />
      </svg>
    </div>
  );
};
