// promise引入用来解决callback hell的问题(下一个函数需要用上一个函数的值作为参数，不断嵌套callback)
// promise is an object that gives us the result of resolve or reject information
// promise是一个对象，返回resolve或者reject的结果,参数是callback function
// promise对象有.then和.catch的method，用来consume该promise

// 例子一：

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve({userId: 40088333}); // resolve和promise.then中的callback对应，{userId: 40088333}是参数
//     }, 1000);
// });

// promise.then(data => console.log(data));

// { userId: 40088333 }


// 例子二(callback hell用promise进行简化)：
// 让函数返回promise(一般的web request都是自动返回promise的不用自己写)
// 然后用 promise.then 进行consume

console.log('start');

function loginUser(email, password){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({userEmail: email}); // resolve和第一个promise.then()对应
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

loginUser('chenlong0518@hotmail.com','123456') //this is a promise
    .then(data => getUserVideos(data.userEmail))
    .then(video => console.log(video));

console.log('end');

// start
// end
// [ 'video1', 'video2', 'video3' ]

// 虽然这种promise的方法已经非常简洁，但有时候我们想将函数写成赋值型的样式，
// async 和 await作为promised的语法糖，用来使语法上更简洁, 本质上还是用promise