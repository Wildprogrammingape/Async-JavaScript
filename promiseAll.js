// 当我们不想等待一个函数完成，再运行下一个时
// 用 Promise.all()，使得函数同时执行(run async code at the same time)

const youtube = new Promise(resolve => {
    setTimeout(() => {
        console.log('getting data from youtube');
        resolve({videos : [1,2,3,4,5]});
    }, 5000);
});

const facebook = new Promise(resolve => {
    setTimeout(() => {
        console.log('getting data from facebook');
        resolve({user: 'Long Chen'});
    }, 1000)
});

Promise.all([youtube, facebook])
    .then(result => console.log(result));

// getting data from facebook
// getting data from youtube
// [ { videos: [ 1, 2, 3, 4, 5 ] }, { user: 'Long Chen' } ]