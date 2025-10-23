
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
   }).then((response) => response.json());
   p.then((j) => {
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
   if (input.length == 100) {
      r.setAttribute("class", "caution");
      r.textContent = "Warning: result display limited to first 100 items";
   } else {
      r.textContent = input.length + " item" + (input.length != 1 ? "s": "")
   }
   place.append(r);
   input.forEach((item) => {
      r = document.createElement("pre");
      if (item.length >= 10000) {
         const warn = document.createElement("pre");
         warn.setAttribute("class", "caution");
         warn.textContent = "Warning: item textual value truncated to 10kB\n";
         r.append(warn);
      }
      r.append(new Text(item.replaceAll('&#xA;', '\n')));
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

async function setClipboard(text) {
   const type = "text/plain";
   const clipboardItemData = {[type]: text,
   };
   const clipboardItem = new ClipboardItem(clipboardItemData);
   await navigator.clipboard.write([clipboardItem]);
}