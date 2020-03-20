this.randomQuote = '';

function hideNewsFeed(isWhiteTheme) {
  let newsFeed =
    document.querySelectorAll('[role="main"]') &&
    document.querySelectorAll('[role="main"]')[0];

  let quoteBox = document.createElement('div');
  quoteBox.classList.add('card-container');
  quoteBox.setAttribute('role', 'stfu-main');
  quoteBox.innerHTML =
    `<div class="card ${isWhiteTheme ? 'card-white' : 'card-dark'}">` +
    '<div class="card-body">' +
    '<blockquote class="blockquote mb-0">' +
    '<p name="stfu-blockquote-content">loading...</p>' +
    '<footer class="blockquote-footer">' +
    '<cite title="Source Title" name="stfu-cite-content"></cite>' +
    '</footer>' +
    '</blockquote>' +
    '</div>' +
    '<div class="card-footer">' +
    `<button class="btn btn-primary ${
      isWhiteTheme ? 'btn-white' : 'btn-dark'
    }" name="stfu-quote-button">New Quote</button>` +
    '</div>' +
    '</div>';

  const changeRandomQuote = (quote, cite) => {
    this.randomQuote =
      globalThis.quotes[
        Math.floor(Math.random() * (globalThis.quotes.length - 1))
      ];

    const { content, author } = this.randomQuote;

    quote.textContent = content;
    cite.textContent = author;
  };

  if (newsFeed) {
    newsFeed.after(quoteBox);
    newsFeed.remove();

    // DOM elements
    const button = document.querySelector('button[name="stfu-quote-button"]');
    const quote = document.querySelector(
      'blockquote p[name="stfu-blockquote-content"]',
    );
    const cite = document.querySelector(
      'blockquote cite[name="stfu-cite-content"]',
    );

    changeRandomQuote(quote, cite);
    button.addEventListener('click', changeRandomQuote.bind(this, quote, cite));
  }
}

const re = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\//;
const onMainPage = (url) => !!re.exec(url);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (onMainPage(window.location.href)) {
      delay(500).then(() => {
        const backgroundColor = window.getComputedStyle(document.body, null)
          .backgroundColor;
        const whiteTheme = 'rgb(240, 242, 245)';
        const darkTheme = 'rgb(24, 25, 26)';
        const isWhiteTheme = backgroundColor === whiteTheme;

        hideNewsFeed(isWhiteTheme);
      });
    }
  });
});

// Notify me of everything!
const observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
};

// Node, config
// In this case we'll listen to all changes to body and child nodes
const targetNode = document.body;
observer.observe(targetNode, observerConfig);
