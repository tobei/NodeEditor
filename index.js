


/*let selection = null;

document.querySelectorAll('.node').forEach(node => {
    let positionX = 0;
    let positionY = 0;

    let translationX = 0;
    let translationY = 0;

    let moving = false;

    node.addEventListener('pointerdown', evt => {
            evt.preventDefault();
            evt.stopPropagation();
            positionX = evt.pageX - translationX;
            positionY = evt.pageY - translationY;
            moving = true;
    });

    node.addEventListener('pointermove', evt => {console.log("move:" + evt)
        evt.stopPropagation();
        if (moving) {
            translationX = evt.pageX - positionX;
            translationY = evt.pageY - positionY;
            evt.target.style.transform = `translate(${translationX}px, ${translationY}px)`;
        }
    });

    node.addEventListener('pointerup', evt => {console.log("up:" + evt)
        moving = false;
    });

});*/


