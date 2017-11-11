function main($scope, $http, $routeParams) {
  console.log('Loaded main controller')
}

let userCtrls = {
  register: function($scope, $http, $routeParams) {
    console.log('Loaded registration controller')

    $scope.register = () => {
      // Send POST request to register user
      $http.post('/api/user/register', $scope.formData)
        .then( (res) => {
          // Success
          console.log(res)
        }, (res) => {
          // Error/fail
          console.log(res)
        })
    }

  },

  login: function($scope, $http, $routeParams) {
    console.log('Loaded login controller')
    $http.post('/api/user/login', $scope.formData)
      .then( (res) => {
        // Success
        console.log(res)
      }, (res) => {
        // Error/fail
        console.log(res)
      })
  },

  view: function($scope, $http, $routeParams) {
    $scope.id = $routeParams.id
    $scope.username = 'lknope'
    $scope.firstName = 'Leslie'
    $scope.lastName = 'Knope'
    $scope.position = 'Employee'
    $scope.teams = ['Team 1', 'Team Ann Rocks']
    console.log('Loaded user profile controller.')

    // Create a canvas
    // Reference: https://codepen.io/kelvinw88/pen/myKWqQ
    let imageObj = new Image,
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        src = '../img/uploads/lknope.png'

    const pinColor = '#9132FB'

    canvas.setAttribute('height', 57)
    canvas.setAttribute('width', 46)
    imageObj.src = src

    imageObj.onload = () => {
      // Draw the border
      // <!-- Purcple Circle (marker) -->
      context.beginPath()
      context.arc(23, 23, 22, 0, 2 * Math.PI)
      context.lineWidth = 1
      context.strokeStyle = pinColor
      context.stroke()
      context.fillStyle = pinColor
      context.fill()


      // <!-- Bottom part of Marker  -->
      context.beginPath();
      context.lineWidth = 4
      context.moveTo(7, 36)
      context.lineTo(23, 55)
      context.lineTo(39, 36)
      context.lineWidth = 4
      context.lineJoin = 'round'
      context.strokeStyle = pinColor
      context.stroke()
      context.fillStyle = pinColor
      context.fill()
      context.closePath()

    	// <!-- White Circle -->
      context.beginPath()
      context.arc(23, 23, 18, 0, 2 * Math.PI)
      context.fillStyle = 'white'
      context.fill()


    	// <!-- Display Picture -->
      context.save();
      context.beginPath()
      context.arc(23, 23, 16, 0, Math.PI * 2, true)
      context.closePath()
      context.clip()

      // <!-- Place Image -->
      context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, 50, 50)
      context.lineWidth = 1
      context.strokeStyle = 'white'
      context.stroke()
      context.restore()
    }
      imageObj.src = src

    var city = "Orlando, USA";
    var geocoder= new google.maps.Geocoder();

     $scope.markers = [];

    var createMarker = function (info) {
      let image = '../img/uploads/lknope.png'
      let icon = {
        url: canvas.toDataURL()
      }
      var marker = new google.maps.Marker({
        map: $scope.map,
        icon: icon,
        position: new google.maps.LatLng(info.lat(), info.lng())
        });
    }

     geocoder.geocode( { 'address': city }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          newAddress = results[0].geometry.location;
          $scope.map.setCenter(newAddress);
          createMarker(newAddress)
      }
     });

    $scope.mapOptions = {
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
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
