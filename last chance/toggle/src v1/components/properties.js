import './properties.css';
import React from 'react';
import { CiPlay1, CiUnlock } from "react-icons/ci";
import { RxRotateCounterClockwise } from "react-icons/rx";
import { TbBorderCornerRounded } from "react-icons/tb";
import { LuAlignHorizontalSpaceAround, LuAlignVerticalSpaceAround, LuAlignVerticalJustifyCenter, LuAlignHorizontalJustifyCenter } from "react-icons/lu";
import { GoArrowRight, GoArrowDown } from "react-icons/go";
import { VscNewline } from "react-icons/vsc";
import { PiTextAlignLeftLight, PiTextAlignCenterLight, PiTextAlignRightLight } from "react-icons/pi";

import { Select, SelectItem, Avatar, Input, Accordion, AccordionItem } from "@nextui-org/react";
import { useUtils } from '../modules/Utils';

import { IoAddSharp } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";





function Properties() {
  const { propertieswidth, setpropertieswidth } = useUtils();

  return (
    <div style={{ "right": `-${propertieswidth}px` }} className='Properties'>
      <div className='top'>

        <div className='topequalbox'>
          <Select
            defaultSelectedKeys={["100%"]}
            className="zoom"
          >
            <SelectItem key="100%">100%</SelectItem>
            <SelectItem key="50%">50%</SelectItem>
            <SelectItem key="30%">30%</SelectItem>
          </Select>
        </div>

        <div className='topequalbox'>
          <Avatar className='avtar' isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        </div>


        <div className='topequalbox'>
          <CiPlay1 className='preview' />
        </div>




      </div>


      <div className='propertiesscroll'>


        <div className='section'>
          <div className='title'>Page 1</div>
          <div className='dual'>
            <Input
              className='input'
              type="number"
              placeholder="00"
              labelPlacement="outside"
              startContent={
                <div className='inputtext'>X</div>
              }
            />

            <Input
              className='input'
              type="number"
              placeholder="0.00"
              labelPlacement="outside"
              startContent={
                <div className='inputtext'>Y</div>
              }
            />
          </div>
          <div className='dual'>
            <Input
              className='input'
              type="number"
              placeholder="00"
              labelPlacement="outside"
              startContent={
                <div className='inputtext'>W</div>
              }
            />

            <Input
              className='input'
              type="number"
              placeholder="0.00"
              labelPlacement="outside"
              startContent={
                <div className='inputtext'>H</div>
              }
            />
            <button className='lock'><CiUnlock /></button>
          </div>

          <div className='dual'>
            <Input
              className='input'
              type="number"
              placeholder="00"
              labelPlacement="outside"
              startContent={
                <RxRotateCounterClockwise className='inputicon' />
              }
            />

            <Input
              className='input'
              type="number"
              placeholder="0.00"
              labelPlacement="outside"
              startContent={
                <TbBorderCornerRounded className='inputicon' />
              }
            />
          </div>

        </div>


        <Accordion selectionMode="multiple">
          <AccordionItem className='section' indicator={({ isOpen }) => (isOpen ? <RxDividerVertical /> : <IoAddSharp />)} aria-label="Accordion 1" title={<div className='title'>Layout</div>}>

            <div className='parts'>
              <div className='part1'>
                <div className='btns'>
                  <button><GoArrowRight /></button>
                  <button><GoArrowDown /></button>
                  <button><VscNewline /></button>
                </div>
                <Input
                  className='input'
                  type="number"
                  placeholder="00"
                  labelPlacement="outside"
                  startContent={
                    <LuAlignVerticalJustifyCenter className='inputicon' />
                  }
                />

                <Input
                  className='input'
                  type="number"
                  placeholder="0.00"
                  labelPlacement="outside"
                  startContent={
                    <LuAlignHorizontalJustifyCenter className='inputicon' />
                  }
                />


              </div>
              <div className='part2'>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
                <div className='box'><div className='blue' /></div>
              </div>
            </div>
            <div className='dual'>
              <Input
                className='input'
                type="number"
                placeholder="00"
                labelPlacement="outside"
                startContent={
                  <LuAlignHorizontalSpaceAround className='inputicon' />
                }
              />

              <Input
                className='input'
                type="number"
                placeholder="0.00"
                labelPlacement="outside"
                startContent={
                  <LuAlignVerticalSpaceAround className='inputicon' />
                }
              />
            </div>
          </AccordionItem>

          <AccordionItem className='section' indicator={({ isOpen }) => (isOpen ? <RxDividerVertical /> : <IoAddSharp />)} aria-label="Accordion 1" title={<div className='title'>Fill</div>}>
            <div className='triple'>
              <div className='color'></div>
              <Input
                className='hex'
                type="text"
                placeholder="#FFF"
                labelPlacement="outside"
              />
              <Input
                className='opacity'
                type="number"
                placeholder="100%"
              />
            </div>

          </AccordionItem>

          <AccordionItem className='section' indicator={({ isOpen }) => (isOpen ? <RxDividerVertical /> : <IoAddSharp />)} aria-label="Accordion 1" title={<div className='title'>Border</div>}>
            <div className='triple'>
              <div className='color'></div>
              <Input
                className='hex'
                type="text"
                placeholder="#FFF"
                labelPlacement="outside"
              />
              <Input
                className='opacity'
                type="number"
                placeholder="100%"
              />
            </div>

            <div className='dual'>
              <Select
                defaultSelectedKeys={["100%"]}
                className="select"
              >
                <SelectItem key="100%">100%</SelectItem>
                <SelectItem key="50%">50%</SelectItem>
                <SelectItem key="30%">30%</SelectItem>
              </Select>

              <Input
                className='input'
                type="number"
                placeholder="0.00"
                labelPlacement="outside"
                startContent={
                  <div className='inputtext'>Y</div>
                }
              />
            </div>
          </AccordionItem>

          <AccordionItem className='section' indicator={({ isOpen }) => (isOpen ? <RxDividerVertical /> : <IoAddSharp />)} aria-label="Accordion 1" title={<div className='title'>Text</div>}>
            <div className='dual'>
              <Select
                defaultSelectedKeys={["Roboto"]}
                className="select selectfont"
              >
                <SelectItem key="Roboto">Roboto</SelectItem>
                <SelectItem key="Inter">Inter</SelectItem>
                <SelectItem key="Open Sans">Open Sans</SelectItem>
              </Select>

            </div>

            <div className='dual'>

              <Select
                defaultSelectedKeys={["Bold"]}
                className="select"
              >
                <SelectItem key="Thin">Thin</SelectItem>
                <SelectItem key="Light">Light</SelectItem>
                <SelectItem key="Regular">Regular</SelectItem>
                <SelectItem key="Bold">Bold</SelectItem>
              </Select>

              <Input
                className='input'
                type="number"
                placeholder="0.00"
                labelPlacement="outside"
                startContent={
                  <div className='inputtext'>S</div>
                }
              />
            </div>

            <div className='textbtns'>
              <button><PiTextAlignLeftLight /></button>
              <button><PiTextAlignCenterLight /></button>
              <button><PiTextAlignRightLight /></button>
            </div>
          </AccordionItem>


          <AccordionItem className='section' indicator={({ isOpen }) => (isOpen ? <RxDividerVertical /> : <IoAddSharp />)} aria-label="Accordion 1" title={<div className='title'>Image</div>}>
            <div className='triple'>
              <div className='color'></div>
              <Input
                className='hex'
                type="text"
                placeholder="#FFF"
                labelPlacement="outside"
                disabled
              />
              <Input
                className='opacity'
                type="number"
                placeholder="100%"
              />
            </div>
          </AccordionItem>

        </Accordion>



      </div>


      <div onClick={(e) => {
        if (propertieswidth === 0) {
          setpropertieswidth(250);
        }
        if (propertieswidth === 250) {
          setpropertieswidth(0);
        }
      }} className='propertiesbar'>
        <div className='bar'></div>
      </div>

    </div>
  );
}

export default Properties;
