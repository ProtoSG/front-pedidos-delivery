/* eslint-disable react/prop-types */
export default function ItemInput({ handleChange, name, value, type }) {
  return (
    <>
      <span className="px-2 pb-2 mt-4">{name}:</span>
      <input
        type={type || "text"}
        placeholder={name}
        onChange={handleChange}
        name={name}
        value={value}
        step={type === "Number" ? "0.01" : null}
        className="border-2 rounded-3xl px-2 py-2 focus:outline-none"
      />
    </>
  );
}
