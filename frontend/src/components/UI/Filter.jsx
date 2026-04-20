import { useState } from "react";

const FILTER_TONE_CLASSES = {
  approved: {
    bg: "bg-vert-insecateur",
    text: "text-green-800",
  },
  review: {
    bg: "bg-jaune-simpson",
    text: "text-ocre-rouge",
  },
  rejected: {
    bg: "bg-red-500",
    text: "text-brulure-despespoir",
  },
  pending: {
    bg: "bg-gris-magneti",
    text: "text-gris-anthracite",
  },
  assignation: {
    bg: "bg-bleu-bulma",
    text: "text-gris-anthracite",
  },
  top50: {
    bg: "bg-bleu-ocean",
    text: "text-white",
  },
  top5: {
    bg: "bg-bleu-ocean",
    text: "text-white",
  },
};

const Filter = ({
  variant = "pending",
  checked,
  defaultChecked = false,
  children = "Filtre",
  className = "",
  onChange,
  disabled = false,
  id,
  name,
}) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;
  const currentTone =
    FILTER_TONE_CLASSES[variant] || FILTER_TONE_CLASSES.pending;
  const stateClass = isChecked
    ? "status-filter-checked"
    : "status-filter-unchecked";
  const textColorClass = isChecked ? currentTone.text : "text-black/45";
  const classes = `btn-base status-filter ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${stateClass} ${className}`;

  const handleCheckboxChange = (event) => {
    const nextChecked = event.target.checked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(nextChecked, event);
  };

  return (
    <label className={`${classes} ${disabled ? "" : "cursor-pointer"}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        className="sr-only"
      />

      <>
        <div className={`btn-bg-filter ${currentTone.bg}`}>
          <span
            className={`filter-checkbox ${isChecked ? "filter-checkbox-checked" : "filter-checkbox-unchecked"}`}
          >
            <span
              className={`filter-checkmark ${isChecked ? "opacity-100" : "opacity-0"}`}
            >
              ✓
            </span>
          </span>
        </div>

        <span
          className={`relative z-10 pointer-events-none pl-6 pr-2 text-sm ${textColorClass}`}
        >
          {children}
        </span>
      </>
    </label>
  );
};

export { Filter, Filter as Filtre };
export default Filter;
