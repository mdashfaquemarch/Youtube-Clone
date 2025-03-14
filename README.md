# YouTube Clone  
## 🚀 Overview
This project is a **YouTube Clone** that includes features like **video uploads, subscriptions, playlists, likes, comments, and a recommendation system.** It aims to replicate YouTube’s core functionalities with a **scalable backend.**

## 📂 Project Structure
The project consists of multiple controllers, each handling a specific aspect of the application.

### 🎬 Video Controller
Handles **video management** such as uploading, updating, and fetching videos.
```javascript
export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
```

### 👤 User Controller
Manages **user authentication and sessions.**
```javascript
export { signup, login, logout };
```

### 🐦 Tweet Controller
For integrating **tweet-like features (if applicable).**
```javascript
export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
```

### 📺 Subscription Controller
Handles **subscriptions and subscriber counts.**
```javascript
export {
    toggleSubscription,
    getChannelSubscribers,
    getSubscriptions
}
```

### 🎵 Playlist Controller
Manages **video playlists** for users.
```javascript
export {
    createPlaylist,
    getChannelPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
```

### 👍 Like Controller
Handles **likes for videos, comments, and tweets.**
```javascript
export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
```

### 📊 Dashboard Controller
Provides **channel analytics and dashboard videos.**
```javascript
export {
    getChannelStats,
    getChannelVideos
}
```

### 💬 Comment Controller
Manages **video comments.**
```javascript
export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
```

### 📡 Channel Controller
Handles **public videos and trending content.**
```javascript
export {
    getVideoDetails,
    getVideosOfAChannel,
    getTrendingVideos,
    getRecommendedVideos
}
```

## 🔥 Features Yet to be Implemented

### 1️⃣ **Search Functionality** 🔍
Allow users to **search for videos, channels, and playlists.**
```javascript
export { searchVideos, searchChannels, searchPlaylists };
```

### 2️⃣ **Watch History & Watch Later** 📜
Keep track of **watched videos and allow users to save for later.**
```javascript
export { getWatchHistory, addToWatchLater, removeFromWatchLater };
```

### 3️⃣ **Notification System** 🔔
Notify users when:
- A subscribed channel uploads a new video.
- Someone likes/comments on their video.
```javascript
export { getUserNotifications, markNotificationAsRead };
```

### 4️⃣ **Report & Block System** 🚫
Allow users to **report inappropriate content** or **block other users.**
```javascript
export { reportVideo, reportUser, blockUser, unblockUser };
```

### 5️⃣ **Live Streaming** 📡 *(Advanced Feature)*
Enable **real-time streaming** for users.
```javascript
export { startLiveStream, endLiveStream, getLiveStreams };
```

## 📌 Next Steps
- ✅ Implement **Search, Watch History, Notifications** for improved UX.
- ✅ Add **Reporting & Blocking** for moderation.
- ✅ Consider **Live Streaming & Super Chats** for more engagement.



