interface Option {
  label: string;
  value: number;  
}

export function MultiSelect({
  options,
  selected,
  setSelected,
}: {
  options: Option[];
  selected: number[];
  setSelected: (val: number[]) => void;
}) {
  const toggleOption = (value: number) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="dropdown w-full">
      <label
        tabIndex={0}
        className="btn w-full btn-neutral justify-between"
      >
        {selected.length > 0
          ? `${selected.length} selected`
          : "Select topics"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
      >
        {options.map((opt) => (
          <li key={opt.value}>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mr-2"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
              />
              <span className="label-text">{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
