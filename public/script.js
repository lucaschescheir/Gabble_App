console.log('hello');

button = document.getElementById('send');
//function to scroll to bottom
function updateScroll(){
  let element = document.getElementById('messages');

    element.scrollTop = element.scrollHeight;
}
//this provides kind of a choppy user experience but I couldt get it to work
// with an event listener
setInterval(updateScroll,50);

button.addEventListener('click', updateScroll)
