const User = require("../models/User");
const Movie = require("../models/Movie");
const topFavouriteMoviesAmongFriends = async (req, res) => {

  try {
    const userId = req.params.userID; 
    const user = await User.find({'userId':userId}).populate('friends');

    if (!user[0]) {
        res.status(200).json("User Not Found");
        return []
    }
    
    const friendIds = user[0].friends;
    const friendFavoriteMovies = await Movie.find({ 'favorites': { $in: friendIds } });
    
    const favoriteCountMap = {};
    friendFavoriteMovies.forEach(movie => {
        movie.favorites.forEach(friendId => {
            if (friendIds.includes(friendId)) {
                favoriteCountMap[movie.title] = (favoriteCountMap[movie.title] || 0) + 1;
            }
        });
    });
    
    const topMovieTitles = Object.keys(favoriteCountMap)
    .sort((a, b) => {
        const countComparison = favoriteCountMap[b] - favoriteCountMap[a];

        if (countComparison !== 0) {
            return countComparison;
        }

        return a.localeCompare(b); // Title alphabetical order if counts are equal
    })
    .slice(0, 3);
       
     res.status(200).send(topMovieTitles);
  }catch (error) {
    console.error("Error fetching top favorite movies:", error);
     return [];
  } 

}

module.exports = {topFavouriteMoviesAmongFriends}


