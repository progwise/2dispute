import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Node, Text, NodeEntry, Range } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps } from 'slate-react';
import { useField, useFormikContext } from 'formik';
import { InputError } from '.';

interface TextareaInputProps {
  name?: string;
  placeholder: string;
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps): JSX.Element => (
  <span {...attributes} className={leaf.highlight && 'bg-blue-300'}>
    {children}
  </span>
);

const serialize = (value: Node[]): string =>
  value.map(node => Node.string(node)).join('\n');
const deserialize = (text: string): Node[] =>
  text.split('\n').map(line => ({ children: [{ text: line }] }));

const tweetRegex = /(?:[\w.:/]+\.)?twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/gi;

const TextareaInput = ({
  name = '',
  placeholder,
}: TextareaInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(name);
  const { isSubmitting } = useFormikContext();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Node[]>(deserialize(field.value));

  const error = meta.touched ? meta.error : undefined;

  const markTweetLinks = useCallback(
    ([node, path]: NodeEntry<Node>): Range[] => {
      if (!Text.isText(node)) {
        return [];
      }

      const { text } = node;
      const matches = Array.from(text.matchAll(tweetRegex));

      return matches.map(match => {
        const start = match.index ?? 0;
        const end = start + match[0].length;

        return {
          anchor: { path, offset: start },
          focus: { path, offset: end },
          highlight: true,
        };
      });
    },
    [],
  );

  return (
    <>
      <Slate
        editor={editor}
        onChange={(newValue): void => {
          setValue(newValue);
          helpers.setValue(serialize(newValue));
        }}
        value={value}
      >
        <Editable
          id={name}
          className="w-full border-2 disabled:opacity-75 bg-white"
          onBlur={field.onBlur}
          placeholder={placeholder}
          disabled={isSubmitting}
          decorate={markTweetLinks}
          renderLeaf={(props): JSX.Element => <Leaf {...props} />}
        />
      </Slate>
      {error && <InputError error={error} />}
    </>
  );
};

export default TextareaInput;
