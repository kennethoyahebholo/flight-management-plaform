import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { IDateInput } from './DateInput.types';

import { ReactComponent as DateInputIcon } from '../../assets/images/calendar-icon.svg';

import DateInputStyles from './DateInput.module.scss';

const DateInput = ({
  onChange,
  className,
  error,
  maxDate,
  disabled,
  value,
  name,
  placeholder = 'DD/MM/YYYY',
  dateFormat = 'DD/MM/YYYY',
  dateInputClassName
}: IDateInput) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const datePickerRef = useRef<typeof DatePicker | null>(null);

  const handleFormChange = (date: Date) => {
    setStartDate(date);
    onChange?.(date);
  };

  const handleDivClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Open the date picker
    }
  };

  return (
    <div className={DateInputStyles.datepicker}>
      {placeholder && (
        <div
          className={`${DateInputStyles.datepicker__placeholder} ${value ? DateInputStyles['datepicker__placeholder--focused'] : ''}`}>
          {placeholder}
        </div>
      )}
      <div
        className={`
          ${
            !error
              ? `${DateInputStyles.datepicker} ${className} app-date-picker `
              : `${DateInputStyles.datepicker} ${className} ${DateInputStyles.errored}  app-date-picker`
          } ${disabled ? DateInputStyles.disabled : DateInputStyles.default}`}
        onClick={handleDivClick}>
        <div className={DateInputStyles.datepicker_content}>
          <DatePicker
            ref={datePickerRef}
            name={name}
            className={`${DateInputStyles.datepicker_content_item} ${dateInputClassName} ${
              disabled && DateInputStyles.disabled
            }`}
            selected={startDate}
            onChange={handleFormChange}
            maxDate={maxDate}
            dateFormat={dateFormat}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            disabled={disabled}
            value={value}
            autoComplete="off"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              e.preventDefault();
            }}
          />
          <DateInputIcon className={DateInputStyles.datepicker_content_icon} />
        </div>

        <div className={DateInputStyles.datepicker_error}>{error && error}</div>
      </div>
    </div>
  );
};

export default DateInput;
