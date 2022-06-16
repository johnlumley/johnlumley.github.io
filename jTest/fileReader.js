/* A simple registration function to attach a file choice.reader to a textarea */
function addFileReader(input, output) {
   const fileX = document.getElementById(input);
   const out  = document.getElementById(output);
   fileX.addEventListener("change", () => {
      const[file] = fileX.files;
      if (file) {
         const reader = new FileReader();
         reader.addEventListener("load", () => {
            out.value = reader.result;
         });
         reader.readAsText(file);
      }
   })
}