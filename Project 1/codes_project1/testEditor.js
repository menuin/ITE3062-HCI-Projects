const dragEditorArea = document.querySelector(".new");
const testarea = document.querySelector("#ver2");
const applyBtn = document.querySelector("#apply");
const testFontSelector = document.getElementById("test-select");
// const fontSizeDiv = document.querySelector(".show-size");
const sizeInput = document.querySelector(".sizeInput");

function wrapLine2(e) {
  if (e.keyCode == "13") {
    if (testarea.getElementsByTagName("div").length == 0) {
      e.preventDefault();
      var text = testarea.firstChild.textContent;
      testarea.removeChild(testarea.firstChild);
      var wrapSpan = document.createElement("span");
      var wrapDiv = document.createElement("div");
      wrapSpan.textContent = text;
      wrapSpan.style.fontSize = "16px";
      wrapDiv.appendChild(wrapSpan);
      testarea.insertBefore(wrapDiv, testarea.firstChild);

      var range = document.createRange();
      var sel = window.getSelection();
      console.log(testarea.firstChild.querySelector("span"));
      range.setStart(testarea.firstChild.querySelector("span"), 1);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    } else {
    }
    var lineList = testarea.childNodes;
    var lineNumber = testarea.getElementsByTagName("div").length;
    lineList[lineNumber - 1].classList.add("wrapline");

    const textLines = testarea.querySelectorAll(".wrapline");
    for (let line of textLines) {
      if (!line.querySelector("span")) {
        var text = line.textContent;
        line.textContent = "";
        var wrapSpan = document.createElement("span");
        wrapSpan.textContent = text;
        line.insertBefore(wrapSpan, line.firstChild);
      }
      // background color changes when hovered
      //   line.addEventListener("mouseover", (e) => {
      //     // colorTextLine(line);
      //   });
      line.addEventListener("dblclick", wrapSelectedLine);
    }
  }
}

// resize by resizing div
function wrapSelectedLine(e) {
  if (testarea.querySelector("#resizable")) {
    const crntSelectedLine = testarea.querySelector("#resizable");
    crntSelectedLine.removeAttribute("id");
  }
  var parent = e.target.parentNode;
  var wrapper = document.createElement("div");
  wrapper.setAttribute("id", "resizable");
  parent.replaceChild(wrapper, e.target);
  wrapper.appendChild(e.target);

  resizable();
  // showMenu();
}
function resizable() {
  const resizableDiv = testarea.querySelector("#resizable");
  const resizableSpan = resizableDiv.querySelector("span");

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const spanLength = resizableSpan.textContent.length;
      jQuery("#resizable").fitText(spanLength / 10); // 영어 - 20
      resizableSpan.style.fontSize = resizableDiv.style.fontSize;
      // fontSizeDiv.querySelector("span").innerText = resizableDiv.style.fontSize;
      // $(".sizeInput").attr(
      //   "placeholder",
      //   resizableDiv.style.fontSize.replace("px", "")
      // );
      checkOtherLines(resizableDiv);
    }
  });

  resizeObserver.observe(resizableDiv);
}

function checkOtherLines(currentDiv) {
  const currentSize = currentDiv.style.fontSize;
  const textLines = testarea.querySelectorAll(".wrapline");
  for (let line of textLines) {
    line.style.color = "black";
    if (
      line.firstChild !== currentDiv &&
      line.firstChild.style.fontSize == currentSize
    ) {
      line.style.color = "#EA4A20";
    }
  }
}

function showMenu() {
  fontSizeDiv.classList.remove("hide");
  // sizeInput.classList.remove("hide");
}

function apply() {
  const textLines = testarea.querySelectorAll(".wrapline");
  for (let line of textLines) {
    line.style.color = "black";
  }
  if (testarea.querySelector("#resizable")) {
    const resizableDiv = testarea.querySelector("#resizable");
    resizableDiv.removeAttribute("id");
  }
  // fontSizeDiv.classList.add("hide");
}

function changeFont(name) {
  console.log(name);
  testarea.style.fontFamily = "'" + name + "' , sans-serif";
}
function init() {
  testarea.addEventListener("keydown", wrapLine2);
  applyBtn.addEventListener("click", apply);
  testFontSelector.addEventListener("change", (e) => {
    changeFont(e.target.value);
  });
}

init();
