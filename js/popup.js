   var closePopup = document.getElementById("popupclose");
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    var button = document.getElementById("button_1");
	var innertext = document.getElementById("innertext");
	var button_2 = document.getElementById("button_2");
	var text = document.getElementById("input");
	var color;
	
	function randomColors(){
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

    closePopup.onclick = function() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    button_1.onclick = function() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }
	
	button_2.onclick = function() {
		color = randomColors();
		document.getElementById('square').style.background = color;
		innertext.textContent = text.value;
	}
