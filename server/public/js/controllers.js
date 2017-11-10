function main($scope, $http, $routeParams) {
  console.log('Loaded main controller')
}

let userCtrls = {
  register: function($scope, $http, $routeParams) {
    console.log('Loaded registration controller')
  },

  login: function($scope, $http, $routeParams) {
    console.log('Loaded login controller')
  },

  view: function($scope, $http, $routeParams) {
    $scope.id = $routeParams.id
    console.log('Loaded user profile controller.')



    var cities = "Orlando, USA";
    var geocoder= new google.maps.Geocoder();

     $scope.markers = [];

     var createMarker = function (info){
          var marker = new google.maps.Marker({
              map: $scope.map,
              position: new google.maps.LatLng(info.lat(), info.lng())
          });
     }

     geocoder.geocode( { 'address': cities }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          newAddress = results[0].geometry.location;
          $scope.map.setCenter(newAddress);
          createMarker(newAddress)
      }
     });

    $scope.mapOptions = {
          zoom: 4,
          //center: new google.maps.LatLng(41.923, 12.513),
          mapTypeId: google.maps.MapTypeId.TERRAIN
      }

      $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);


      //issue of google maps inside bootstap model issue
      $('#myModal').on('shown.bs.modal', function(){
      google.maps.event.trigger(map, 'resize');
     $scope.map.setCenter(new google.maps.LatLng(newAddress.lat(), newAddress.lng()));
    })
  }
}

let taskCtrls = {
  list: function($scope, $http, $routeParams) {
    console.log('Loaded task listing controller.')
  },

  create: function($scope, $http, $routeParams) {
    console.log('Loaded task creation controller.')
  },

  edit: function($scope, $http, $routeParams) {
    $scope.id = $routeParams.id
    console.log('Loaded task edit controller.')
  }
}

let teamCtrls = {
  list: function($scope, $http, $routeParams) {
    console.log('Loaded team listing controller.')
  },

  create: function($scope, $http, $routeParams) {
    console.log('Loaded team creation controller.')
  },

  edit: function($scope, $http, $routeParams) {
    console.log('Loaded team edit controller.')
  }
}
