
function createWidget() {
  const Widget = Object.create({
    create(id) {
      const style = `
        .logFrame${ id } {
          border-left: 2px solid #fb4934;
          border-top: 0;
          border-right: 0;
          border-bottom: 0;
          margin: 2px 2px 2px 0;
          font-size: 14pt;
          border-radius: 0 .5rem .5rem 0;
          flex: 1 0;
          overflow: hidden;
          background: #3c3836;
        }

        .textArea${ id } {
          margin: 2px 0 2px 2px;
          padding: 3px;
          font-size: 14pt;
          border-radius: .5rem 0 0 .5rem;
          flex: 1 0;
          resize: horizontal;
          min-width: 300px;
          max-width: 600px;
        }

        .widgetContainer${ id } {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          overflow: hidden;
          min-height: 250px;
        }

        .buttonAndInput${ id } {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .buttonList${ id } {
          bottom: 0;
          right: 0;
          margin: 10px;
          position: absolute;
          display: flex;
          min-height: 35px;
        }

        .runButton${ id } {
          flex: 1 1 100%;
          margin: 2px;
          padding: 2px;
          border-radius: .2rem;
          min-width: 35px;
          min-height: 35px;
          color: #fb4934;
        }

        .undoButton${ id } {
          flex: 1 1 100%;
          margin: 2px;
          padding: 2px;
          border-radius: .2rem;
          min-width: 35px;
          min-height: 35px;
          color: #fb4934;
        }

        .clearButton${ id } {
          flex: 1 1 100%;
          margin: 2px;
          padding: 2px;
          border-radius: .2rem;
          min-width: 35px;
          min-height: 35px;
          color: #fb4934;
        }

        .copyButton${ id } {
          flex: 1 1 100%;
          margin: 2px;
          padding: 2px;
          border-radius: .2rem;
          min-width: 35px;
          min-height: 35px;
          color: #fb4934;
        }

        .buttonText${ id }{
          font_size: 0pt;
        }

        .fa-shake-hover${ id }:hover {
          -webkit-animation: fa-shake 2s infinite linear;
          -moz-animation: fa-shake 2s infinite linear;
          -o-animation: fa-shake 2s infinite linear;
          animation: fa-shake 2s infinite linear;
        }

        .visuallyhidden {
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          font-size: 0;
        }
      `
      snippet = document.currentScript.innerHTML

      const wdg = document.createElement("div");
      wdg.innerHTML = `
        <head>
          <title>Ace Editor Pane</title>
          <meta name="description" content="A simple minimal code editor">
          <style>${ style }</style>
        </head>

        <div class=\"widgetContainer${ id }\">
          <div class=\'buttonAndInput${ id }\'>
            <pre id=\'code-${ id }\' class=\'textArea${ id } editor${ id }\'>${ snippet }</pre>
            <div id='buttons${ id }' class='buttonList${ id }'>
              <button id=\'run-${ id }\' class=\'runButton${ id } fa-solid fa-play fa-shake-hover${ id } fa-lg\' aria-label="Run"></button>
              <button id=\'undo-${ id }\' class=\'undoButton${ id } fa-solid fa-undo fa-shake-hover${ id } fa-lg\' aria-label="Undo"></button>
              <button id=\'clear-${ id }\' class=\'clearButton${ id } fa-solid fa-eraser fa-shake-hover${ id } fa-lg\' aria-label="Clear"></button>
              <button id=\'copy-${ id }\' class=\'copyButton${ id } fa-solid fa-copy fa-shake-hover${ id } fa-lg\' aria-label="Copy"></button>
            </div>
          </div>
          <iframe sandbox=\'allow-scripts\' id=\'sandboxed-${ id }\' class=\'logFrame${ id }\' title=\'Console Frame\'></iframe>
        </div>
      `;


      wdg.script = document.createElement("script")
      wdg.script.setAttribute('type', 'text/javascript');

      wdg.script.appendChild(
        document.createTextNode(
          `
          let editorEl${ id } = document.getElementById(\"code-${ id }\"),
          editor${ id } = window.ace.edit(editorEl${ id });

          editor${ id }.setTheme(\"ace/theme/gruvbox\"),
          editor${ id }.setOptions({fontSize: \"14pt\"});
          editor${ id }.session.setMode(\"ace/mode/javascript\"),
          editor${ id }.renderer.setScrollMargin(10, 10);

          let lbl = document.createElement('label')
          lbl.innerHTML = 'Editor Pane'
          lbl.setAttribute('for', 'aceTI${ id }')
          lbl.setAttribute('class', 'visuallyhidden')
          editorEl${ id }.appendChild(lbl)

          let aceTI = document.getElementsByClassName('ace_text-input')[0]
          aceTI.id = 'aceTI${ id }'


          editor${ id }.on(\"change\",
            e => {console.log(\"edited result\",e)}
          );

          function evaluate(){
            var e = document.getElementById(\"sandboxed-${ id }\");
            t = editor${ id }.getValue();

            e.contentWindow.postMessage(t,\"*\")
          }

          window.addEventListener(\"message\",
            function(e){
              var t=document.getElementById(\"sandboxed-${ id }\");
              \"null\"===e.origin&&e.source===t.contentWindow&&alert(\"Result: \"+e.data)
            }
          ),

          document.getElementById(\"run-${ id }\").addEventListener(\"click\", evaluate);

          function undo(){
            editor${ id }.session.getUndoManager().undo();
          }

          document.getElementById(\"undo-${ id }\").addEventListener(\"click\", undo);

          function clear(){
            editor${ id }.session.setValue('');
          }

          document.getElementById(\"clear-${ id }\").addEventListener(\"click\", clear);

          // https://stackoverflow.com/a/33928558/6688750
          function copyToClipboard(text) {
              console.log(text)
              if (window.clipboardData && window.clipboardData.setData) {
                  // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
                  return window.clipboardData.setData("Text", text);

              }
              else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                  var textarea = document.createElement("textarea");
                  textarea.textContent = text;
                  textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
                  document.body.appendChild(textarea);
                  textarea.select();
                  try {
                      return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                  }
                  catch (ex) {
                      console.warn("Copy to clipboard failed.", ex);
                      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
                  }
                  finally {
                      document.body.removeChild(textarea);
                  }
              }
          }

          function copy(){
            copyToClipboard(editor${ id }.getValue())
          }

          document.getElementById(\"copy-${ id }\").addEventListener(\"click\", copy);
          `
        )
      )

      wdg.appendChild(wdg.script)
      // Load your chat data into UI
      return wdg;
    }
  });

  const id = `js${ Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }`;
  const myWidgetInstance = Widget.create(id);
  document.write(`<div id= ${ id } ></div>`);
  document.getElementById(id).appendChild(myWidgetInstance);

  let ifr = document.getElementById(`sandboxed-${ id }`)
  ifr.srcdoc = `
    <!DOCTYPE html>
    <html>

    <head>
      <title>iFrame Simulated Console</title>
      <meta name="description" content="A simple iFrame that runs the attached editor's code">
      <style>
        body {
          color: #ebdbb2;
          font-size: 18pt;
          padding: 10px 3px 10px 10px;
          margin: 0 3px 0 3px;
          font: 16pt/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', 'source-code-pro', monospace;
          line-height: 26px;
        }
      </style>
    </head>
    <body>
    <div id=\'log-${ id }\'></div>
    <script>
      (function() {
          var old = console.log;
          var logger = document.getElementById(\'log-${ id }\');
          console.log = function (message) {
            if (typeof message == \'object\') {
              logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + \'<br />\';
            } else {
              logger.innerHTML += message + \'<br />\';
            }
          }
        })();

        window.addEventListener(\'message\', function (e) {
          document.getElementById(\'log-${ id }\').innerHTML=\'\';
          var mainWindow = e.source;
           try {
             eval(e.data);
           } catch (error) {
             console.log(error.name + ': ' + error.message);
           }
         });
     </script>
     </body>
    </html>
  `
};

createWidget()
