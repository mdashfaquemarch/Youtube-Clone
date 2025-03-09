```
frontend routes:
/	<HomePage />	                        Homepage (Trending, Recommended)
/search?q=:query	<SearchResults />	    Search results page
/video/:videoId	    <VideoPage />	        Watch a video
/channel/:username	<ChannelPage />	        User/Channel profile
/subscriptions	   <SubscriptionsPage />	    Videos from subscribed channels
/history	       <HistoryPage />	                Watch history
/watch-later	  <WatchLaterPage />	        Saved videos to watch later
/liked-videos	  <LikedVideosPage />	        Videos liked by user
/playlists/:playlistId	<PlaylistPage />	View specific playlist
/upload	          <UploadVideoPage />	                Upload a new video
/edit/:videoId	  <EditVideoPage />	        Edit an uploaded video
/live	          <LiveStreamsPage />	                Browse live streams
/live/:streamId	  <LiveStreamPage />	        Watch a live stream
/auth/login	      <LoginPage />	                Login page
/auth/register	  <RegisterPage />	        Register page
/profile/:userId  <ProfilePage />	        Edit user profile
*	              <NotFoundPage />	        404 Page Not Found

```
