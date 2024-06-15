import React, { useState } from "react";
import DecompressString from "./components/DecompressString";
import NestedCheckbox from "./components/NestedCheckbox";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const [visibleComponent, setVisibleComponent] = useState("decompressString");

  const handleToggleComponent = (component) => {
    setVisibleComponent((prevComponent) =>
      prevComponent === component ? null : component
    );
  };

  return (
    <div className="main-container">
      <div className="button-group">
        <button onClick={() => handleToggleComponent("decompressString")}>
          {visibleComponent === "decompressString" ? "Hide" : "See"} Decompress
          String
        </button>
        <button onClick={() => handleToggleComponent("ProgressBar")}>
          {visibleComponent === "ProgressBar" ? "Hide" : "See"} API progress Bar
        </button>
        <button onClick={() => handleToggleComponent("NestedCheckbox")}>
          {visibleComponent === "NestedCheckbox" ? "Hide" : "See"} Nested
          Checkboxes
        </button>
      </div>
      <div className="component-container">
        {visibleComponent === "decompressString" && <DecompressString />}
        {visibleComponent === "ProgressBar" && <ProgressBar />}
        {visibleComponent === "NestedCheckbox" && (
          <div className="nested-checkbox-container">
            <h1>Nested Checkboxes</h1>

            <NestedCheckbox label="Parent Checkbox 1">
              <div>Child 1</div>
              <div>Child 2</div>
              <div>Child 3</div>
            </NestedCheckbox>
            <NestedCheckbox label="Parent Checkbox 2">
              <div>Child 1</div>
              <div>Child 2</div>
              <div>Child 3</div>
            </NestedCheckbox>
            <h3>Explanation</h3>
            <ol>
              <li>
                <p>
                  <strong>State Management</strong>:
                </p>
                <ul>
                  <li>
                    <code>checked</code>: State to manage the parent checkbox.
                  </li>
                  <li>
                    <code>indeterminate</code>: State to manage the
                    indeterminate state of the parent checkbox.
                  </li>
                  <li>
                    <code>childChecks</code>: State array to manage the state of
                    each child checkbox.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  <strong>Effect Hook</strong>:
                </p>
                <ul>
                  <li>
                    Updates the <code>checked</code> and{" "}
                    <code>indeterminate</code> states based on the{" "}
                    <code>childChecks</code> array whenever it changes.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  <strong>Parent Checkbox Change Handler</strong>:
                </p>
                <ul>
                  <li>
                    <code>handleParentChange</code>: Sets the parent and all
                    child checkboxes to the same state.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  <strong>Child Checkbox Change Handler</strong>:
                </p>
                <ul>
                  <li>
                    <code>handleChildChange</code>: Updates the specific child
                    checkbox and recalculates the parent checkbox state.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  <strong>Render</strong>:
                </p>
                <ul>
                  <li>Renders the parent checkbox and its label.</li>
                  <li>
                    Displays the count of checked child checkboxes next to the
                    parent label if not all are selected.
                  </li>
                  <li>
                    Renders each child checkbox with its respective state and
                    change handler.
                  </li>
                </ul>
              </li>
            </ol>
            <p>
              This implementation allows you to manage a parent-child checkbox
              relationship where checking or unchecking the parent affects all
              children, and individual child states reflect on the parent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
