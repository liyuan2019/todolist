import { useEffect, useState } from "react";
import { CirclePicker, ColorChangeHandler } from "react-color";
import styled from "styled-components";
import { colors } from "../data/initial-data";

type ColorPickerProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  setColor,
}) => {
  const [textColor, setTextColor] = useState("#ffffff");

  const handleOnChangeBgColor: ColorChangeHandler = (color) => {
    const colorHex = color.hex;
    setColor(colorHex);
  };

  // 選択した背景色の明るさによって文字色を白か黒に設定する
  useEffect(() => {
    const brightness =
      parseInt(color.substring(1, 3), 16) * 0.299 +
      parseInt(color.substring(3, 5), 16) * 0.587 +
      parseInt(color.substring(5, 7), 16) * 0.114;
    const textColor = brightness >= 180 ? "#000000" : "#ffffff";
    setTextColor(textColor);
  }, [color]);

  return (
    <Wrapper>
      <CirclePicker onChange={handleOnChangeBgColor} colors={colors} />
      <ColorButton bgColor={color} textColor={textColor}>
        {color}
      </ColorButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .circle-picker {
    width: 80% !important;
  }
`;

const ColorButton = styled.div<{ bgColor: string; textColor: string }>`
  border-radius: 5px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  height: 30px;
  width: 100%;
  text-align: center;
  padding: 3px;
`;
