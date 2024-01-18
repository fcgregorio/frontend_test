import Select from "react-select";

export type Option = {
  label: string
  value: string
}

export type ControlType = {
  field: Option | null;
  setField: (value: Option | null) => void;
  direction: Option | null;
  setDirection: (value: Option| null) => void;
};

const Controls = ({
  field,
  setField,
  direction,
  setDirection,
}: ControlType) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          value={field}
          onChange={(newValue) => setField(newValue)}
          options={fieldOptions}
          inputId="sort-field"
          className="input"
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          value={direction}
          onChange={(newValue) => setDirection(newValue)}
          options={directionOptions}
          inputId="sort-direction"
          className="input"
        />
      </div>
    </div>
  );
};

export default Controls;
