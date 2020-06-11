document.querySelectorAll('.node').forEach(node => {
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
});