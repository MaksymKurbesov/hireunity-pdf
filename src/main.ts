import "./style.css";
import * as pdfjsLib from "pdfjs-dist";
import { getDocument } from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { getTextOptions } from "./getTextOptions";
import fontkit from "@pdf-lib/fontkit";

console.log(pdfjsLib.version, "pdfjsLib");

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs`;

const url = "./job_offer.pdf";
const fontUrl = "./calibrib.ttf";

let pdfDoc: PDFDocument;
let originalPdfBytes: ArrayBuffer;
let page: any;
let customFont: ArrayBuffer | Uint8Array;

const canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const nameInput = document.getElementById("name") as HTMLInputElement;
const surnameInput = document.getElementById("surname") as HTMLInputElement;
const nationalityInput = document.getElementById(
  "nationality"
) as HTMLInputElement;
const genderSelect = document.getElementById("gender") as HTMLSelectElement;
const birthdayInput = document.getElementById("birthday") as HTMLInputElement;
const nameCompanyInput = document.getElementById(
  "name-company"
) as HTMLInputElement;
const addressInput = document.getElementById("address") as HTMLInputElement;
const postInput = document.getElementById("post") as HTMLInputElement;
const contactInput = document.getElementById("contact") as HTMLInputElement;
const telephoneInput = document.getElementById("telephone") as HTMLInputElement;
const companyNumberInput = document.getElementById(
  "number-company"
) as HTMLInputElement;
const activityInput = document.getElementById("activity") as HTMLInputElement;
const jobInput = document.getElementById("job") as HTMLInputElement;

const durationWorkInput = document.getElementById(
  "duration"
) as HTMLInputElement;
const workTimeInput = document.getElementById("work-time") as HTMLInputElement;
const salaryInput = document.getElementById("salary") as HTMLInputElement;
const salary2Input = document.getElementById("salary2") as HTMLInputElement;
const placeInput = document.getElementById("place") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;

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
  page = await pdf.getPage(1);

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

  firstPage.drawText(
    surnameInput.value,
    getTextOptions("surname", height, font)
  );
  firstPage.drawText(nameInput.value, getTextOptions("name", height, font));
  firstPage.drawText(
    nationalityInput.value,
    getTextOptions("nationality", height, font)
  );

  console.log(genderSelect.value, "genderSelect.value");
  firstPage.drawText(
    genderSelect.value,
    getTextOptions("gender", height, font)
  );
  firstPage.drawText(
    birthdayInput.value,
    getTextOptions("birthday", height, font)
  );
  firstPage.drawText(
    nameCompanyInput.value,
    getTextOptions("name-company", height, font)
  );
  firstPage.drawText(
    addressInput.value,
    getTextOptions("address", height, font)
  );
  firstPage.drawText(postInput.value, getTextOptions("post", height, font));
  firstPage.drawText(
    contactInput.value,
    getTextOptions("contact", height, font)
  );
  firstPage.drawText(
    telephoneInput.value,
    getTextOptions("telephone", height, font)
  );
  firstPage.drawText(
    companyNumberInput.value,
    getTextOptions("number-company", height, font)
  );
  firstPage.drawText(
    activityInput.value,
    getTextOptions("activity", height, font)
  );
  firstPage.drawText(jobInput.value, getTextOptions("job", height, font));
  firstPage.drawText(
    durationWorkInput.value,
    getTextOptions("duration", height, font)
  );

  firstPage.drawText(
    workTimeInput.value,
    getTextOptions("work-time", height, font)
  );

  firstPage.drawText(salaryInput.value, getTextOptions("salary", height, font));
  firstPage.drawText(
    salary2Input.value,
    getTextOptions("salary2", height, font)
  );

  firstPage.drawText(placeInput.value, getTextOptions("place", height, font));

  firstPage.drawText(dateInput.value, getTextOptions("date", height, font));

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
