// function for loading image through http request
export function loadImage(url) {
    // async return promise function
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', (e) => {
            resolve(img);
        });
        img.src = url;
    });
}

export function loadLevel(name) {
    return fetch(`./levels/${name}.json`).then(r => r.json());
}