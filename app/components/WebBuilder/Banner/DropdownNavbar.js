import { Label } from "@radix-ui/react-context-menu";
import React, { useState } from "react";
import Tooltip from "./ToolTip";
import {
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaFileImage,
  FaUpload,
  FaLink,
} from "react-icons/fa";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaPalette,
  FaFont,
  FaTextHeight,
  FaSubscript,
  FaSuperscript,
  FaStrikethrough,
} from "react-icons/fa";

const DropdownNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(true);
  const [isBackgroundOpen, setBackgroundOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [logoType, setLogoType] = useState("text");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleColorChange = (event) => {
    setTextColor(event.target.value);
  };
  const handleLogoTypeChange = (event) => {
    setLogoType(event.target.value);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleImageSubmit = (e) => {
    e.preventDefault();
    setImages([...images, imageUrl]);
    setImageUrl("");
  };

  return (
    <div className="dropdown border-b-4 pb-3 mb-3">
      <p
        onClick={toggleDropdown}
        className=" flex mb-5 justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" font-bold text-xl ">Customize</p>
        {isOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isOpen && (
        <div className=" ">
          <p
            onClick={() => setIsTextOpen((pr) => !pr)}
            className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
          >
            <p className=" text-gray-900 font-semibold text-md  mb-2">Text</p>
            {isTextOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
          </p>
          {isTextOpen && (
            <div>
              <div>
                <input
                  id="banner-text"
                  type="text"
                  placeholder="Text"
                  style={{ color: textColor }}
                  className="border-2 border-gray-300 p-2 rounded-md"
                />

                <div className="flex items-center mt-4">
                  <label htmlFor="colorPicker" className="mr-2">
                    Color:
                  </label>
                  <input
                    id="colorPicker"
                    type="color"
                    onChange={handleColorChange}
                    className="border-2 border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex space-x-2 mt-4 text-gray-600">
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaBold />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaItalic />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaUnderline />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaStrikethrough />
                  </button>

                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaUnderline />
                  </button>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaTextHeight />
                  </button>
                  <input
                    id="colorPicker"
                    type="number"
                    min="1"
                    max="50"
                    step="1"
                    onChange=""
                    className="border-2 border-gray-300 p-2 rounded-md"
                  />
                  <select
                    value="14"
                    onChange=""
                    className="border-2 border-gray-300 p-2 rounded-md"
                  >
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="30px">30px</option>
                  </select>
                </div>
                <p>layout</p>
                <div className="flex space-x-5 mt-4 text-gray-600">
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaAlignLeft />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaAlignCenter />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-md">
                    <FaAlignRight />
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <p
            onClick={() => setIsLogoOpen((pr) => !pr)}
            className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
          >
            <p className=" text-gray-900 font-semibold text-md  mb-2">Logo</p>
            {isLogoOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
          </p>
          {isLogoOpen && (
            <div>
              <label htmlFor="logoType" className="text-gray-600">
                Logo Type:{" "}
              </label>
              <select
                id="logoType"
                onChange={handleLogoTypeChange}
                className="border-2 border-gray-300 px-10 rounded-md mb-5 focus:border-gray-900"
              >
                <option value="text" className="hover:bg-red-50">
                  Text
                </option>
                <option value="image">Image</option>
              </select>
              {logoType == "image" && (
                <div>
                  <div className="flex items-center mt-5">
                    <input
                      type="file"
                      id="imageUpload"
                      onChange=""
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex items-center"
                    >
                      <FaFileImage
                        size={24}
                        className="text-gray-900 hover:text-blue-300 mr-2"
                      />
                      <FaUpload
                        size={24}
                        className="text-gray-900 hover:text-blue-300"
                      />
                    </label>
                    <button
                      onClick=""
                      className="ml-4 bg-gray-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                    >
                      Upload
                    </button>
                  </div>
                  <div className="flex space-x-5 my-4">
                    <Tooltip text="Link">
                      <FaLink className="mr-2 cursor-pointer" />
                    </Tooltip>
                    <input
                      type="text"
                      value=""
                      onChange=""
                      placeholder="Enter logo link"
                      className="focus:border-gray-900 border-2 w-[70%] border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <label htmlFor="logoWidth" className="mr-2">
                    Width:
                  </label>
                  <input
                    id="logoWidth"
                    type="number"
                    onChange=""
                    className="focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md"
                  />
                  <label htmlFor="logoHeight" className="mr-2 m">
                    Height:
                  </label>
                  <input
                    id="logoHeight"
                    type="number"
                    onChange=""
                    className="focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md"
                  />
                </div>
              )}
            </div>
          )}
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <p
            onClick={() => setIsButtonOpen((pr) => !pr)}
            className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
          >
            <p className=" text-gray-900 font-semibold text-md  mb-2">Button</p>
            {isButtonOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
          </p>
          {isButtonOpen && (
            <div>
              <label htmlFor="buttonText" className="text-gray-500">
                Button text:{" "}
              </label>
              <input
                id="buttonText"
                placeholder="Button text"
                type="text"
                onChange=""
                className="focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md"
              />
              <div className="flex items-center mt-4">
                <label htmlFor="colorPicker" className="mr-2">
                  Background Color:
                </label>
                <input
                  id="colorPicker"
                  type="color"
                  onChange=""
                  className="border-2 border-gray-300 p-2 rounded-md my-4"
                />
              </div>
              <div className="flex items-center mt-4">
                <label htmlFor="btnHoverBackgroundColor" className="mr-2">
                  Hover background Color:
                </label>
                <input
                  id="btnHoverBackgroundColor"
                  type="color"
                  onChange=""
                  className="border-2 border-gray-300 p-2 rounded-md my-4"
                />
              </div>
              <div className="flex items-center mt-4">
                <label htmlFor="btnBorderRadius" className="mr-2">
                  Button border radius
                </label>
                <input
                  id="colorPicker"
                  type="number"
                  onChange=""
                  min="1"
                  className="w-1/3 focus:border-gray-900 border-2 border-gray-300 p-2 rounded-md my-4"
                />
              </div>
              <p>Button layout</p>
              <div className="flex space-x-5 mt-4 text-gray-600">
                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaAlignLeft />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaAlignCenter />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaAlignRight />
                </button>
              </div>
              <div className="flex items-center mt-2">
                <label htmlFor="colorPicker" className="mr-2">
                  Text Color:
                </label>
                <input
                  id="colorPicker"
                  type="color"
                  onChange=""
                  className="border-2 border-gray-300 p-2 rounded-md my-2"
                />
              </div>
              <div className="flex space-x-2 mt-4 text-gray-600">
                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaBold />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaItalic />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaUnderline />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-md ">
                  <FaStrikethrough />
                </button>

                <button className="p-2 hover:bg-gray-200 rounded-md">
                  <FaUnderline />
                </button>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="text-gray-600 p-2 hover:bg-gray-200 rounded-md">
                  <FaTextHeight />
                </button>
                <input
                  id="colorPicker"
                  type="number"
                  min="1"
                  max="50"
                  step="1"
                  onChange=""
                  className="border-2 border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <label htmlFor="btnFontFamily">Font family</label>
                <input
                  id="btnFontFamily"
                  type="text"
                  placeholder="Font family"
                  onChange=""
                  className="border-2 border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex space-x-5 my-4">
                <Tooltip text="Link">
                  <FaLink className="mr-2 cursor-pointer" />
                </Tooltip>
                <input
                  type="text"
                  value=""
                  onChange=""
                  placeholder="Button link"
                  className="focus:border-gray-900 border-2 w-[70%] border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          )}
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
          <p
            onClick={() => setIsOverlayOpen((pr) => !pr)}
            className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
          >
            <p className=" text-gray-900 font-semibold text-md  mb-2">
              Overlay Effect
            </p>
            {isOverlayOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
          </p>
          {isOverlayOpen && (
            <div>
              <div className="flex items-center mt-2">
                <label htmlFor="backDropColor" className="mr-2">
                  Backdrop Color:
                </label>
                <input
                  id="backDropColor"
                  type="color"
                  onChange=""
                  className="border-2 border-gray-300 p-2 rounded-md my-2"
                />
              </div>
              <div className="flex space-x-10 my-4">
                <label htmlFor="overlayOpacity">Opacity:</label>
                <input
                  id="overlayOpacity"
                  type="number"
                  value=""
                  min="1"
                  max="100"
                  onChange=""
                  placeholder="1"
                  className="focus:border-gray-900 border-2 w-1/4 border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          )}
          <div className="h-1 rounded w-full bg-slate-200 my-4"> </div>
        </div>
      )}
      <p
        onClick={() => setIsCarouselOpen((pr) => !pr)}
        className=" flex justify-between focus:border-0 hover:cursor-pointer w-full border-0 hover:text-blue-300 "
      >
        <p className=" text-gray-900 font-semibold text-md  mb-2">
          Carousel set up
        </p>
        {isCarouselOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
      </p>
      {isCarouselOpen && (
        <div>
          {" "}
          <form onSubmit={handleImageSubmit}>
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter Image URL"
              className="focus:border-gray-900 border-2  border-gray-300 p-2 rounded-md mt-4"
            />
            <button
              onClick=""
              className="my-4 ml-4 bg-gray-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
            >
              Add Image
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DropdownNavbar;
