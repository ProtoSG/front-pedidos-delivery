import PropTypes from "prop-types";

export default function SimpleSwitcher({
  items,
  activeItem,
  setActiveInterval,
}) {
  const handleItemClicked = (item) => {
    if (item !== activeItem) {
      setActiveInterval(item);
    }
  };

  return (
    <div className="flex border-2 border-gray-400 rounded-xl p-1">
      {items.map((item) => (
        <button
          key={item}
          className={`transition-all px-4 py-2 rounded-lg text-sm lg:text-lg
                    ${
                      item === activeItem
                        ? "text-accent-200 bg-primary-400"
                        : "text-text-200 hover:bg-primary-200"
                    }`}
          onClick={() => handleItemClicked(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

SimpleSwitcher.propTypes = {
  items: PropTypes.array.isRequired,
  activeItem: PropTypes.any.isRequired,
  setActiveInterval: PropTypes.func.isRequired,
};
