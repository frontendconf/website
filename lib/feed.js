const Feed = require('feed')

export default news => {
  const lastChanged = news && news[0] ? news[0].date : null

  const feed = new Feed({
    title: 'Frontend Conference Zurich News',
    description: 'Get the latest from frontendconf.ch',
    id: 'https://www.frontendconf.ch',
    link: 'https://www.frontendconf.ch',
    image: 'https://www.frontendconf.ch/static/images/visual.png',
    favicon: 'https://www.frontendconf.ch/static/images/favicon.png',
    copyright: '2011-2017 Frontend Conference Zürich',
    updated: new Date(lastChanged),
    feedLinks: {
      json: 'https://www.frontendconf.ch/feed/json',
      atom: 'https://www.frontendconf.ch/feed/atom'
    },
    author: {
      name: 'Frontend Conference Zurich',
      email: 'info@frontendconf.ch',
      link: 'Frontend Conference Zurich'
    }
  })

  news.forEach(post => {
    const slug = `https://www.frontendconf.ch/${post.page}/${post.detail}`

    feed.addItem({
      title: post.title,
      id: slug,
      link: slug,
      description: post.bodyShortened,
      content: post.body,
      date: new Date(post.date)
    })
  })

  return feed
}
