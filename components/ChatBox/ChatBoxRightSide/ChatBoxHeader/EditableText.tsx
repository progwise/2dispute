import React, { useState, useRef } from 'react';
import { FaPen, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

interface EditableTextProps {
  text: string;
  onUpdate: (newText: string) => void;
}

const EditableText = ({ text, onUpdate }: EditableTextProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);

  const handleOnEditClick = (): void => setEditing(true);
  const handleCancelClick = (): void => setEditing(false);
  const handleOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (inputRef.current) {
      const newText = inputRef.current.value;
      onUpdate(newText);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <form
        className="flex bg-gray-200 p-2 text-sm rounded-lg items-center space-x-1"
        onSubmit={handleOnSubmit}
      >
        <input
          className="flex-grow bg-transparent outline-none"
          type="text"
          defaultValue={text}
          ref={inputRef}
        />
        <button type="submit" className="cursor-pointer text-gray-700">
          <FaCheckCircle />
        </button>
        <button
          type="button"
          className="cursor-pointer text-gray-700"
          onClick={handleCancelClick}
        >
          <FaTimesCircle />
        </button>
      </form>
    );
  }

  return (
    <div className="flex cursor-pointer" onClick={handleOnEditClick}>
      <span className="flex-grow truncate">{text}</span>
      <button>
        <FaPen />
      </button>
    </div>
  );
};

export default EditableText;
