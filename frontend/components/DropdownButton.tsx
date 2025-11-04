"use client";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";

interface DropdownButtonProps {
  label: string;
  options: string[];
  onSelect?: (option: string) => void;
}

export default function DropdownButton({ label, options, onSelect }: DropdownButtonProps) {
  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button
          className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 
                     text-gray-800 font-medium hover:bg-gray-50 transition focus:outline-none"
        >
          {label}
          <ChevronDown size={16} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-44 origin-top-right 
                     bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none z-10"
        >
          {options.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  onClick={() => onSelect && onSelect(option)}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block w-full text-right px-4 py-2 text-sm`}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
