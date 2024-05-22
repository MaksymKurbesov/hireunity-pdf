import { rgb } from "pdf-lib";

interface ITextOptions {
  [key: string]: {
    x: number;
    y: number;
    size: number;
    color: any;
    font: any;
  };
}

export const getTextOptions = (text: string, height: number, font: any) => {
  const textOptions: ITextOptions = {
    surname: {
      x: 72,
      y: height - 160,
      size: 10,
      color: rgb(0, 0, 0),
      font: font,
    },
    name: {
      x: 216,
      y: height - 160,
      size: 10,
      color: rgb(0, 0, 0),
      font: font,
    },
    nationality: {
      x: 346,
      y: height - 160,
      size: 10,
      color: rgb(0, 0, 0),
      font: font,
    },
    gender: {
      x: 499,
      y: height - 160,
      size: 10,
      color: rgb(0, 0, 0),
      font: font,
    },
    birthday: {
      x: 144,
      y: height - 191,
      size: 10,
      color: rgb(0, 0, 0),
      font: font,
    },
    [`name-company`]: {
      x: 185,
      y: height - 232,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    address: {
      x: 185,
      y: height - 251,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    post: {
      x: 185,
      y: height - 270,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    contact: {
      x: 185,
      y: height - 290,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    telephone: {
      x: 185,
      y: height - 309,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    [`number-company`]: {
      x: 130,
      y: height - 353,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    activity: {
      x: 113,
      y: height - 373,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    job: {
      x: 385,
      y: height - 373,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    duration: {
      x: 180,
      y: height - 393,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    ["work-time"]: {
      x: 200,
      y: height - 421,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    salary: {
      x: 210,
      y: height - 432,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    salary2: {
      x: 210,
      y: height - 444.5,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    place: {
      x: 145,
      y: height - 579,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
    date: {
      x: 145,
      y: height - 599,
      size: 8,
      color: rgb(0, 0, 0),
      font: font,
    },
  };

  return textOptions[text];
};
