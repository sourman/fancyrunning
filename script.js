const track = document.getElementById("image-track");

/**
 * Calculate how much an an item matches the reference as a percentage
 * @param {float} itemPercent - Must be 0.0 - 100.0
 * @param {float} reference - Must be 0.0 - 100.0
 * @param {int} numMatches - Number of items to fuzz-match
 * @returns {float} - Percentage of matching for this current item
 */
function fuzzyMatch(itemPercent, reference, numMatches) {
    const delta = Math.abs(itemPercent - reference);
    const quadraticDelta = (Math.sqrt(numMatches) * delta * delta / (100 / numMatches));
    return Math.max(100 - quadraticDelta, 0);
}

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


