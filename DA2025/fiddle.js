function fiddle(input) {
   alert('Input:'+input);
getData()
}
async function getData() {
  const url = "https://fiddle.basex.org/api/xquery";
   let req = new Request(url, {
      method: 'POST',
      mode:'cors',
      headers: {
         query: '1+2'
      }
   });
  try {
    const response = await fetch(req);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}