// async和await是promise方法的语法糖，不再需要写很多的promise.then(),
// 还可以将每个数据添加reference方便调用函数，写法非常符合直觉很好用
// await operator用来wait promise, 在async function中赋值时使用
// async operator用在函数前，表明该函数是async函数
console.log('start');

function loginUser(email, password){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({userEmail: email}); 
        }, 1000);
    });
}

function getUserVideos(email){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['video1', 'video2', 'video3']);
        }, 1000);
    });
}

// loginUser('chenlong0518@hotmail.com','123456') 
//     .then(data => getUserVideos(data.userEmail))
//     .then(video => console.log(video));

// async & awiat方式

async function displayUser(){
    const user = await loginUser('chenlong0518@hotmail.com','123456');
    console.log(user);
    const videos = await getUserVideos(user.userEmail);
    console.log(videos);
}

displayUser();

console.log('end');

// start
// end
// { userEmail: 'chenlong0518@hotmail.com' }
// [ 'video1', 'video2', 'video3' ]






// 那么，如何实现和promise.then和promise.catch的error handling 功能呢？

// 通过添加try catch语句实现

// async function displayUser(){
//     try{
//         const user = await loginUser('chenlong0518@hotmail.com','123456');
//         console.log(user);
//         const videos = await getUserVideos(user.userEmail);
//         console.log(videos);
//     }
//     catch{
//         console.log('there is an error');
//     }
// }

// displayUser();

// console.log('end');

// 这样，通过 async + await + try catch就可以实现promise的全部功能，且非常简洁方便