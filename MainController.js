(function(){
  
  var app = angular.module("myApp", []);
  
  var MainController = function($scope, $http){
    const singersOptions = ['Jack Johnson','Beatles','Justin Timberlake','Paul McCartney','Bob Marley','Craig David','Mick Jagger','Lou Reed','Blue-Eyes','Will Smith',
    'Billi Joel','Tom-jones', 'Brian Adams', 'Instant-Karma','Bon-Jovi', 'Joe Cocker', 'Ringo Starr', 'Eyal Golan', 'Moshe Peretz', 'Adir Getz']
    var singerDetails;
    var artistName;
    var score = 0;
    $scope.gameOver = false;
    init(1);

    $scope.submitGuess = function(){
      if ($scope.userAnswer.toLowerCase() === artistName.toLowerCase())
      {
        score += $scope.pointForQuestion;
        init($scope.currentRound + 1);
      } else{
        if ($scope.albums.length < 3){
          $scope.pointForQuestion -= 2;

          // Show hint in last chance.
          if($scope.pointForQuestion === 1){
            $scope.showHint = true;
          }

          // Show new album to the user.
          $scope.albums[$scope.albums.length] = singerDetails.data.results[$scope.albums.length].collectionName;
        } else{
          // Move to next round
          init($scope.currentRound + 1);
        }
      }
    }

    function init(round){
      if (round > 5)
      {
        $scope.score = score;
        $scope.gameOver = true;
        return;
      }

      $scope.userAnswer = "";
      $scope.showHint = false;
      $scope.currentRound = round;
      $scope.pointForQuestion = 5;

      // Number between 0 to 19.
      var artistPlace = Math.floor((Math.random() * 20));
      
      artistName = singersOptions[artistPlace];
      var url = "https://itunes.apple.com/search?term=" + artistName + "&entity=musicVideo&limit=3&entity=album";
      var encodedUrl = encodeURI(url);

      $http.get(encodedUrl).then(function(resp){
            $scope.artWork = resp.data.results[0].artworkUrl100;
            $scope.albums = [resp.data.results[0].collectionName];
            singerDetails = resp;
      }, function(error){
            score =error;
      })
    }
  }
  
  app.controller("MainController", MainController);
}());

