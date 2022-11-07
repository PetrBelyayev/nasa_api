const API_KEY = 'tit7lwFfthL8XXx49ZaofDBiTO8hBU1Y7cAJyMqe'

const res = axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=15`)
    .then(res => {
        document.querySelector("footer").style.position = "relative"
        document.querySelector(".preloader").style.display = "none"
        makeCards(res.data)
        console.log(res.data)
        listenForLikes();
    })

const makeCards = (cards) => {
    for(let result of cards) {
        if (result.hdurl) { // gets results of HD images only
            const container = document.querySelector('#container');

            const card = document.createElement('div');
            card.classList.add('card')
            
            const title = document.createElement('span');
            title.classList.add("title")
            title.innerText = result.title.replace(/\r?\nCredit/, "");
            
            const like = document.createElement('button')
            like.classList.add('like-btn')
            like.innerHTML = '<i class="fa fa-heart fa-2x like-no"></i>'

            const date = document.createElement('span');
            date.classList.add("date")
            date.innerText = result.date
            
            const newImg = document.createElement('img');
            newImg.src = result.hdurl;
            newImg.setAttribute("loading", "lazy");
            
            container.appendChild(card)
            card.appendChild(newImg);
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(like);
        }
    }
}

const listenForLikes = () => {
    const likes = document.querySelectorAll('.fa');
    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            event.target.classList.toggle("like-no");
            event.target.classList.toggle("like-yes");
        if (event.target.classList.contains("like-yes")) {
            console.log("✅ 💾 Saving Favorite...");
        } else {
            console.log("❌ 🗑 Removing Favorite...");
        }
        })
    })
}