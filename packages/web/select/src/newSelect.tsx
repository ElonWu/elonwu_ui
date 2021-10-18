import React from 'react';
import Select from 'react-select';
import { SelectProps, IOptions } from '.';

export const NewSelect = (props: SelectProps) => {
  const { options, onChange, multiple } = props;

  const handleChange = (option: any) => {
    if (multiple) {
      const values = option.map((item: IOptions) => item.value);
      onChange && onChange(values, option);
    } else {
      const value = option.value;
      onChange && onChange(value, option);
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      classNamePrefix="demon"
      isMulti={multiple}
    />
  );
};
