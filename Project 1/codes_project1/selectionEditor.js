const textarea = document.querySelector("#selection");

function MakeSelectionDiv() {
  textarea.onselectstart = () => {
    textarea.onmouseup = () => {
      const selection = document.getSelection().getRangeAt(0);
      if (!selection || !selection.toString()) {
        console.log("selected none");
        return;
      }
      // selection 앞에 있는 글자
      if (selection.startOffset > 0) {
        var notSelectedRange = document.createRange();
        notSelectedRange.setStart(selection.commonAncestorContainer, 0);
        notSelectedRange.setEnd(
          selection.commonAncestorContainer,
          selection.startOffset
        );
        console.log(notSelectedRange);
        var nonSelectedText = notSelectedRange.extractContents();

        var nonSelectedDiv = document.createElement("div");
        nonSelectedDiv.classList.add("notSelected");
        nonSelectedDiv.style.cssFloat = "left";
        nonSelectedDiv.style.borderStyle = "solid";
        nonSelectedDiv.style.borderColor = "white";
        nonSelectedDiv.style.bottom = "0px";
        nonSelectedDiv.appendChild(nonSelectedText);
        textarea.prepend(nonSelectedDiv);
      }

      // selection 뒤에 있는 글자  -> 나중에
      if (selection.endOffset) {
      }

      var selectedText = selection.extractContents();
      var div = document.createElement("div");
      var span = document.createElement("span");

      span.appendChild(selectedText);
      // span.style.fontSize = "16px";
      // span.style.display = "inline-block";

      div.setAttribute("id", "resizable");
      div.style.position = "relative";
      div.style.cssFloat = "left";
      div.style.overflow = "auto";
      div.style.resize = "horizontal";
      div.style.borderStyle = "dashed";
      div.style.borderWidth = "thin";
      div.style.borderColor = "#3F96F3";
      div.appendChild(span);
      selection.insertNode(div);

      window.getSelection().empty();

      Resizable();
    };
  };
}

function Resizable() {
  const resizableDiv = textarea.querySelector("#resizable");
  const resizableSpan = resizableDiv.querySelector("span");
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const spanLength = resizableSpan.textContent.length;
      jQuery("#resizable").fitText(spanLength / 10);
      resizableSpan.style.fontSize = resizableDiv.style.fontSize;
    }
  });
  resizeObserver.observe(resizableDiv);
}

function init() {
  MakeSelectionDiv();

  const selectResetBtn = document.querySelector("#reset");
  selectResetBtn.addEventListener("click", (event) => {
    if (document.getElementById("resizable")) {
      $("#resizable").contents().unwrap();

      $(".notSelected").contents().unwrap();
    }
  });
}
init();
