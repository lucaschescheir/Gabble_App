console.log('hello');
//function to scroll to bottom 
function updateScroll(){
  let element = document.getElementById('messages');

    element.scrollTop = element.scrollHeight;
}
//this provides kind of a choppy user experience but I couldt get it to work
// with an event listener
setInterval(updateScroll,1000);
