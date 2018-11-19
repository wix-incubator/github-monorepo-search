// const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
//   fn(...args, (err, data) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data);
//     }
//   })

// const getCurrent = promisify(chrome.tabs.getCurrent);

// https://github.com/search/advanced?q=org%3Awix-node-platform+asdsad


(function setup() {
  const formEl: HTMLFormElement = document.querySelector('.main-form');
  formEl.onsubmit = (ev) => {
    ev.preventDefault();
    console.log(formEl.elements, ev)
    chrome.tabs.query({active: true}, (tabs) => {
      if (tabs.length) {
        const [selectedTab] = tabs;
        if (selectedTab.url.startsWith('https://github.com/wix-platform/wix-node-platform/tree/master')) {
          chrome.tabs.create({url: 'https://github.com/search/advanced?q=' + encodeURIComponent('org:wix-node-platform+asdsad')});
        }
      }
    })
  };

})();