const imageHolder = document.querySelector('#image-holder');
const imageLocations = [
    'https://images.unsplash.com/photo-1610177498573-78deaa4a797b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592660716763-09efba6db4e3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1601898421010-01a14bc4c49b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591470916941-dcc7b59d0841?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=843&q=80',
    'https://images.unsplash.com/photo-1594117782204-5c398aa0e330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
];
const size = 6;
const randomPos = [];
let validClicks = 0;

const renderReset = (clicks) => {
    if (clicks == 1) {
        let resetBtn = document.createElement('button');
        resetBtn.innerText = 'Reset';
        resetBtn.setAttribute('id', 'reset');
        resetBtn.addEventListener('click', () => {
            window.location.reload();
        })
        document.querySelector('#control').appendChild(resetBtn);
    }
}

const renderVerify = (selectedBtns) => {
    if (selectedBtns == 2) {
        let verifyBtn = document.createElement('button');
        verifyBtn.setAttribute('id', 'btn');
        verifyBtn.innerText = 'Verify';
        verifyBtn.addEventListener('click', () => {
            let items = document.querySelectorAll('.selected');
            let message = document.createElement('p');
            message.setAttribute('id', 'para');
            verifyBtn.remove();
            if (items[0].getAttribute('data-ns-test') == items[1].getAttribute('data-ns-test')) {
                message.innerText = 'You are a human. Congratulations!';
                document.body.appendChild(message);
            } else {
                message.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
                document.body.appendChild(message);
            }
        });
        document.querySelector('#control').appendChild(verifyBtn);
    } else {
        if (document.querySelector('#btn') != null) {
            document.querySelector('#btn').remove();
        }
    }
}

while(randomPos.length < 5) {
    let num = Math.floor(Math.random() * 5);
    if (!randomPos.includes(num)) {
        randomPos.push(num);
    }
}
randomPos.push(Math.floor(Math.random() * 5));

for(let i = 0; i < size; i++) {
    let image = document.createElement('img');
    image.setAttribute('src', imageLocations[randomPos[i]]);
    image.setAttribute('data-ns-test', `img${randomPos[i]}`);
    imageHolder.appendChild(image);
}

document.querySelectorAll('img').forEach(image => {
    image.addEventListener('click', (e) => {
        validClicks++;
        e.target.classList.toggle('selected');
        renderReset(validClicks);
        renderVerify(document.querySelectorAll('.selected').length);
    })
});