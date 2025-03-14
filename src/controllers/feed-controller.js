export {
    getHomeFeed,
    getTrendingVideos,
    getRecommendedVideos,
    getSubscriptionFeed,
    getCategoryFeed,
    getWatchHistoryFeed
}





// ✅ Trending = High views + Likes + Recent uploads
const gettrendingVideos = async () => {};



const getRecommendedVideos = async () => {};

/*
  A recommendation system:

  
  1️⃣ Content-Based Filtering (Similar Videos)
👉 Recommends videos similar to what you watched before, based on tags, title, description.

💡 Example:

You watch "Football Highlights" → It suggests more football videos.
✅ Good for new platforms.
❌ Limited variety in recommendations.

2️⃣ Collaborative Filtering (Similar Users' Choices)
👉 Recommends videos based on what similar users have watched/liked.

💡 Example:

You and Alex both watch "Cooking Tips"
Alex also watches "Baking Tricks"
Now, "Baking Tricks" is recommended to you!
✅ More personalized.
❌ Struggles with new users/videos (cold start problem).

3️⃣ Hybrid Recommendation (Best of Both Worlds)
👉 Mixes Content-Based & Collaborative Filtering for better accuracy.

💡 Example:

Suggests videos based on your history + similar users' choices.
✅ More accurate & diverse recommendations.
❌ Computationally expensive.

4️⃣ Popularity-Based (Trending Videos)
👉 Recommends videos that are most viewed, liked, or shared.

💡 Example:

The top trending music video is recommended to everyone.
✅ Works for new users.
❌ Not personalized.

5️⃣ Deep Learning-Based (Smart AI Recommendations)
👉 Uses AI & Neural Networks to analyze watch time, likes, skips, engagement and suggest videos.

💡 Example:

If you watch a full 20-min video, it suggests similar long videos.
If you skip a video quickly, it stops recommending similar ones.
✅ Super accurate & dynamic.
❌ Needs a lot of data & computing power.

🎯 Which One Should You Use?
✅ Simple YouTube Clone → Content-Based + Popularity-Based
✅ Better Personalization → Hybrid (Content + Collaborative)
✅ Next-Level AI Feeds → Deep Learning-Based
*/