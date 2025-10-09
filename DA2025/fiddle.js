
async function baseX(query, context, contextType, resultPlace) {
   const q = "(" + query + ") => serialize({'method':'adaptive'})";
   const d = new FormData();
   d.append('query', query);
   d.append('context', context);
   d.append('contextContentType', contextType);
   let p = fetch(
   'https://fiddle.basex.org/api/xquery', {
      method: 'POST',
      body: d,
   }).then((response) => response.text());
   p.then((txt) => {
      const t = txt.replaceAll('""', "'");
      const j = JSON.parse(t);
      if (j.result) {
         results(j.result, resultPlace);
      } else {
         baseXError(j.description, resultPlace);
      }
   })
}

function results(input, place) {
   place.replaceChildren();
   let r = document.createElement("pre");
   r.textContent = input.length + " item" + (input.length != 1 ? "s": "");
   place.append(r);
   input.forEach((item) => {
      r = document.createElement("pre");
      r.textContent = item.replaceAll('&#xA;', '\n');
      place.append(r);
   })
}
function baseXError(input, place) {
   place.replaceChildren();
   let r = document.createElement("pre");   
   r.setAttribute("class", "error");
   r.textContent = "Error: " + input;
   place.append(r);
}
/*async function baseX2(query, context, contextType, result) {
 const q = "(" + query + ") => serialize({'method':'json'})";
 const d = new FormData();
 d.append('query', query);
 d.append('context', context);
 d.append('contextContentType', 'text');
 let p = fetch(
 'https://fiddle.basex.org/api/xquery', {
 method: 'POST',
 body: d,
 }).then((response) => response.json());
 p.then((json) => result.textContent = json.result);
 }*/
async function setClipboard(text) {
   const type = "text/plain";
   const clipboardItemData = {[type]: text,
   };
   const clipboardItem = new ClipboardItem(clipboardItemData);
   await navigator.clipboard.write([clipboardItem]);
}