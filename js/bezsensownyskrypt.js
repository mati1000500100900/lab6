var activateButton = document.getElementById('btn-submit'),
    hello = document.getElementById('hello');

function changeColor() {
    var a, b, c;
    var color = '';

    a = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    c = Math.floor(Math.random() + 255);

    color = 'rgb(' + a + ', ' + b + ', ' + c + ')';
    return color;
}

activateButton.addEventListener('click', function() {
    window.setInterval(function() {
        activateButton.style.backgroundColor = changeColor();
        hello.style.color = changeColor();
        console.log("haha :)");
    }, 100);
})
