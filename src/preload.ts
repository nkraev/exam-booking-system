// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { Notification, ipcRenderer } from "electron";

const DELAY_DURATION = 2000; // 2 seconds of waiting to be more 'human'
const RANDOM_DURATION = 500; // 500 ms randomization so we don't click like robots with the same intervals
const WAIT_DURATION = 1800000; // 30 minutes in milliseconds

const MIN_SEATS = 0;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, DELAY_DURATION + ms + Number.parseInt(`${Math.random() * RANDOM_DURATION}`)));
function element<T extends HTMLElement = HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

const handleBlocked = async () => {
  if (document.body.innerText.length == 0) {
    new Notification({
      title: "We are blocked!",
      body: "We might need to restart the app..."
    }).show();
  }
}

const handleCookies = async () => {
  if (element("adroll_allow_all") != null) {
    console.log("Handling cookies...");
    await sleep(2000);
    element("adroll_allow_all").click();
  } else {
    console.log("No cookies detected, proceeding...");
  }
}

const handleLogin = async () => {
  new Notification({
    title: "Test!",
    sound: 'Crystal',
    body: "We might need to restart the app..."
  }).show();

  return ;

  if (document.URL.endsWith("ECFVGlogin.aspx")) {
    console.log("Handling login...");
    await sleep(500);
    element<HTMLInputElement>('txtUserID').value = "338788";
    await sleep(500);
    element<HTMLInputElement>('txtPassword').value = "anais08audeberT";
    await sleep(900);
    element('ctl12_cmdLogin').click();
  }
}

const handleRedirect = async () => {
  if (document.body.innerText.includes("Invalid ID Parameter")) {
    console.log('Redirecting to rescheduling page...');
    await sleep(3000);
    document.location.href = "https://ebusiness.avma.org/ECFVG/AVMACPESchedule.aspx?ID=8115&Section=Surgery";
  }
}

const radios = [
  "C003_dlv_rblExamDate_0_0_0",
  "C003_dlv_rblExamDate_1_0_1",
  "C003_dlv_rblExamDate_1_1_1",
  "C003_dlv_rblExamDate_1_2_1",
];

const regex = /(\d+)/g;

const getNumber = (totalSeatsText: string): number => {
  const res = totalSeatsText.match(regex);
  const availableSeats = res == null || res.length == 0 ? 0 : Number.parseInt(res[0]);
  return availableSeats;
}

const handleMainContent = async () => {
  if (element('pnlSchedule') != null) {
    console.log('Handling main page...');
    const currentlySelectedRadios = radios
      .map((id, idx) => {
        return {
          "element": element<HTMLInputElement>(id),
          "index": idx,
        }
      })
      .filter(input => input.element.checked);

    if (currentlySelectedRadios.length == 0) {
      console.log('No radios selected, clicking first...');
      await sleep(3000);
      element(radios[0]).click();
    } else {
      const radio = currentlySelectedRadios[0];
      console.log("Currently clicked:", radios[radio.index]);

      const totalSeatsText = element('pnlSectionInfo').innerText;
      const seatNumbers = getNumber(totalSeatsText);
      if (seatNumbers >= MIN_SEATS) {
        console.log('Found a seat!');
        new Notification({
          title: "Found a seat!",
          body: "The seat has been found, log in via Chrome or continue here"
        }).show();

        return;
      }

      if (radio.index == radios.length - 1) {
        console.log(`Checked all options, sleeping for ${WAIT_DURATION / 1000 / 60} minutes...`);
        await sleep(WAIT_DURATION);
        element(radios[0]).click();
      } else {
        const nextToClick = radio.index + 1;
        await sleep(4000);
        element(radios[nextToClick]).click();
      }
    }
  }
}

const appIsLoaded = async () => {
  console.log('App is loaded, url:', document.URL);
  handleBlocked();
  handleCookies();
  handleLogin();
  handleRedirect();
  handleMainContent();
}

ipcRenderer.on('page-load', appIsLoaded);
