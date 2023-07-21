const track = document.getElementById("image-track");
let potatohead = 0;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.percentScroll = track.dataset.percentage;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 1.8;
    
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.percentScroll) + percentage;

    nextPercentage = nextPercentage < -100 ? -100 :
                        nextPercentage > 0 ? 0 : nextPercentage;

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"})

    for (const image of track.getElementsByClassName("image")) {
        image.animate({ objectPosition: `${nextPercentage + 100}% 50%` },
                        { duration: 1200, fill:"forwards" });
    }
}


