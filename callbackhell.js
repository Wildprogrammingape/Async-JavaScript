
// JS 是 single-thread语言，只能执行code line by line
// 执行的时候将 setTimeout() 从callstack取出，传递到 Web apis中, browser持续track它
// 因此setTimeout()不会block下面的代码，当时间结束会回到callstack继续执行
// 同理，event listener如click也是这样，只有当event发生时才会回到callstack执行
// note: callback并不总是异步的用在setTimeout()中，也可以用于forEach()等synchronous代码中

// 非异步代码的问题：
// 无法正常获取数据，由于setTimeout()需要时间，正如Fetch data到browser或者数据库一样

// console.log('start');

// function loginUser(email, password){
//     setTimeout(() => {
//         return {userEmail: email};
//     }, 1000);
// }

// const user = loginUser('chenlong0518@hotmail.com', '123456');

// console.log(user);

// console.log('end');

// start
// undefined
// end


// 解决方案一： callback function
// callback function is a function that's passed as parameter, and will run later on
// callback 函数是作为参数传递的函数，在后面执行

// console.log('start');

// function loginUser(email, password, callback){
//     setTimeout(() => {
//         callback({userEmail: email}); // 将{userEmail: email}作为callback function的参数
//     }, 1000);
// }

// const user = loginUser('chenlong0518@hotmail.com', '123456', data => console.log(data));

// console.log('end');

// start
// end
// { userEmail: 'chenlong0518@hotmail.com' }


// 如果另一个函数的parameter需要第一个callback函数的value，那么就需要继续嵌套callback下去
console.log('start');

function loginUser(email, password, callback){
    setTimeout(() => {
        callback({userEmail: email}); // 将{userEmail: email}作为callback function的参数
    }, 1000);
}

function getUserVideos(email, callback){
    setTimeout(() => {
        callback(['video1', 'video2', 'video3']);// 将['video1', 'video2', 'video3']作为callback function的参数
    }, 1000);
}

const user = loginUser('chenlong0518@hotmail.com', '123456', data => {
    console.log(data);
    getUserVideos(data.userEmail, videos => {
        console.log(videos);
    });
});

console.log('end');

// start
// end
// { userEmail: 'chenlong0518@hotmail.com' }
// [ 'video1', 'video2', 'video3' ]



// 如果需要video作为下一个函数的参数，又要在console.log(videos)后面继续嵌套相同的结构，
// 这就是所谓的callback hell，非常没有可读性
// 因此，promise来用来解决这个问题