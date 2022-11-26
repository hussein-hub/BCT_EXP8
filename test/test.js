const Youtube = artifacts.require('./Youtube.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Youtube', ([deployer, author]) => {
  let youtube

  before(async () => {
    youtube = await Youtube.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await youtube.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await youtube.name()
      assert.equal(name, 'Youtube')
    })
  })

  describe('videos', async () => {
    let result, videoCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    const uploadTime = Date().toLocaleString()

    before(async () => {
      result = await youtube.uploadVideo(hash, 'Video title', uploadTime, { from: author })
      videoCount = await youtube.videoCount()
    })

    //check event
    it('creates videos', async () => {
      // SUCESS
      assert.equal(videoCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.title, 'Video title', 'title is correct')
      assert.equal(event.author, author, 'author is correct')
      assert.equal(event.time, uploadTime, 'time is correct')

      // FAILURE: Video must have hash
      await youtube.uploadVideo('', 'Video title', uploadTime, { from: author }).should.be.rejected;

      // FAILURE: Video must have title
      await youtube.uploadVideo('Video hash', '', uploadTime, { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists videos', async () => {
      const video = await youtube.videos(videoCount)
      assert.equal(video.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(video.hash, hash, 'Hash is correct')
      assert.equal(video.title, 'Video title', 'title is correct')
      assert.equal(video.author, author, 'author is correct')
      assert.equal(video.time, uploadTime, 'time is correct')
    })
  })
})