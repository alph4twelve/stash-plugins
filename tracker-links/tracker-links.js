(function () {
  const trackers = [
    {
      name: 'Empornium',
      url: `https://www.empornium.is/torrents.php?taglist={{performer_name}}`
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
    name = name.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(" ",".");

    return name;
  }

  function addHeading(){
    let wrapper = document.querySelector('.performer-head .detail-group');
    let headingEl = document.createElement('div');
    headingEl.classList.add('detail-item',`tracker-links`);

    let titleEl = document.createElement('span');
    titleEl.classList.add('detail-item-title', `tracker-links`);
    titleEl.innerText = 'Torrent Trackers';

    headingEl.appendChild(titleEl);
    wrapper.appendChild(headingEl);
  }

  async function addElement(id, name, url){
    const userTag = await getPerformerInfo(id);
    const trackerUrl = url.replace('{{performer_name}}',userTag);
    const lowercaseName = name.toLowerCase();
    
    if(!document.querySelector('.detail-item.tracker-links')) addHeading();
    
    let wrapper = document.querySelector('.detail-item.tracker-links');
    let contentEl = document.createElement('span');
    contentEl.classList.add('detail-item-value', `${lowercaseName}-link`);
    contentEl.innerHTML = `<a href="${trackerUrl}" target=_blank>${name}</a>`;

    wrapper.appendChild(contentEl);
  }

  stash.addEventListener('stash:page:performer', function(){
    waitForElementId('performer-page', function(){
      const performerId = window.location.pathname.split('/').find((o, i, arr) => i > 1 && arr[i - 1] == 'performers');
      trackers.map((tracker) => {
        if(!document.querySelector(`.detail-item-value.${tracker.name.toLowerCase()}-link`)) addElement(performerId, tracker.name, tracker.url);
      })
    })
  });
})();