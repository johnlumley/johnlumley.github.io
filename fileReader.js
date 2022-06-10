//const fileInput = document.querySelector("input[type=file]");
//const output = document.querySelector('.output');
/*const fileInput = document.getElementById('file');
const outputX = document.getElementById('output');
console.log("fileInput:", fileInput);
console.log("output", outputX);
fileInput.addEventListener("change", () => {
   const[file] = fileInput.files;
   if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
         outputX.innerText = reader.result;
      });
      reader.readAsText(file);
   }
})
*/
function addFileReader(input, output) {
   const fileX = document.getElementById(input);
   const out  = document.getElementById(output);
  /* console.log("fileX:", fileX);
   console.log("out", out);*/
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