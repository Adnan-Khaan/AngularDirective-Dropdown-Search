(function(angular) {


angular.module('app.directives.contactCard',[])

.directive('contactCard',function(DataFactory){

	return {
		restrict: 'E',
		scope: {},
		templateUrl : 'dir-view.html',
		
	controller: ['$scope', function($scope){
		$scope.searchItems = DataFactory;
		
		//Sort Array
		$scope.searchItems.sort();
	
		//Define Suggestions List
		$scope.suggestions = [];
		//Define Selected Suggestion Item
		$scope.selectedIndex = -1;
		//var myMaxSuggestionListLength =0;
		//Function To Call On ng-change
	var myMaxSuggestionListLength =0;

	$scope.search = function(value){
		console.log(value);
		
		$scope.suggestions = [];
		for(var i=0; i<$scope.searchItems.length; i++){
			
		if (value =='Title') //Checking condition to filter on movie title .
        	{var searchItemsSmallLetters1 = angular.lowercase($scope.searchItems[i].Title); }
    	else if (value =='Actor')//Checking condition to filter on Actors title .
    		{var searchItemsSmallLetters1 = angular.lowercase($scope.searchItems[i].Actor); }
    	else if (value=='Both' )//Checking condition to filter on Both title and Actors .
    		{var searchItemsSmallLetters1 = angular.lowercase($scope.searchItems[i].Title);
    		 var searchItemsSmallLetters2 = angular.lowercase($scope.searchItems[i].Actor);
    		 var searchTextSmallLetters = angular.lowercase($scope.searchText);
			if(searchItemsSmallLetters1.indexOf(searchTextSmallLetters) !== -1||searchItemsSmallLetters2.indexOf(searchTextSmallLetters) !== -1){
				$scope.suggestions.push(searchItemsSmallLetters1); 
				$scope.suggestions.push(searchItemsSmallLetters2);
    		 	myMaxSuggestionListLength += 1;
				if(myMaxSuggestionListLength == 5){
					break;
				}
				
				}
			 }
       	
			var searchTextSmallLetters = angular.lowercase($scope.searchText);
			if(searchItemsSmallLetters1.indexOf(searchTextSmallLetters) !== -1){
				$scope.suggestions.push(searchItemsSmallLetters1); 
				//$scope.suggestions.push(searchItemsSmallLetters2);
				myMaxSuggestionListLength += 1;
				if(myMaxSuggestionListLength == 5){
					break;
				}
			}
		}
	}
	
	//Keep Track Of Search Text Value During The Selection From The Suggestions List  
	$scope.$watch('selectedIndex',function(val){
		if(val !== -1) {
			$scope.searchText = $scope.suggestions[$scope.selectedIndex];
		}
	});
	
	
	//Text Field Events
	//Function To Call on ng-keydown
	$scope.checkKeyDown = function(event){
		if(event.keyCode === 40){//down key, increment selectedIndex
			event.preventDefault();
			if($scope.selectedIndex+1 !== $scope.suggestions.length){
				$scope.selectedIndex++;
			}
		}else if(event.keyCode === 38){ //up key, decrement selectedIndex
			event.preventDefault();
			if($scope.selectedIndex-1 !== -1){
				$scope.selectedIndex--;
			}
		}else if(event.keyCode === 13){ //enter key, empty suggestions array
			event.preventDefault();
			$scope.suggestions = [];
		}
	}
	//Function To Call on ng-keyup
	$scope.checkKeyUp = function(event){ 
		if(event.keyCode !== 8 || event.keyCode !== 46){//delete or backspace
			if($scope.searchText == ""){
				$scope.suggestions = [];
			}
		}
	}
	
	
	//List Item Events
	//Function To Call on ng-click
	$scope.AssignValueAndHide = function(index){
		 $scope.searchText = $scope.suggestions[index];
		 $scope.suggestions=[];
	}
	
		
			

	}]
}})




// Factory Diclaration 
.factory('DataFactory', function()
{
var searchItems = [
    { 
      "id" : 0,
      "Title" : "Inception",
      "Actor" : "Leonardo De caprio ",
      "Rating" : "3"
      },
    { 
      "id" : 1,
      "Title" : "Terminator",
      "Actor" : "Arnold Schwarzenegger",
      "Rating" : "6"
      },
    { 
      "id" : 2,
      "Title" : "Bourne Identtiy",
      "Actor" : " Matt Demon ",
      "Rating" : "5"
      },
    { 
      "id" : 3,
      "Title" : "Intersteller",
      "Actor" : "Steven spelburg ",
      "Rating" : "5"
      },
    { 
      "id" : 4,
      "Title" : "Meet Joe Black",
      "Actor" : "Wayne rhodes ",
      "Rating" : "3"
      },
    { 
      "id" : 5,
      "Title" : "The Matrix",
      "Actor" : "Neo the one",
      "Rating" : "3"
      },
    { 
      "id" : 6,
      "Title" : "Hangover",
      "Actor" : "Zachk",
      "Rating" : "7"
      },
    { 
      "id" : 7,
      "Title" : "The deception",
      "Actor" : "Leonardo de caprio ",
      "Rating" : "5"
      
    }];

return searchItems;
});

})(window.angular);




















