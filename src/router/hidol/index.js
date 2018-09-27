const hidolRouter = [
  {
    path: 'index',
    location: 'hidol/pages/Index',
    meta: {
      title: '身边人 新鲜事'
    },
    isAbandoned: false
  },
  {
    path: 'comment',
    location: 'hidol/pages/Comments',
    meta: {
      title: '评论'
    },
    isAbandoned: false
  },
  {
    path: 'my',
    location: 'hidol/pages/My',
    meta: {
      title: '我的'
    },
    isAbandoned: false
  },
  {
    path: 'newpost',
    location: 'hidol/pages/NewPost',
    meta: {
      title: '发表'
    },
    isAbandoned: false
  }
]
export default hidolRouter
