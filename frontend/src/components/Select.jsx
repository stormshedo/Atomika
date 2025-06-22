import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';


const Select = (props) => {
    const [selectedOption, setSelectedOption] = useState(props.defaultValue != null ? props.defaultValue : props.option[0]);

  return (
    <div className="">
      <Listbox value={selectedOption} onChange={(value) => {setSelectedOption(value); if(props.onLangChange) props.onLangChange(value); if(props.onChange) props.onChange(props.valueKey, value)}}> 
        <Listbox.Button className="bg-white rounded-2xl py-4 w-42 px-5 text-left flex justify-between outline-none">
          {selectedOption.option}
          <ChevronDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </Listbox.Button>
        <div className="relative">
        <Listbox.Options className="bg-white rounded-2xl mt-1 outline-none w-full absolute z-10 shadow-md">
          {props.options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className="py-3 hover:bg-blue-100 first:hover:rounded-t-2xl last:hover:rounded-b-2xl cursor-pointer px-5"
            >
              {option.option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

export default Select;