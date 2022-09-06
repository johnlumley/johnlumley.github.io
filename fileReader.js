/* A simple registration function to attach a file choice.reader to a textarea */
function addFileReader(input, output) {
   const fileX = document.getElementById(input);
   const out  = document.getElementById(output);
   const fileName  = document.getElementById(input+"Name");
   fileX.addEventListener("change", () => {
      const[file] = fileX.files;
      fileX.value = ""; /*  Forces a subsequent read if no change in file chosen */
      if (file) {
         fileName.textContent = file.name;
         const reader = new FileReader();
         reader.addEventListener("load", () => {
            out.value = reader.result;
            /*const evt = new InputEvent("input");
            out.dispatchEvent(evt);*/
         });
         reader.readAsText(file);
      } else {
         fileName.textContent = "";
      }
   })
}