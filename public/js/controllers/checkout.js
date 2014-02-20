function sizeSelectorInit() {
	$('.size-selector').click(function (){
		var self = $(this);
		if(self.hasClass('checked')){
			
		}else {
			$('.size-selector').removeClass('checked');
			$('.size-selector input[type="radio"]').prop('checked',false);
			self.addClass('checked');
			self.find('input[type="radio"]').prop('checked',true);
		}
	});
}

function mobileInputFocusBugFix() {
	console.log("fixed");
	$('input,select').focus( function () {
		console.log('what');
		if($(window).width()<768) {
			$('.checkout-wizard .controls').addClass('sticky-disabled');
		}
	}).blur( function () {
		$('.checkout-wizard .controls').removeClass('sticky-disabled')
	});
}

var checkoutControllers = angular.module('checkoutControllers',[]) ;

checkoutControllers.controller('checkoutCtrl', ['$scope','$http', '$modal', function ($scope, $http, $modal) {
	sizeSelectorInit();
	setTimeout(function(){
		mobileInputFocusBugFix();
	},500);


	// initiate checkoutform
	$('checkout-form').validate();
	

	$scope.addingDog = true;

	$scope.months = [
		{name:"January", code:"Jan"},
		{name:"February", code:"Feb"},
		{name:"March", code:"Mar"},
		{name:"April", code:"Apr"},
		{name:"May", code:"May"},
		{name:"June", code:"Jun"},
		{name:"July", code:"Jul"},
		{name:"August", code:"Aug"},
		{name:"September", code:"Sep"},
		{name:"October", code:"Oct"},
		{name:"November", code:"Nov"},
		{name:"December", code:"Dec"}
	];

	$( ".months" ).autocomplete({
      source: $scope.months
    });

	$scope.newDog = {};
	$scope.newOrder = {};
	$scope.addDogErrorMessage = 'You forgot some fields :(. We need to know your dog\'s name, birth month and size to pick the right treats.';
	$scope.newOrder.dogs = [
	];
	$scope.plans = [
		{
			"id":1,
			"label": "Starter",
			"desc": "$19 a month",
			"price": 19
		},
		{
			"id":2,
			"label": "Regular",
			"desc": "$29 a month",
			"price": 29
		},
		{
			"id":3,
			"label": "Premium",
			"desc": "$39 a month",
			"price": 39
		}
	];
	$scope.sizes = [
		{
			"id":1,
			"label": "Small",
			"desc": "up to 10kg"
		},
		{
			"id":2,
			"label": "Medium",
			"desc": "11kg to 25kg"
		},
		{
			"id":3,
			"label": "Large",
			"desc": "25kg+"
		}
	];
	$scope.removeDog = function (dog) {
		if($scope.newOrder.dogs.indexOf(dog) >= 0) {
			$scope.newOrder.dogs.splice(dog,1);
		}
	}
	$scope.startAddingDog = function () {
		$scope.addingDog = true;
	}
	$scope.addNewDog = function () {
		var newDog = $scope.newDog;
		if(!newDog.name || newDog.name == "" || !newDog.birthMonth || newDog.birthMonth == "" || !newDog.dogSize){
			$scope.showError('Oops!',$scope.addDogErrorMessage);
			return false;
		}
		$scope.newOrder.dogs.push($scope.newDog);
		$scope.newDog = {};
		$scope.addingDog = false;
		$('input#_value').val('');
	};
	$scope.changeDogSize = function ($event, size) {
		$scope.newDog.dogSize = size;
	}
	$scope.showError = function (header,message) {
		var modalInstance = $modal.open({
	      templateUrl: 'myModalContent.html',
	      controller: ModalInstanceCtrl,
	      resolve: {
	        header : function () {
	        	return header;
	        },
	        message : function () {
	        	return message;
	        }
	      }
	    });

	    modalInstance.result.then(function (header,message) {
	     	$scope.header = header;
			$scope.message = message;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	};

	$scope.checkoutValidateStep1 = function() {
	// check if user has added at least 1 dog 
		if($scope.newOrder.dogs.length<=0) {
			$scope.showError('Oops!',"You forgot to add a dog to your pack!");
			return false;
		}else {
			$('#checkout-wizard').carousel('next');
		}
	}


	//step 2 select plan

	$scope.changePlan = function ($event,plan) {
		$scope.newOrder.plan = plan;
	}
	$scope.checkoutValidateStep2 = function() {
		if($scope.newOrder.plan == undefined) {
			$scope.showError('Oops!',"You forgot to select a plan for your pups!");
			return false;
		} else {
			$('#checkout-wizard').carousel('next');
		}
	}
	$scope.backToStep1 = function() {
		$scope.addingDog = false;
		$('#checkout-wizard').carousel('prev');
	}

	//step 3 subscribe 

	$scope.subscribe = function () {
		//@TO-DO: billing info validation and AJAX submission
		console.log($scope.newOrder);

		// validate order

		if($('#checkout-form').valid()){
			alert('This is where you do the form submission. All fields information are stored in object $scope.newOrder. Check browser debug log for object properties.');
		}else {
			$scope.showError('Invalid details','Some of the details you entered were invalid. Please check the red fields. (note for dev: fields on the current form are being validated using jquery.validate.js plugin)');
		}




		//$('#checkout-wizard').carousel('next');
	}
}]);




var ModalInstanceCtrl = function ($scope, $modalInstance, header, message) {
	$scope.header = header;
	$scope.message = message;
	$scope.ok = function () {
	    $modalInstance.close();
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
};