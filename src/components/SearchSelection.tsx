import React from "react";
import Select from "react-select";
type OptionValue = string | number;
type Option<T extends OptionValue> = {
  value: T;
  label: string;
};
export interface SelectProps<T extends OptionValue> {
  options: Option<T>[];
  value?: T | T[];
  multi: boolean;
  focus: () => void;
  onChange: (value: T) => void;
  className?: string;
  isLoading?: boolean;
}

export const SearchSelection = <T extends OptionValue>(
  props: SelectProps<T>
) => {
  const getName = (element: any) =>
    props.multi ? element?.map((e: { value: T }) => e.value) : element?.value;

  //знаю что any плохо
  function handleOnChange(element: any) {
    const name = getName(element);
    props.onChange(name);
  }

  function handleSearchInput(e: any, { action }: any) {
    const actions = ["menu-close", "input-blur", "set-value"];
    if (actions.includes(action)) {
      return;
    } else {
      const name: T =
        props.options.filter((item) => item.value === e)?.pop()?.value ??
        ("" as T);
      props.onChange(name);
    }
  }

  return (
    <Select
      className={props.className}
      options={props.options}
      isMulti={props.multi}
      onFocus={props.focus}
      onInputChange={(e, action) => handleSearchInput(e, action)}
      onChange={handleOnChange}
      isSearchable={true}
      backspaceRemovesValue={true}
      isClearable={true}
      isLoading={props.isLoading}
    />

    /* 
      <input list="select" onChange={handleOnChange} multiple />
      <datalist id="select">
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
   */
  );
};
