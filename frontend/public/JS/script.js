let MenuLinks = document.getElementById("Links");
let MenuBar = document.getElementById("Menu");
let CloseMenu = document.getElementById("close");
let isOpen = false;

MenuBar.addEventListener("click", () => {
  isOpen = true;
  MenuLinks.style.display = "block";
  MenuLinks.style.transition = " 1s all ease";
  MenuBar.style.display=  "none"
  CloseMenu.style.display = "block"
});

CloseMenu.addEventListener("click",()=>{
isOpen = false;
MenuLinks.style.display = "none";
MenuBar.style.display=  "block"
CloseMenu.style.display = "none"
})

