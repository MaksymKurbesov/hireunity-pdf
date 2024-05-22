import "./style.css";
import * as pdfjsLib from "pdfjs-dist";
import { getDocument } from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { getTextOptions } from "./getTextOptions";
import fontkit from "@pdf-lib/fontkit";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs`;

const url = "./job_offer.pdf";
const fontUrl = "./calibrib.ttf";

let pdfDoc: PDFDocument;
let originalPdfBytes: ArrayBuffer;
let customFont: ArrayBuffer | Uint8Array;

const canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const inputs = {
  name: document.getElementById("name") as HTMLInputElement,
  surname: document.getElementById("surname") as HTMLInputElement,
  nationality: document.getElementById("nationality") as HTMLInputElement,
  gender: document.getElementById("gender") as HTMLSelectElement,
  birthday: document.getElementById("birthday") as HTMLInputElement,
  nameCompany: document.getElementById("name-company") as HTMLInputElement,
  address: document.getElementById("address") as HTMLInputElement,
  post: document.getElementById("post") as HTMLInputElement,
  contact: document.getElementById("contact") as HTMLInputElement,
  telephone: document.getElementById("telephone") as HTMLInputElement,
  numberCompany: document.getElementById("number-company") as HTMLInputElement,
  activity: document.getElementById("activity") as HTMLInputElement,
  job: document.getElementById("job") as HTMLInputElement,
  durationWork: document.getElementById("duration") as HTMLInputElement,
  workTime: document.getElementById("work-time") as HTMLInputElement,
  salary: document.getElementById("salary") as HTMLInputElement,
  salary2: document.getElementById("salary2") as HTMLInputElement,
  place: document.getElementById("place") as HTMLInputElement,
  date: document.getElementById("date") as HTMLInputElement,
};

async function loadPdf() {
  originalPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  pdfDoc = await PDFDocument.load(originalPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  await renderPdf();
}

async function loadCustomFont() {
  customFont = await fetch(fontUrl).then((res) => res.arrayBuffer());
}

async function renderPdf() {
  const pdfBytes = await pdfDoc.save();
  const pdf = await getDocument({ data: pdfBytes }).promise;
  const page = await pdf.getPage(1);

  const scale = 2;
  const viewport = page.getViewport({ scale: scale });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await page.render(renderContext);
}

async function updatePdf() {
  pdfDoc = await PDFDocument.load(originalPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { height } = firstPage.getSize();

  const font = await pdfDoc.embedFont(customFont);

  Object.keys(inputs).forEach((key) => {
    const input = inputs[key as keyof typeof inputs];
    firstPage.drawText(input.value, getTextOptions(key, height, font));
  });

  await renderPdf();
}

document
  .getElementById("pdf-form")
  ?.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    await updatePdf();
  });

document
  .querySelector(".download-button")
  ?.addEventListener("click", async (event: Event) => {
    event.preventDefault();

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "filled_form.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

loadCustomFont().then(loadPdf);
