(function () {
  const trackers = [
    {
      name: 'Empornium',
      url: `https://www.empornium.is/torrents.php?taglist={{performer_name}}`,
      logo: "data:image/png;base64,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"
    }
  ];

  async function getPerformerInfo(id){
    const reqData = {
      variables: {
        id: id,
      },
      query:
        "query findPerformer($id: ID!) {\n  findPerformer(id: $id) {\n    name\n  }\n}",
    };

    let name = (await stash.callGQL(reqData)).data.findPerformer.name;

    return nameToTag(name);
  }

  function nameToTag(name){
    return name.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(" ",".");
  }

  function createUrl(tracker, performerName){
    const sanitized = nameToTag(performerName);
    const trackerUrl = tracker.url.replace('{{performer_name}}', sanitized);
    return trackerUrl;
  }

  async function addPerformerPageElement(tracker, id = null, performerName = null){
    let userTag;

    if(id !== null){
      userTag = await getPerformerInfo(id);
    }else{
      userTag = nameToTag(performerName);
    }

    const trackerUrl = tracker.url.replace('{{performer_name}}', userTag);
    const lowercaseName = tracker.name.toLowerCase();
    
    let wrapper = document.querySelector('.performer-head h2 .name-icons');
    let contentEl = document.createElement('span');
    contentEl.classList.add(`${lowercaseName}-link`);
    contentEl.innerHTML = `<a href="${trackerUrl}" target="_blank" class="minimal link btn btn-primary" title="${tracker.name}"><img src="${tracker.logo}" style="width: 1rem" /></a>`;

    wrapper.appendChild(contentEl);
  }

  function addPerformerCardElement(cardPopovers, tracker, url){
    let linkIcon = `<img src="${tracker.logo}" style="height:1em;">`;
    let linkContent = `${linkIcon}`

    let linkEl = document.createElement("a");
    linkEl.classList.add(`${tracker.name.toLowerCase()}-link`)
    linkEl.href = url;
    linkEl.title = tracker.name;
    linkEl.target = "_blank";
    let buttonEl = document.createElement("button");
    buttonEl.classList.add('minimal', 'btn', 'btn-primary');
    buttonEl.innerHTML = linkContent;
    linkEl.appendChild(buttonEl);
    cardPopovers.appendChild(linkEl)
  }

  stash.addEventListener('stash:page:performer', function(){
    waitForElementId('performer-page', function(){
      const performerId = window.location.pathname.split('/').find((o, i, arr) => i > 1 && arr[i - 1] == 'performers');
      trackers.map(tracker => {
        if(!document.querySelector(`.${tracker.name.toLowerCase()}-link`)) addPerformerPageElement(tracker, performerId);
      })
    })
  });

  "stash:page:performers stash:page:scene".split(" ").forEach(eventType => {
    stash.addEventListener(eventType, function(){
      waitForElementQuerySelector('.performer-card', function(){
        let performerCards = document.querySelectorAll('.performer-card');
        performerCards.forEach(card => {
          let performerName = card.querySelector('.performer-name').innerText;
          let popovers = card.querySelector('.card-popovers');
          trackers.map(tracker => {
            if(!card.querySelector(`.${tracker.name.toLowerCase()}-link`)){
              let url = createUrl(tracker, performerName);
              addPerformerCardElement(popovers, tracker, url);
            }
          })
          let sanitized = nameToTag(performerName);
        })
      })
    })
  })
})();