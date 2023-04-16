(function() {
    const Widget = Object.create({
        create(id) {
            const wdg = document.createElement("div");
            wdg.innerHTML = `<header><style>.logFrame-${ id },.runButton-${ id },.textArea-${ id }{border:1px solid #999;margin:2px;padding:3px}.widgetContainer-${ id }{display:flex;flex-direction:row;justify-content:space-between}.buttonAndInput-${ id }{display:flex;flex-direction:column}.logFrame-${ id }{flex:1 0}.textArea-${ id }{flex:1 0;resize:horizontal}</style></header><div class=\"widgetContainer-${ id }\"><div class=\'buttonAndInput-${ id }\'><textarea id=\'code-${ id }\' class=\'textArea-${ id }\'></textarea><label for=\'code-${ id }\' style=\'font-size:0pt\'>Editor Pane</label><button id=\'safe-${ id }\' class=\'runButton-${ id }\' aria-label="Run">Run</button></div><iframe sandbox=\'allow-scripts\' id=\'sandboxed-${ id }\' class=\'logFrame-${ id }\' title=\'Console Frame\'></iframe></div>`;

            console.log(wdg)
            wdg.script = document.createElement("script")
            wdg.script.setAttribute('type', 'text/javascript');
            wdg.script.appendChild(document.createTextNode(`function evaluate(){var e=document.getElementById(\"sandboxed-${ id }\"),t=document.getElementById(\"code-${ id }\").value;e.contentWindow.postMessage(t,\"*\")}window.addEventListener(\"message\",function(e){var t=document.getElementById(\"sandboxed-${ id }\");\"null\"===e.origin&&e.source===t.contentWindow&&alert(\"Result: \"+e.data)}),document.getElementById(\"safe-${ id }\").addEventListener(\"click\",evaluate);`))
            wdg.appendChild(wdg.script)
            return wdg;
        }
    });


    const id = `js-${ Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }`;
    const myWidgetInstance = Widget.create(id);
    document.write(`<div id= ${ id } ></div>`);
    document.getElementById(id).appendChild(myWidgetInstance);

    let ifr = document.getElementById(`sandboxed-${ id }`)
    ifr.srcdoc = `<!DOCTYPE html><html><head><title>Evalbox\'s Frame</title><div id=\'log-${ id }\'></div><script>(function () {var old = console.log;var logger = document.getElementById(\'log-${ id }\');console.log = function (message) {if (typeof message == \'object\') {logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + \'<br />\';} else {logger.innerHTML += message + \'<br />\';}}})();window.addEventListener(\'message\', function (e) {var mainWindow = e.source;var result = \'\';try {result = eval(e.data);} catch (e) {result = \'eval() threw an exception.\';}});</script></head></html>`
})();
