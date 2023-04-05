const textarea = document.querySelector("#ver1");
const fontSizeSelector = document.querySelector("#font-select-normal");
const fontSelector = document.querySelector("#test-select-normal");
const applyBtn1 = document.querySelector("#apply-normal");
const fontSizeList = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 36, 38,
  40, 46, 50, 56, 60,
];

function wrapLine1(e) {
  if (e.keyCode == "13") {
    if (textarea.getElementsByTagName("div").length == 0) {
      e.preventDefault();
      var text = textarea.firstChild.textContent;
      textarea.removeChild(textarea.firstChild);
      var wrapSpan = document.createElement("span");
      var wrapDiv = document.createElement("div");
      wrapSpan.textContent = text;
      wrapDiv.appendChild(wrapSpan);
      textarea.insertBefore(wrapDiv, textarea.firstChild);

      var range = document.createRange();
      var sel = window.getSelection();
      console.log(textarea.firstChild.querySelector("span"));
      range.setStart(textarea.firstChild.querySelector("span"), 1);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    } else {
    }
    var lineList = textarea.childNodes;
    var lineNumber = textarea.getElementsByTagName("div").length;
    lineList[lineNumber - 1].classList.add("wrapline");

    const textLines = textarea.querySelectorAll(".wrapline");
    for (const line of textLines) {
      line.addEventListener("dblclick", wrapSelectedLine1);
    }
  }
}
function wrapSelectedLine1(e) {
  if (textarea.querySelector("#selected")) {
    const crntSelectedLine = textarea.querySelector("#selected");
    crntSelectedLine.removeAttribute("id");
  }
  var parent = e.target.parentNode;
  var wrapper = document.createElement("div");
  wrapper.setAttribute("id", "selected");
  parent.replaceChild(wrapper, e.target);
  wrapper.appendChild(e.target);

  changeFontSize(e.target.parentNode);
  fontSizeSelector.value = "";
}
function changeFontSize(selectedLine) {
  //   fontSizeSelector.classList.remove("hide");
  console.log(selectedLine);

  fontSizeSelector.addEventListener("change", (e) => {
    const fontSize = fontSizeList[e.target.value - 1];
    selectedLine.style.fontSize = fontSize + "px";
  });
}
function changeFontName(name) {
  textarea.style.fontFamily = "'" + name + "' , sans-serif";
}
function apply1() {
  if (textarea.querySelector("#selected")) {
    const selectedDiv = textarea.querySelector("#selected");
    selectedDiv.removeAttribute("id");
  }
  //   fontSizeSelector.classList.add("hide");
}
function init() {
  textarea.addEventListener("keydown", wrapLine1);
  fontSelector.addEventListener("change", (e) => {
    changeFontName(e.target.value);
  });
  applyBtn1.addEventListener("click", apply1);
}

init();
