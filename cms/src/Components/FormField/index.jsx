import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

const FormField = ({
  label,
  name,
  register,
  type = "text",
  error,
  placeholder,
  options,
  onChange,
  required,
  readOnly,
  value: externalValue,
  className,
  isSearchable = false,
  pattern,
  minLength,
  ...props
}) => {
  const [dateValue, setDateValue] = useState(externalValue ? new Date(externalValue) : null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (type === "select" && options && externalValue) {
      const matchingOption = options.find((option) => option.value === externalValue);
      setSelectedOption(matchingOption ? matchingOption.label : placeholder || "Select");
    }
  }, [externalValue, options, type, placeholder]);

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    const event = { target: { name, value: option.value } };
    register(name).onChange(event);
    if (onChange) onChange(event);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredOptions = isSearchable
    ? options?.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : options || [];

  // Build validation rules for react-hook-form
  const validationRules = {};
  if (required) {
    validationRules.required = typeof required === "string" ? required : "This field is required";
  }
  if (pattern) {
    validationRules.pattern = pattern;
  }
  if (minLength) {
    validationRules.minLength = minLength;
  }

  return (
    <div className={`mb-4 ${className || ""}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {type === "select" ? (
        <div className="relative">
          <div
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 cursor-pointer flex justify-between items-center focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedOption || placeholder || "Select"}</span>
            <span className="text-gray-600">▼</span>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
              >
                {isSearchable && (
                  <div className="p-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:border-blue-500 focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      className="p-2 cursor-pointer text-gray-800"
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </motion.div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No options found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : type === "date" || type === "datetime-local" ? (
        <DatePicker
          selected={dateValue}
          onChange={(date) => {
            setDateValue(date);
            const formattedDate =
              type === "datetime-local"
                ? date?.toISOString()
                : date?.toISOString().split("T")[0];
            const event = { target: { name, value: formattedDate } };
            register(name).onChange(event);
            if (onChange) onChange(event);
          }}
          showTimeSelect={type === "datetime-local"}
          dateFormat={type === "datetime-local" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
          placeholderText={placeholder || "Select date"}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          required={typeof required === "string" ? !!required : required}
        />
      ) : type === "radio" ? (
        <div className="flex space-x-4">
          {options?.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                {...register(name, validationRules)}
                value={option.value}
                onChange={(e) => {
                  register(name).onChange(e);
                  if (onChange) onChange(e);
                }}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder || `Enter ${label?.toLowerCase() || "value"}`}
          {...register(name, validationRules)}
          onChange={(e) => {
            register(name).onChange(e);
            if (onChange) onChange(e);
          }}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 placeholder:text-gray-400"
          readOnly={readOnly}
          {...props}
        />
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormField;