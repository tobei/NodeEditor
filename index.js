/*document.querySelectorAll('.node').forEach(node => {
    let x, y;
    let deltaX = 0, deltaY = 0;
    let moving = false;
    node.addEventListener('pointerdown', evt => {console.log("down" + evt)
        x = evt.pageX;
        y = evt.pageY;
        console.log(x + ' ' + y);
        moving = true;
    });
    node.addEventListener('pointermove', evt => {console.log("move:" + evt)
        if (moving) {
            evt.stopPropagation();
            deltaX = evt.pageX - x;
            deltaY = evt.pageY - y;
            node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
    });
    node.addEventListener('pointerup', evt => {console.log("up:" + evt)
        moving = false;
    });
});*/

let selection = null;

document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('pointerdown', evt => {console.log("down" + evt)
        selection = node;
        console.log('selected: ' + selection);
        console.log(evt.clientX + ' ' + evt.clientY);
    });
});


let positionX = 0;
let positionY = 0;

let translationX = 0;
let translationY = 0;

let moving = false;

const editor = document.querySelector('#editor')
editor.addEventListener('pointerdown', evt => {
    console.log("down" + evt)
    if (selection) {
        positionX = evt.pageX - translationX;
        positionY = evt.pageY - translationY;
        moving = true;

    }
});

editor.addEventListener('pointermove', evt => {console.log("move:" + evt)
        if (selection && moving) {
            translationX = evt.pageX - positionX;
            translationY = evt.pageY - positionY;
            selection.style.transform = `translate(${translationX}px, ${translationY}px)`;
        }
});

editor.addEventListener('pointerup', evt => {console.log("up:" + evt)
        moving = false;
});
