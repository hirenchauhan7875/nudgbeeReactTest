import React, { useState } from "react";
import '../css/DecompressString.css';

const DecompressString = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const decompress = (s) => {
    const stack = [];
    let currentNum = 0;
    let currentString = "";

    for (const char of s) {
      if (!isNaN(char)) {
        // If the character is a number
        currentNum = currentNum * 10 + parseInt(char, 10);
      } else if (char === "(") {
        // Push current number and string to stack
        stack.push(currentString);
        stack.push(currentNum);
        currentString = "";
        currentNum = 0;
      } else if (char === ")") {
        // Pop from stack and repeat the string
        const num = stack.pop();
        const prevString = stack.pop();
        currentString = prevString + currentString.repeat(num);
      } else {
        // It's a letter
        currentString += char;
      }
    }

    return currentString;
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDecompress = () => {
    setOutput(decompress(input));
  };

  return (
    <div className="un_compress_container">
      <h1>Decompress String</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter compressed string"
      />
      <button onClick={handleDecompress}>Decompress</button>
      <p className="decompress-output">Output: {output}</p>

      <h3>Explanation</h3>
      <ol>
        <li>
          <p>
            <strong>State Management</strong>:
          </p>
          <ul>
            <li>
              <code>input</code>: to store the compressed string input by the
              user.
            </li>
            <li>
              <code>output</code>: to store the decompressed string result.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>
              <code>decompress</code> Function
            </strong>
            :
          </p>
          <ul>
            <li>The function uses a stack to handle nested structures.</li>
            <li>
              Iterate over each character in the input string:
              <ul>
                <li>
                  If it's a number, update <code>currentNum</code>.
                </li>
                <li>
                  If it's an opening parenthesis <code>(</code>, push{" "}
                  <code>currentString</code> and <code>currentNum</code> to the
                  stack, and reset them.
                </li>
                <li>
                  If it's a closing parenthesis <code>)</code>, pop the last
                  number and string from the stack, and repeat the current
                  string accordingly.
                </li>
                <li>
                  If it's a letter, append it to <code>currentString</code>.
                </li>
              </ul>
            </li>
            <li>Finally, the fully decompressed string is returned.</li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Event Handlers</strong>:
          </p>
          <ul>
            <li>
              <code>handleChange</code>: updates the input state when the user
              types in the input field.
            </li>
            <li>
              <code>handleDecompress</code>: calls the <code>decompress</code>{" "}
              function and updates the output state.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Render</strong>:
          </p>
          <ul>
            <li>An input field to accept the compressed string.</li>
            <li>A button to trigger the decompression.</li>
            <li>A paragraph to display the decompressed output.</li>
          </ul>
        </li>
      </ol>
      <p>
        This React component should allow users to input a compressed string and
        see the decompressed result by clicking the button.
      </p>
    </div>
  );
};

export default DecompressString;
