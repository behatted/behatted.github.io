const elWithEmoji = [
  `👑 Almighty`,
  `⚔️ Havoc`,
  `⚖️ Lawful`,
  `🌞 Light`,
  `🌚 Dark`,
  `🧑‍⚖️ Order`,
  `😈 Sinful`,
  `🤯 Chaos`,
  `☠️ Curse`,
  `😇 Bless`,
];

const emojis = {
  Almighty: `👑`,
  Havoc: `⚔️`,
  Lawful: `⚖️`,
  Light: `🌞`,
  Dark: `🌚`,
  Order: `🧑‍⚖️`,
  Sinful: `😈`,
  Chaos: `🤯`,
  Curse: `☠️`,
  Bless: `😇`,
};

const results = {
  Almighty: `No data yet`,
  Havoc: `No data yet`,
  Lawful: `No data yet`,
  Light: `No data yet`,
  Dark: `No data yet`,
  Order: `No data yet`,
  Sinful: `No data yet`,
  Chaos: `No data yet`,
  Curse: `No data yet`,
  Bless: `No data yet`,
};
const redditLink = document.querySelector(".redditLink");
const submit = document.querySelector(".submit");
const printZone = document.querySelector(`.results`);
const loading = document.querySelector(".gif");

loading.style.display = `none`;
redditLink.value = "";

const clickOrEnter = function () {
  Object.keys(results).forEach((key) => {
    results[key] = "No data yet";
  });
  loading.style.display = `block`;
  printZone.innerText = ``;
  link = `${redditLink.value}.json`;
  console.log(link);
  doIt(link);
};

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    clickOrEnter();
  }
});

submit.addEventListener(`click`, function () {
  clickOrEnter();
});

const elchecker = function (string) {
  let els = Object.keys(results);
  for (let i = 0; i < Object.keys(results).length; i++) {
    if (string.includes(els[i]) && string.includes(`WEAK`) && results[els[i]] == `No data yet`) {
      results[els[i]] = `WEAK`;
    } else if (
      string.includes(els[i]) &&
      string.includes(`RESIST`) &&
      results[els[i]] == `No data yet`
    ) {
      results[els[i]] = `RESIST`;
    } else if (string.includes(els[i]) && results[els[i]] == `No data yet`) {
      results[els[i]] = `NEUTRAL`;
    } else {

    }
  }
};

const iterateObject = function (obj) {
  console.log(`Iterating in progress`);
  for (k = 0; k < obj.length; k++) {
    if (!obj[k].data.replies) {
      console.log(obj[k].data.author);
      console.log(obj[k].data.body);

      authorChecker(obj[k].data.author, obj[k].data.body);
    } else {
      iterateObject(obj[k].data.replies.data.children);
    }
  }
};

const authorChecker = function (author, body) {
  if (author == `KickOpenTheDoorBot`) {
    if (
      body.includes(`You attacked without a weapon!`) ||
      body.includes(`Unfortunately I couldn't find the item`)
    ) {
    } else {
      elchecker(body);
    }
  }
};

const doIt = function (link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      const shortRoot = data[1].data.children;


      for (let i = 1; i < shortRoot.length; i++) {

        if (!shortRoot[i].data.replies) {
          authorChecker(shortRoot[i].data.author, shortRoot[i].data.body);
        } else if ((shortRoot[i].data.author, shortRoot[i].data.body)) {
          iterateObject(shortRoot[i].data.replies.data.children);
        } else if (shortRoot[i].data.replies.data.children.length === 1) {
          authorChecker(
            shortRoot[i].data.replies.data.children[0].data.author,
            shortRoot[i].data.replies.data.children[0].data.body
          );
        } else {
          console.log(`Sending to iterate`);
          console.log(shortRoot[i].data.replies.data.children);
          iterateObject(shortRoot[i].data.replies.data.children);
        }
      }
      console.log(results);
      loading.style.display = `none`;
      let resultsKeys = Object.keys(results);
      console.log(resultsKeys);
      resultsKeys.forEach((item) => {
        printZone.innerText += `${item} ${emojis[item]}: ${results[item]}`;

        printZone.innerText += `\n`;
      });
    })
    .catch((error) => {
      loading.style.display = `none`;
      printZone.innerText = `Sorry. Not able to get any info from that link I'm afraid`;
      console.log(`Something went wrong`);
    });
};
