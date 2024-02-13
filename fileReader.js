function addFileCollect(input, output) {
   addFileReader(input, output);
   addDrag(input, output);
}
/* A simple registration function to attach a file choice.reader to a textarea */
function addFileReader(input, output) {
   const fileX = document.getElementById(input);
   const out = document.getElementById(output);
   const fileName = document.getElementById(input + "Name");
   fileX.addEventListener("change", () => {
      const[file] = fileX.files;
      fileX.value = ""; /*  Forces a subsequent read if no change in file chosen */
      if (file) {
         fileName.textContent = file.name;
         const reader = new FileReader();
         reader.addEventListener("load", () => {
            out.value = reader.result;
         });
         reader.readAsText(file);
      } else {
         fileName.textContent = "";
      }
   })
}

function addDrag(input, output) {
   const fileName = document.getElementById(input + "Name");
   const out = document.getElementById(output)
   out.addEventListener("dragenter", (event) => {
      out.style.background = "lavenderblush";
      const img = new Image();
      img.src = "example.png";
      event.dataTransfer.setDragImage(img, 20, 20);
      event.preventDefault();
   });
   out.addEventListener("dragleave", (event) => {
      out.style.background = "white";
       event.preventDefault();
   });
   out.addEventListener("drop", (event) => {[...event.dataTransfer.items].forEach((item, i) => {
         // If dropped items aren't files, reject them
         if (item.kind === 'file') {
            const file = item.getAsFile();
            fileName.textContent = file.name;
            const reader = new FileReader();
            reader.addEventListener("load", () => {
               out.value = reader.result;
            });
            reader.readAsText(file,'UTF-8');
         }
      });
      out.style.background = "white";
      event.preventDefault();
   });
}