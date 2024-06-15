import React, { useState, useEffect } from "react";
import "../css/NestedCheckbox.css";

const NestedCheckbox = ({ label, children }) => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [childChecks, setChildChecks] = useState(children.map(() => false));

  useEffect(() => {
    const allChecked = childChecks.every(Boolean);
    const noneChecked = childChecks.every((checked) => !checked);

    setChecked(allChecked);
    setIndeterminate(!allChecked && !noneChecked);
  }, [childChecks]);

  const handleParentChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    setChildChecks(childChecks.map(() => newChecked));
  };

  const handleChildChange = (index) => (event) => {
    const newChildChecks = [...childChecks];
    newChildChecks[index] = event.target.checked;
    setChildChecks(newChildChecks);
  };

  const checkedCount = childChecks.filter(Boolean).length;

  return (
    <div className="nested-checkbox">
      <div className="parent-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleParentChange}
          ref={(el) => el && (el.indeterminate = indeterminate)}
        />
        <span>
          {label} {checkedCount > 0 && !checked && `(${checkedCount})`}
        </span>
      </div>
      <div className="child-checkboxes">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="child-checkbox">
            <input
              type="checkbox"
              checked={childChecks[index]}
              onChange={handleChildChange(index)}
            />
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedCheckbox;
