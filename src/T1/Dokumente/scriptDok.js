function myFunction(num) {
    let drop = document.getElementsByClassName("show");
    let blub = document.getElementsByClassName("myDropdown")
    if(blub[num].classList.contains("show")){
        blub[num].classList.remove("show");
    }else{
      for(let i =0; i<drop.length; i++){
        drop[i].classList.remove("show")
        }
    blub[num].classList.toggle("show");  
    }
    

  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }