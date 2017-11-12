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
    console.log('Loaded user profile controller.')
    // Get user data
    $http.post('/api/user/', {username: [$routeParams.username]})
      .then( (res) => {
        // NOTE(timp): Depends on final structure of the Employee schema
        //             This will change as it does.
        // Success
        $scope.username   = res.data[0].username
        $scope.firstName  = res.data[0].firstName
        $scope.lastName   = res.data[0].lastName
        $scope.position   = res.data[0].privilege
        $scope.tasks      = res.data[0].tasks
        $scope.teams      = res.data[0].teams
        $scope.picture    = res.data[0].picture || 'img/user_profile_placeholder.png' // Placeholder image in case the use has yet to check in


        console.log(res.data[0]);
        if (res.data[0].locations.length > 0)
          $scope.location   = res.data[0].locations[0].coordinates
        else
          $scope.location   = res.data[0].locations

        // Create a canvas
        // Reference: https://codepen.io/kelvinw88/pen/myKWqQ
        let imageObj = new Image,
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        src = $scope.picture

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
          let smallerBoundary = Math.min(imageObj.width, imageObj.height)
          let startx = 0,
              starty = 0
          if (imageObj.width > imageObj.height)
            startx = (imageObj.width - smallerBoundary) / 2 // Centers the focus of a horizontally wide picture
          if (imageObj.width < imageObj.height)
            starty = (imageObj.height - smallerBoundary) / 2 // Center the focus of a vertically long picture
          context.drawImage(imageObj, startx, starty, smallerBoundary, smallerBoundary, 0, 0, 50, 50)
          context.lineWidth = 1
          context.strokeStyle = 'white'
          context.stroke()
          context.restore()
        }
        imageObj.src = src

        var geocoder= new google.maps.Geocoder();

        $scope.markers = [];

        var createMarker = function (info) {
          let icon = { url: canvas.toDataURL() }
          var marker = new google.maps.Marker({
            map: $scope.map,
            icon: icon,
            position: new google.maps.LatLng(info.lat(), info.lng())
          });
        }

        // Make sure the user has clocked in at least once
        if (res.data[0].locations < 1) {
          geocoder.geocode( { 'address': 'USA'  }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              newAddress = results[0].geometry.location;
              $scope.map.setCenter(newAddress);
            }
          })
        // Valid GPS coordinates were provided, so display and zoom in
        } else {
          geocoder.geocode( { 'location': { lat: $scope.location[0], lng: $scope.location[1] } }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              newAddress = results[0].geometry.location;
              $scope.map.setCenter(newAddress);
              $scope.map.setZoom(6)
              createMarker(newAddress)
            }
          });
        }

        $scope.mapOptions = {
          zoom: 4,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);

        console.log(res)
      }, (res) => {
        // Error/fail
        console.log(res)
      })
  },

  list: function($scope, $http, $routeParams) {
    console.log('Loaded user list controller')
    $http.post('/api/user', { "username": [] })
      .then( (res) => {
        // Success
        $scope.users = res.data
        console.log($scope.users)
      }, (res) => {
        // Error/fail
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
