pragma solidity ^0.5.0;

contract Youtube {
  uint public videoCount = 0;
  string public name = "Youtube";
  mapping(uint => Video) public videos;

  struct Video {
    uint id;
    string hash;
    string title;
    address author;
    string time;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author,
    string time
  );

  constructor() public {
  }

  function uploadVideo(string memory _videoHash, string memory _title, string memory _time) public {
    require(bytes(_videoHash).length > 0);
    require(bytes(_title).length > 0);
    require(msg.sender!=address(0));
    videoCount ++;
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender, _time);
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender, _time);
  }
}
