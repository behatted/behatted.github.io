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

submit.addEventListener(`click`, function () {
  const link = `${redditLink.value}.json`;
  console.log(link);
  doIt(link);
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
  for (k = 0; k < obj.length; k++) {
    if (!obj[k].data.replies) {
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
        } else if (shortRoot[i].data.replies.data.children.length === 1) {
          authorChecker(
            shortRoot[i].data.replies.data.children[0].data.author,
            shortRoot[i].data.replies.data.children[0].data.body
          );
        } else {
          iterateObject(shortRoot[i].data.replies.data.children);
        }
      }
      console.log(results);
      let resultsKeys = Object.keys(results);
      console.log(resultsKeys);
      resultsKeys.forEach((item) => {
        printZone.innerText += `${item} ${emojis[item]}: ${results[item]}`;

        printZone.innerText += `\n`;
      });
    });
};
