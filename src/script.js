document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const data = {
        "rating": [
            {
                "id": "123",
                "name": "Владимир",
                "lastName": "Ларионов",
                "img": "./male.png",
                "points": "463"
            },
            {
                "id": "9",
                "name": "Владимир",
                "lastName": "Сергеев",
                "img": "./male.png",
                "points": "521"
            },
            {
                "id": "231",
                "name": "Вениамин",
                "lastName": "Васильев",
                "img": "./male.png",
                "points": "865"
            },
            {
                "id": "321",
                "name": "Мария",
                "lastName": "Логинова",
                "img": "./female.png",
                "points": "865"
            },
            {
                "id": "492",
                "name": "Борис",
                "lastName": "Казанцев",
                "img": "./male.png",
                "points": "784"
            },
            {
                "id": "452",
                "name": "Полина",
                "lastName": "Калинина",
                "img": "./female.png",
                "points": "225"
            },
            {
                "id": "796",
                "name": "Даниил",
                "lastName": "Воробьёв",
                "img": "./male.png",
                "points": "642"
            },
            {
                "id": "4",
                "name": "Эрик",
                "lastName": "Аксёнов",
                "img": "./male.png",
                "points": "150"
            },
            {
                "id": "1155",
                "name": "Иван",
                "lastName": "Иванов",
                "img": "./male.png",
                "points": "100"
            },
            {
                "id": "12145",
                "name": "Артем",
                "lastName": "Алексеев",
                "img": "./male.png",
                "points": "1000"
            }
        ],
        "friends": [
            {
                "id": "9",
                "name": "Владимир",
                "lastName": "Сергеев",
                "img": "./male.png"
            },
            {
                "id": "4",
                "name": "Эрик",
                "lastName": "Аксёнов",
                "img": "./male.png"
            },
            {
                "id": "15411",
                "name": "Ирина",
                "lastName": "Чеснокова",
                "img": "./female.png"
            },
            {
                "id": "15564",
                "name": "Дарина",
                "lastName": "Боброва",
                "img": "./female.png"
            }
        ]
    }

    const route = [
        {left: '435px', top: '437px', turn: false},
        {left: '340px', top: '407px', turn: true, left2: '380px', top2: '395px'},
        {left: '267px', top: '448px', turn: false},
        {left: '180px', top: '470px', turn: false},
        {left: '100px', top: '440px', turn: false},
        {left: '114px', top: '375px', turn: true, left2: '70px', top2: '410px'},
    ]

    let step = 1;
    const girl = document.getElementById('board-girl');
    const buttonUniver = document.getElementById('board-nav-univer');
    const allFriendsWindow = document.getElementsByClassName('board-nav-friends-window');
    const friendsWindowsParent = document.getElementById('board-nav-friends-windows');
    const arrowLeft = document.getElementById('board-nav-friends-arrow-left');
    const arrowRight = document.getElementById('board-nav-friends-arrow-right');
    const buttonRating = document.getElementById('board-nav-rating');
    const popup = document.getElementById('popup');
    const popupRating = document.getElementById('popup-rating');
    const popupRatingBodyList = document.getElementById('popup-rating-body-list');
    const popupRatingClose = document.getElementById('popup-rating-close');

    Array.prototype.forEach.call(allFriendsWindow, function (el) {
        for (let i = 0; i < data.friends.length; i++) {
            if (el.className.includes('window-' + i)) {
                el.style.background = "url('./static/images/friends-person+window.png') no-repeat center";
                el.innerText = data.friends[i].name
            }
        }
    });

    girl.style.left = route[0].left;
    girl.style.top = route[0].top;

    arrowLeft.addEventListener("click", () => {
        friendsWindowsParent.prepend(allFriendsWindow[7]);
    });

    arrowRight.addEventListener("click", () => {
        friendsWindowsParent.appendChild(allFriendsWindow[0]);
    });

    buttonUniver.addEventListener("click", () => {
        let time = 0;
        if (route[step] && route.length > step) {
            if (route[step].turn) {
                girl.style.left = route[step].left2;
                girl.style.top = route[step].top2;
                time = 1000;
            }
            setTimeout(() => {
                girl.style.left = route[step].left;
                girl.style.top = route[step].top;
                step++;
            }, time);
        }
    });

    buttonRating.addEventListener("click", () => {
        popup.style.display = 'flex';
        popupRatingBodyList.innerHTML = '';
        setTimeout(() => {
            popupRating.style.top = '0';
            popupRating.style.opacity = '1';
        }, 0);
        if (data.rating && data.rating.length > 0) {
            let i = 0;
            let j = 0;
            let ratingSort = data.rating.sort((a, b) => b.points - a.points);
            ratingSort.forEach(item => {
                const popupRatingBodyListItem = document.createElement('div');
                popupRatingBodyListItem.className = 'popup-rating-body-list-item';
                popupRatingBodyList.appendChild(popupRatingBodyListItem);
                const popupRatingBodyListItemRate = document.createElement('span');
                const popupRatingBodyListItemName = document.createElement('span');
                const popupRatingBodyListItemPoints = document.createElement('span');
                popupRatingBodyListItemRate.className = 'popup-rating-body-list-item-rate';
                popupRatingBodyListItemName.className = 'popup-rating-body-list-item-name';
                popupRatingBodyListItemPoints.className = 'popup-rating-body-list-item-points';
                popupRatingBodyListItem.appendChild(popupRatingBodyListItemRate);
                popupRatingBodyListItem.appendChild(popupRatingBodyListItemName);
                popupRatingBodyListItem.appendChild(popupRatingBodyListItemPoints);
                popupRatingBodyListItem.style.color = 'white';
                popupRatingBodyListItem.style.textShadow = 'transparent 0 0 5px';
                popupRatingBodyListItemName.innerText = item.name + ' ' + item.lastName;
                popupRatingBodyListItemPoints.innerText = item.points;
                if (!ratingSort[i - 1] || item.points !== ratingSort[i - 1].points) {
                    j++;
                }
                popupRatingBodyListItemRate.innerText = j.toString();
                i++;

                data.friends.forEach(friend => {
                    if (item.id === friend.id) {
                        popupRatingBodyListItem.style.color = '#0aff0a';
                        popupRatingBodyListItem.style.textShadow = 'black 0 0 5px';
                    }
                });

            });
        }
        popupRatingClose.addEventListener("click", () => {
            popupRating.style.top = '-500px';
            popupRating.style.opacity = '0';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 400);
        });
    });

});