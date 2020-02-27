// function for loading image through http request
export function loadImage(url) {
    // async return promise function
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', (e) => {
            // setTimeout(resolve, 2000, img);
            resolve(img);
        });
        img.src = url;
    });
}

export function loadLevel(name) {
    return fetch(`./levels/${name}.json`).then(r => r.json());
    //.then(json => new Promise(resolve => setTimeout(resolve, 3000, json)));
}